import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const heading = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["700", "800"] 
});

const body = Inter({ 
  subsets: ["latin"], 
  variable: "--font-body" 
});

export const metadata: Metadata = {
  title: "Signage By Timmysigns | Bespoke Industrial Signage Nigeria",
  description: "Ibadan and Lagos's premier destination for bespoke industrial signage, blending clean corporate aesthetics with bold visibility.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}