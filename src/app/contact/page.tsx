import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Urban Gears.",
}

const CONTACT = {
  business: "Urban Gears",
  email: "urban.gears@gmail.com",
  phone: "01581187470", // e.g. "+8801XXXXXXXXX". Leave "" to hide this row.
  address: "Vatara, Badda, Dhaka - 1212",
  hours: "Saturday–Thursday, 10:00 AM – 8:00 PM", // e.g. "Saturday–Thursday, 10:00 AM – 8:00 PM". Leave "" to hide.
  replyNote: "We reply to emails within one business day.",
}

type Row = { label: string; value: string; href?: string; external?: boolean }

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CONTACT.address
)}`

const rows = [
  { label: "Business", value: CONTACT.business },
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  CONTACT.phone && {
    label: "Phone",
    value: CONTACT.phone,
    href: `tel:${CONTACT.phone.replace(/\s/g, "")}`,
  },
  { label: "Address", value: CONTACT.address, href: mapsUrl, external: true },
  CONTACT.hours && { label: "Working hours", value: CONTACT.hours },
].filter(Boolean) as Row[]

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-10 md:py-16">
      <h1 className="font-display text-3xl font-bold md:text-4xl">Contact Us</h1>

      <dl className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-6">
            <dt className="w-36 shrink-0 font-semibold">{r.label}</dt>
            <dd className="text-neutral-700">
              {r.href ? (
                <a
                  href={r.href}
                  {...(r.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-brand hover:underline"
                >
                  {r.value}
                </a>
              ) : (
                r.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-neutral-600">{CONTACT.replyNote}</p>
    </section>
  )
}