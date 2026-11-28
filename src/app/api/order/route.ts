
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getProduct } from "@/data/products";
import { DELIVERY, type Area } from "@/lib/delivery";
import { formatPrice } from "@/lib/utils";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[c]!
  );

const ALLOWED_COLORS = [
  "Bottle Green",
  "Grey",
  "Pink",
] as const;

type ProductColor = (typeof ALLOWED_COLORS)[number];

type OrderLine = {
  p: NonNullable<ReturnType<typeof getProduct>>;
  qty: number;
  color: ProductColor;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot: real customers never fill this hidden field
    if (body.website) {
      return NextResponse.json({ ok: true, id: "UG-OK" });
    }

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const address = String(body.address ?? "").trim();
    const note = String(body.note ?? "").trim().slice(0, 300);
    const area = body.area as Area;

    if (
      name.length < 2 ||
      address.length < 8 ||
      !Object.hasOwn(DELIVERY, area)
    ) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 }
      );
    }

    if (!/^01[3-9]\d{8}$/.test(phone)) {
      return NextResponse.json(
        {
          error: "Enter a valid phone number, like 01712345678.",
        },
        { status: 400 }
      );
    }

    // Validate order items
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    // Rebuild the order using our own product data
    // Never trust prices sent from the browser
    const lines: OrderLine[] = [];

    for (const item of body.items) {
      if (
        typeof item.slug !== "string" ||
        typeof item.color !== "string" ||
        !ALLOWED_COLORS.includes(item.color as ProductColor)
      ) {
        return NextResponse.json(
          { error: "Invalid product or color selection." },
          { status: 400 }
        );
      }

      const p = getProduct(item.slug);

      if (!p || !p.inStock) {
        return NextResponse.json(
          { error: "A product in your cart is unavailable." },
          { status: 400 }
        );
      }

      const qty = Math.max(
        1,
        Math.min(10, Number(item.qty) || 1)
      );

      lines.push({
        p,
        qty,
        color: item.color as ProductColor,
      });
    }

    if (lines.length === 0) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    // Calculate prices on the server
    const subtotal = lines.reduce(
      (n, l) => n + l.p.price * l.qty,
      0
    );

    const delivery = DELIVERY[area].charge;
    const total = subtotal + delivery;

    const id =
      "UG-" + Date.now().toString(36).toUpperCase();

    // Generate email product rows with selected colors
    const rows = lines
      .map(
        (l) => `
          <tr>
            <td>${esc(l.p.name)}</td>
            <td>
              <span style="font-weight:bold;">
                ${esc(l.color)}
              </span>
            </td>
            <td>× ${l.qty}</td>
            <td>${formatPrice(l.p.price * l.qty)}</td>
          </tr>
        `
      )
      .join("");

    const html = `
      <div style="font-family:Arial,sans-serif;color:#222;max-width:650px;">
        <h2>New Urban Gears Order</h2>

        <h3>Order ID: ${esc(id)}</h3>

        <hr/>

        <h3>Customer Details</h3>

        <p>
          <b>Name:</b> ${esc(name)}<br/>
          <b>Phone:</b> ${esc(phone)}<br/>
          <b>Address:</b> ${esc(address)}<br/>
          <b>Delivery Area:</b> ${esc(DELIVERY[area].label)}<br/>
          ${
            note
              ? `<b>Note:</b> ${esc(note)}<br/>`
              : ""
          }
        </p>

        <hr/>

        <h3>Order Details</h3>

        <table
          cellpadding="10"
          cellspacing="0"
          border="1"
          style="border-collapse:collapse;width:100%;text-align:left;"
        >
          <thead>
            <tr style="background:#f5f5f5;">
              <th>Product</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            ${rows}
          </tbody>
        </table>

        <h3>Payment Summary</h3>

        <p>
          Subtotal: ${formatPrice(subtotal)}<br/>
          Delivery: ${formatPrice(delivery)}<br/>
          <b>Total to Collect (Cash on Delivery): ${formatPrice(total)}</b>
        </p>

        <hr/>

        <p style="color:#777;font-size:12px;">
          Urban Gears - New Order Notification
        </p>
      </div>
    `;

    // Check email configuration
    if (!process.env.RESEND_API_KEY || !process.env.ORDER_EMAIL) {
      console.error("Missing Resend or order email configuration.");

      return NextResponse.json(
        { error: "Order service is temporarily unavailable." },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Urban Gears <onboarding@resend.dev>",
      to: process.env.ORDER_EMAIL,
      subject: `New order ${id} · ${formatPrice(total)} · ${name}`,
      html,
    });

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Could not place the order. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      id,
    });

  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
