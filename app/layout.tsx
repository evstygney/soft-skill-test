import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { siteContent } from "@/data/site-content";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  variable: "--font-fraunces"
});

export const metadata: Metadata = {
  title: siteContent.metadata.title,
  description: siteContent.metadata.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${manrope.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
