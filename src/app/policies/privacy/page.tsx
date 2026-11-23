export const metadata = { title: "Privacy Policy" };

const BUSINESS = "Urban Gears";
const ADDRESS = "Vatara, Dhaka - 1212";
const EMAIL = "urbangearas@email.com";
const PHONE = "01581187470";

const sections: { title: string; body: string[] }[] = [
  {
    title: "Information we collect",
    body: [
      "Order details: your name, phone number, delivery address, any note you add, and the products you order.",
      "Device and usage data: IP address, browser and device type, pages viewed, and advertising identifiers collected through cookies and pixels.",
      "Messages you send us by phone, WhatsApp, email, or social media.",
      "We do not collect card details. We currently take cash on delivery only.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "To confirm, pack, deliver, and support your order, including calling you to confirm it.",
      "To handle returns, exchanges, and questions.",
      "To measure and improve our website and advertising.",
      "To prevent fake orders and fraud, and to meet legal and accounting duties.",
    ],
  },
  {
    title: "Cookies, pixels and advertising",
    body: [
      "We use cookies, local storage, and similar tools to keep your cart working and understand how our pages are used.",
      "We use the Meta (Facebook and Instagram) Pixel to measure and show ads. Meta may receive browsing and purchase information and uses it under its own privacy policy.",
      "You can block or delete cookies in your browser settings, and adjust ad preferences in your Meta account. Blocking essential cookies may stop the cart from working.",
    ],
  },
  {
    title: "Who we share it with",
    body: [
      "We do not sell your personal information.",
      "We share it only as needed with delivery and courier partners, our website hosting and email providers, advertising and analytics partners as described above, and authorities when the law requires it.",
      "These providers may use your information only to provide their services to us.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "We keep order records for as long as needed for deliveries, returns, accounting, and legal requirements. We delete or anonymize other information when we no longer need it.",
    ],
  },
  {
    title: "Security",
    body: [
      "Our website uses encrypted connections (HTTPS) and we limit who can see order information. No system is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Children",
    body: [
      "Our products and website are for adults. We do not knowingly collect information from children. If you think a child has given us information, contact us and we will delete it.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You can ask to see, correct, or delete the personal information we hold about you, or object to its use for advertising. Contact us using the details below and we will reply as soon as we can.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "We may update this policy. We will change the date at the top when we do.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <h1 className="font-display text-3xl font-bold">Privacy policy</h1>
      <p className="mt-1 text-sm text-neutral-500">Last updated: November 23, 2026</p>

      <p className="mt-5 leading-relaxed text-neutral-700">
        This policy explains how {BUSINESS} ({"“we”"}, {"“us”"}) collects, uses, and
        shares personal information when you visit our website, order from us, or
        contact us.
      </p>

      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl font-bold">{s.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-neutral-700">
              {s.body.map((line) => (
                <li key={line}>{line}</li>
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
          </p>
        </div>
      </div>
    </section>
  );
}