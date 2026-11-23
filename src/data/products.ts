import type { Product } from "@/types/product"

export const products: Product[] = [
  {
    slug: "silicone-water-bottle",
    name: "Foldabfle Water Bottle",
    price: 450,
    description:
      "A soft, foldable silicone water bottle that is light, leak-resistant, and easy to carry. Squeeze it flat when empty and slip it into your bag.",
    images: [
      "/images/products/silicone-water-bottle/1.jpg",
      "/images/products/silicone-water-bottle/2.jpg",
      "/images/products/silicone-water-bottle/3.jpg",
      "/images/products/silicone-water-bottle/4.jpg",
      "/images/products/silicone-water-bottle/5.jpg",
      "/images/products/silicone-water-bottle/6.jpg",
    ],
    inStock: true,
    featured: true,
    highlights: [
      "Folds flat when empty, so it fits in any bag pocket",
      "Leak-resistant cap for gym, school, and travel",
      "Soft, lightweight silicone you can carry all day",
      "Easy to rinse and dry",
    ],
    infoSections: [
      {
        title: "What to expect?",
        paragraphs: [
          "A soft, foldable 600ml water bottle made from silicone. When it's full, it holds its shape. When it's empty, you can fold it down small and slip it into a bag, a pocket or a gym kit.",
          "It has a wide opening, so it's easy to fill, drink from and clean. The screw-top lid closes tightly, and a carrying loop lets you clip it to a bag or hang it from your hand.",
          "It's light enough for school, the gym, the office, cycling, a trip or a day out. Fill it up, carry it, fold it when you're done.",
        ],
      },
      {
        title: "Frequently asked questions?",
        qa: [
          {
            q: "How much water does it hold?",
            a: "600 ml, which is a little over two glasses of water.",
          },
          {
            q: "Does it leak?",
            a: "The screw-top lid is made to close tightly. Screw it on fully and keep the bottle upright, especially when it's full, and avoid squeezing it hard with the lid on.",
          },
          {
            q: "What is it made of?",
            a: "Soft silicone with a plastic lid. [CONFIRM WITH SUPPLIER: BPA-free / food-grade]",
          },
          {
            q: "How do I clean it?",
            a: "Rinse it with warm water and a little mild soap, then let it dry with the lid off. The wide opening makes it easy to reach inside.",
          },
          {
            q: "Can I put hot drinks in it?",
            a: "We recommend it for water and cold drinks. Please don't pour in boiling water.",
          },
          {
            q: "Which colors are available?",
            a: "[LIST YOUR REAL COLORS, e.g. Green, Pink]",
          },
          {
            q: "Can I pay on delivery?",
            a: "Yes. Cash on delivery is available all over Bangladesh. You pay when you receive the bottle.",
          },
          {
            q: "Can I return or exchange it?",
            a: "[YOUR REAL RETURN / EXCHANGE POLICY]",
          },
        ],
      },
      {
        title: "Shipping information",
        paragraphs: [
          "We deliver all over Bangladesh. Delivery charge is ৳70 inside Dhaka and ৳120 outside Dhaka.",
          "Delivery time: [YOUR REAL DELIVERY TIME, e.g. 1–2 days inside Dhaka, 3–5 days outside].",
          "After you place your order, we'll call you to confirm it before we send it. You pay in cash when the bottle arrives.",
        ],
      },
    ],
    reasonBlocks: [
      {
        title: "Folds flat when you're done",
        text: "Write 2 or 3 sentences about this reason, in your own words.",
        image: "/images/products/silicone-water-bottle/reason-1.jpeg",
      },
      {
        title: "Easy to carry anywhere",
        text: "Write 2 or 3 sentences about this reason, in your own words.",
        image: "/images/products/silicone-water-bottle/reason-2.jpeg",
      },
      {
        title: "Simple to clean and reuse",
        text: "Write 2 or 3 sentences about this reason, in your own words.",
        image: "/images/products/silicone-water-bottle/reason-3.jpeg",
      },
    ],
    features: [
      {
        title: "Foldable design",
        text: "Write one short line.",
        image: "/images/products/silicone-water-bottle/feature-1.jpeg",
      },
      {
        icon: "💧",
        title: "Leak-resistant",
        text: "No photo? The emoji shows instead.",
      },
    ],
    steps: [
      {
        text: "Unfold the bottle and open the cap.",
        image: "/images/products/silicone-water-bottle/step-1.jpeg",
      },
      {
        text: "Fill it with water and close the cap tightly.",
        image: "/images/products/silicone-water-bottle/step-2.jpeg",
      },
      { text: "When empty, fold it flat and put it in your bag." },
    ],
  },
]

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug)

export const getFeatured = () => products.filter((p) => p.featured)
