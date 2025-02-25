import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-sans-bengali",
  subsets: ["bengali", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Barishal Community",
  description:
    "A vibrant community platform for the people of Barishal, fostering connections, sharing information, and building stronger relationships.",
  keywords: [
    "Barishal",
    "community",
    "barishal community",
    "Bangladesh",
    "local events",
    "community platform",
  ],
  authors: [{ name: "Barishal Community" }],
  openGraph: {
    title: "Barishal Community",
    description: "Connect with your local community in Barishal",
    type: "website",
    locale: "bn_BD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${notoSansBengali.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
