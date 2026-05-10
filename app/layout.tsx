import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminBanner from "@/components/AdminBanner";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Daily Blog | Just another WordPress site",
  description: "A blog created with Next.js but styled like WordPress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
        <SessionProvider>
          <AdminBanner />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Analytics />
        </SessionProvider>
      </body>
    </html>
  );
}
