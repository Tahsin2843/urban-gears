import type { Product } from "@/types/product"

export const products: Product[] = [
  {
    slug: "silicone-water-bottle",
    name: "Foldable Water Bottle",
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
          "Write a short intro: what the product is and who it's for.",
          "Describe how it works and what the customer gets in the box.",
        ],
      },
      {
        title: "Frequently asked questions?",
        qa: [
          {
            q: "How do I clean it?",
            a: "Write your real care instructions here.",
          },
          {
            q: "Can I pay on delivery?",
            a: "Yes, cash on delivery is available. You pay when you receive the product.",
          },
          {
            q: "Can I return or exchange it?",
            a: "Write your real return or exchange policy here.",
          },
          {
            q: "How long does delivery take?",
            a: "Write your real delivery time here.",
          },
        ],
      },
      {
        title: "Shipping information",
        paragraphs: [
          "Delivery charge: ৳70 inside Dhaka, ৳120 outside Dhaka. Pay cash on delivery.",
          "Write your real processing and delivery time here.",
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
