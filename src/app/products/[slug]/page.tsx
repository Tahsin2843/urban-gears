import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { products, getProduct } from "@/data/products"
import { formatPrice } from "@/lib/utils"
import ProductGallery from "@/components/product/ProductGallery"
import AddToCartButton from "@/components/product/AddToCartButton"
import InfoAccordion from "@/components/product/InfoAccordion"
import ReasonBlocks from "@/components/product/ReasonBlock"
import AnnouncementBar from "@/components/layout/AnnouncementBar"
import ProductSections from "@/components/product/ProductSections"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: product.images[0] ? [product.images[0]] : [] },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  return (
    <>
      <article className="mx-auto max-w-6xl pb-6 md:grid md:grid-cols-2 md:gap-10 md:px-4 md:py-10">
        <ProductGallery images={product.images} name={product.name} />

        <div className="space-y-5 px-4 py-5 md:p-0">
          <h1 className="font-display mb-2 text-3xl font-bold md:text-3xl">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-brand">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-neutral-400 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          <p className="leading-relaxed text-neutral-700">
            {product.description}
          </p>

          {product.highlights && product.highlights.length > 0 && (
            <ul className="space-y-3">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-6 w-6 shrink-0 text-brand"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="11" fill="currentColor" />
                    <path
                      d="M7 12.5l3.2 3.2L17 9"
                      stroke="#fff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[15px] font-semibold leading-snug">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {product.infoSections && product.infoSections.length > 0 && (
            <InfoAccordion sections={product.infoSections} />
          )}

          <AddToCartButton product={product} />
        </div>
      </article>

      <ReasonBlocks product={product} />
      <ProductSections product={product} />

      {/* space so the mobile order bar doesn't cover the footer */}
      <div className="h-20 md:hidden" />
    </>
  )
}
