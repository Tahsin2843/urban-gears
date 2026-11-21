export type Product = {
  slug: string // used in the URL: /products/[slug]
  name: string
  price: number // in BDT (৳)
  comparePrice?: number // old price, shown crossed out
  description: string
  images: string[] // paths inside public/images/products/
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  featured?: boolean // show on the homepage
  highlights?: string[]
  infoSections?: {
    title: string
    paragraphs?: string[]
    qa?: { q: string; a: string }[]
    open?: boolean
  }[]
  reasonBlocks?: { title: string; text: string; image: string }[]
  features?: { icon?: string; title: string; text: string; image?: string }[]
  steps?: { text: string; image?: string }[]
  faqs?: { q: string; a: string }[]
  guarantee?: string
}
