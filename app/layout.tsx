import type { Metadata } from "next";
import { Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";

const heading = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["700", "900"] 
});

const body = Sora({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["400", "600"] 
});

export const metadata: Metadata = {
  title: "Signage By Timmysigns | Engineering Impact",
  description: "Premier choice for high-impact industrial signage in Ibadan and Lagos. Precision engineering and bold design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans bg-primary text-white`}>
        {children}
      </body>
    </html>
  );
}