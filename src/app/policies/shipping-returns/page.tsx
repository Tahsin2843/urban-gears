export const metadata = { title: "Return and Refund Policy" };

const BUSINESS = "Urban Gears";
const EMAIL = "urbangears@gmail.com";
const PHONE = "01581187470";
const ADDRESS = "Vatara, Dhaka - 1212";
const HOURS = "Saturday to Thursday, 10:00 AM to 6:00 PM";
const RETURN_DAYS = 7; // days after delivery to request a return
const DEFECT_DAYS = 3; // days after delivery to report a wrong or defective item

const sections: { title: string; body: string[] }[] = [
  {
    title: "Our return policy",
    body: [
      `If you are not happy with your order, contact us within ${RETURN_DAYS} days of delivery and we will review your return request.`,
      "To be accepted, the item must be unused, clean, and in the same condition you received it, with its original packaging.",
      "Because this is a product you drink from, we cannot accept returns of items that have been used or filled, unless they are defective.",
    ],
  },
  {
    title: "Damage caused by the customer",
    body: [
      "We do not accept returns, exchanges, or refunds for products that were damaged after delivery by the customer.",
      "This includes cuts, tears, stains, burns, deformation from heat or misuse, damage from washing or storing the product in a way it is not designed for, and any other damage that did not exist when the product was delivered.",
      "We check every returned item. If we find damage that was not caused during delivery or manufacturing, we will not issue a refund or replacement, and the item will be sent back to you at your cost if you ask for it.",
    ],
  },
  {
    title: "Damaged, defective, or wrong items",
    body: [
      `If your order arrives damaged, does not work properly, or is not what you ordered, contact us within ${DEFECT_DAYS} days of delivery.`,
      "Please send your order number and clear photos or a short video of the problem. If possible, record yourself opening the parcel.",
      "If we confirm the problem, we will send a replacement or give you a full refund, including the delivery charge, at no cost to you.",
    ],
  },
  {
    title: "How to request a return",
    body: [
      `Call or message us on ${PHONE}, or email ${EMAIL}, with your order number, your name, and the reason for the return.`,
      "We will reply within 1 business day and tell you whether the return is approved.",
      "Do not send the product back before we approve it. We cannot match unannounced parcels to an order.",
      "Pack the item securely and send it to the address we give you. Keep your courier receipt until your refund is complete.",
    ],
  },
  {
    title: "Return shipping costs",
    body: [
      "Damaged, defective, or wrong items: we cover the return shipping.",
      "All other approved returns: you pay the return shipping.",
      "The original delivery charge is not refunded for returns that are not caused by our mistake.",
    ],
  },
  {
    title: "Refunds",
    body: [
      "After we receive and check your return, we will tell you whether the refund is approved.",
      "Approved refunds are sent within 5 to 7 business days by the method we agree with you, such as bKash, Nagad, or bank transfer, since you paid by cash on delivery.",
    ],
  },
  {
    title: "Exchanges",
    body: [
      "We do not offer direct exchanges. Return the original item under this policy and place a new order for the item you want.",
    ],
  },
  {
    title: "Cancelling an order",
    body: [
      "To cancel an order before it ships, call or message us as soon as possible.",
      "Once an order has been handed to the courier, it cannot be cancelled. You can still refuse it at delivery, but repeated refusals may stop us from accepting future cash on delivery orders from you.",
    ],
  },
  {
    title: "Late or lost orders",
    body: [
      "If your order has not arrived within the delivery time we told you, contact us. We will check with the courier and update you within 2 business days.",
      "If the courier confirms the parcel is lost, we will send a replacement or give you a full refund.",
    ],
  },
  {
    title: "Your legal rights",
    body: [
      "This policy is in addition to any rights you have under Bangladesh consumer law. Nothing here limits those rights.",
    ],
  },
];

export default function ReturnsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      <h1 className="font-display text-3xl font-bold">Return and refund policy</h1>
      <p className="mt-1 text-sm text-neutral-500">Last updated: November 23, 2026</p>

      <p className="mt-5 leading-relaxed text-neutral-700">
        This policy explains how returns, exchanges, and refunds work at {BUSINESS}.
        It applies to every product we sell.
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
            <br />
            Hours: {HOURS}
          </p>
        </div>
      </div>
    </section>
  );
}