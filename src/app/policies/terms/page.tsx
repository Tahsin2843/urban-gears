import Link from "next/link";

export const metadata = { title: "Terms & Conditions" };

const BUSINESS = "Urban Gears";
const EMAIL = "urbangears@gmail.com";
const PHONE = "01581187470";
const ADDRESS = "Vatara, Dhaka - 1212";
const HOURS = "Saturday to Thursday, 10:00 AM to 6:00 PM";

const sections: { title: string; body: React.ReactNode[] }[] = [
  {
    title: "Eligibility",
    body: [
      "You must be at least 18 years old to place an order. If you are under 18, please ask a parent or guardian to order for you.",
    ],
  },
  {
    title: "Our products",
    body: [
      "We sell products for personal use. We try to describe products, photos, colors, and prices accurately, but we cannot promise that every description or image is free of errors. Colors may look slightly different on different screens.",
      "Use our products only as intended and follow any care instructions. Keep them away from very high heat and sharp objects.",
    ],
  },
  {
    title: "Prices and payment",
    body: [
      "All prices are in Bangladeshi Taka (৳). Prices may change without notice, but the price you see when you place your order is the price you pay.",
      "We currently accept cash on delivery only. You pay the courier when you receive your order. The delivery charge, which depends on your delivery area, is shown at checkout and added to your total.",
      "If a product is listed at a clearly wrong price, we may cancel the order and tell you before it ships.",
    ],
  },
  {
    title: "Orders",
    body: [
      "Placing an order is an offer to buy. We may call you to confirm your order, and the order is accepted when we confirm it with you.",
      "Please give us a correct name, phone number, and full address, and keep your phone on so the courier and our team can reach you. We are not responsible for delays caused by wrong or incomplete details.",
      "We may refuse or cancel an order, for example if an item is out of stock, the order looks fake or fraudulent, or we cannot reach you. If we cancel an order, we will let you know.",
      "If you repeatedly refuse deliveries or place orders you do not accept, we may stop taking cash on delivery orders from you.",
    ],
  },
  {
    title: "Delivery",
    body: [
      "We deliver across Bangladesh through courier partners. Delivery times are estimates and can be affected by the courier, weather, holidays, or your location.",
      "Risk of loss passes to you when the courier hands the parcel to you. Please check the parcel when you receive it and contact us quickly if something is wrong.",
    ],
  },
  {
    title: "Returns and refunds",
    body: [
      <>
        Returns, exchanges, and refunds are covered by our{" "}
        <Link href="/policies/shipping-returns" className="font-semibold text-brand underline">
          Return and Refund Policy
        </Link>
        , which is part of these terms. Products damaged by the customer after delivery are not eligible for return or refund.
      </>,
    ],
  },
  {
    title: "Privacy",
    body: [
      <>
        We handle your personal information as described in our{" "}
        <Link href="/policies/privacy" className="font-semibold text-brand underline">
          Privacy Policy
        </Link>
        , which is part of these terms.
      </>,
    ],
  },
  {
    title: "Using our website",
    body: [
      "Use our website only for lawful purposes. Do not try to hack, overload, scrape, or copy it, upload harmful code, place fake orders, or pretend to be someone else.",
      "We may block access for anyone who breaks these terms.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      `All content on this website, including text, photos, logos, and design, belongs to ${BUSINESS} or its licensors. Do not copy, reuse, or republish it without our written permission.`,
    ],
  },
  {
    title: "Warranty disclaimer",
    body: [
      "Apart from the rights described in our Return and Refund Policy and any rights you have under law, our website and products are provided as they are, without other promises or warranties, to the extent the law allows.",
    ],
  },
  {
    title: "Limitation of liability",
    body: [
      `To the extent the law allows, ${BUSINESS} is not liable for indirect or consequential losses. Our total liability for any claim about an order is limited to the amount you paid for that order.`,
      "Nothing in these terms limits any right you have under Bangladesh consumer law that cannot be waived.",
    ],
  },
  {
    title: "Governing law",
    body: [
      "These terms are governed by the laws of Bangladesh. Please contact us first if there is a problem, since we can solve most issues quickly. If we cannot, the courts of Dhaka will have jurisdiction.",
    ],
  },
  {
    title: "Changes to these terms",
    body: [
      "We may update these terms by posting a new version on this page with a new date. The terms that apply to your order are the ones in effect when you placed it.",
      "If any part of these terms cannot be enforced, the rest still applies.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <h1 className="font-display text-3xl font-bold">Terms &amp; Conditions</h1>
      <p className="mt-1 text-sm text-neutral-500">Last updated: November 23, 2026</p>

      <p className="mt-5 leading-relaxed text-neutral-700">
        These terms are an agreement between you and {BUSINESS} ({"“we”"}, {"“us”"}).
        They apply when you use our website or place an order. By using our website or
        placing an order, you agree to these terms.
      </p>

      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl font-bold">{s.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-neutral-700">
              {s.body.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="font-display text-xl font-bold">Contact us</h2>
          <p className="mt-3 leading-relaxed text-neutral-700">
            {BUSINESS}
            <br />
            {ADDRESS}
            <br />
            Email: {EMAIL}
            <br />
            Phone: {PHONE}
            <br />
            Hours: {HOURS}
          </p>
        </div>
      </div>
    </section>
  );
}