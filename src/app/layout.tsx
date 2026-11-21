import type { Metadata } from "next"
import { Manrope, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AnnouncementBar from "@/components/layout/AnnouncementBar"
import { CartProvider } from "@/context/CartContext"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: { default: "Urban Gears", template: "%s | Urban Gears" },
  description: "Urban Gears: streetwear and gear, delivered across Bangladesh.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink antialiased">
        <CartProvider>
          <div className="sticky top-0 z-50">
            <AnnouncementBar />
            <Header />
          </div>
          <main className="flex-1">{children}</main>
          
          <Footer/>


        </CartProvider>
      </body>
    </html>
  )
}
