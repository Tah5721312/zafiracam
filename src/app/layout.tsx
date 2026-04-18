import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "ZAFIRA | Luxury Jewelry",
  description: "Elegance is the ultimate victory. Discover luxury gold-plated jewelry where eternal beauty meets timeless design.",
  keywords: ["luxury", "jewelry", "gold-plated", "ZAFIRA", "peacock", "elegance", "designer"],
  icons: {
    icon: '/favicon/favicon.ico',
    apple: '/favicon/apple-icon.png',
  },
  manifest: '/favicon/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-obsidian-950 text-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
