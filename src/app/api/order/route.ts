import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getProduct } from "@/data/products";
import { DELIVERY, type Area } from "@/lib/delivery";
import { formatPrice } from "@/lib/utils";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!
  );

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot: real people never fill this hidden field
    if (body.website) return NextResponse.json({ ok: true, id: "UG-OK" });

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const address = String(body.address ?? "").trim();
    const note = String(body.note ?? "").trim().slice(0, 300);
    const area = body.area as Area;

    if (name.length < 2 || address.length < 8 || !DELIVERY[area]) {
      return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
    }
    if (!/^01[3-9]\d{8}$/.test(phone)) {
      return NextResponse.json(
        { error: "Enter a valid phone number, like 01712345678." },
        { status: 400 }
      );
    }

    // Rebuild the order from our own product data, never trust prices from the browser
    const lines = (Array.isArray(body.items) ? body.items : [])
      .map((i: { slug: string; qty: number }) => {
        const p = getProduct(i.slug);
        const qty = Math.max(1, Math.min(10, Number(i.qty) || 1));
        return p && p.inStock ? { p, qty } : null;
      })
      .filter(Boolean) as { p: NonNullable<ReturnType<typeof getProduct>>; qty: number }[];

    if (lines.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const subtotal = lines.reduce((n, l) => n + l.p.price * l.qty, 0);
    const delivery = DELIVERY[area].charge;
    const total = subtotal + delivery;
    const id = "UG-" + Date.now().toString(36).toUpperCase();

    const rows = lines
      .map(
        (l) =>
          `<tr><td>${esc(l.p.name)}</td><td>× ${l.qty}</td><td>${formatPrice(l.p.price * l.qty)}</td></tr>`
      )
      .join("");

    const html = `
      <h2>New order ${id}</h2>
      <p><b>Name:</b> ${esc(name)}<br/>
      <b>Phone:</b> ${esc(phone)}<br/>
      <b>Address:</b> ${esc(address)}<br/>
      <b>Area:</b> ${DELIVERY[area].label}<br/>
      ${note ? `<b>Note:</b> ${esc(note)}<br/>` : ""}</p>
      <table cellpadding="6">${rows}</table>
      <p>Subtotal: ${formatPrice(subtotal)}<br/>
      Delivery: ${formatPrice(delivery)}<br/>
      <b>Total to collect (COD): ${formatPrice(total)}</b></p>`;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Urban Gears <onboarding@resend.dev>",
      to: process.env.ORDER_EMAIL!,
      subject: `New order ${id} · ${formatPrice(total)} · ${name}`,
      html,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Could not place the order. Try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}