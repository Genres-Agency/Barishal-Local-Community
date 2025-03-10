import Navbar from "@/components/Navbar";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import ReduxProvider from "@/lib/providers/ReduxProviders";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";

const arial = localFont({
  src: "./fonts/arial.ttf",
  variable: "--font-bangla",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-english",
  display: "swap",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${arial.variable} ${poppins.variable}`}>
      <body className="bg-gray-50">
        <ReduxProvider>
          <ErrorBoundary>
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-50">
              <Navbar />
            </div>
            {children}
          </ErrorBoundary>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
