import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROVANI — Bespoke Tailoring",
  description:
    "Ultra-premium bespoke suits crafted to perfection. From consultation to final fitting, every Rovani suit is a singular work of wearable art.",
  keywords: ["bespoke suits", "custom tailoring", "luxury suits India", "ROVANI", "wedding suits"],
  authors: [{ name: "ROVANI Atelier" }],
  openGraph: {
    title: "ROVANI — Bespoke Tailoring",
    description: "Ultra-premium bespoke suits crafted to perfection.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-cream text-text-primary antialiased">
        <CustomCursor />
        <CartDrawer />
        <SmoothScroll>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
