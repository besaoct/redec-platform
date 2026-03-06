import type { Metadata, Viewport } from "next";
import { Montserrat, Quicksand } from "next/font/google";
import "./globals.css";
import AppProviders from "./providers";
import { SEO, WEB_URL } from "@/data/constants";

const fontDisplay = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
});

const fontSans = Quicksand({
  variable: "--font-sans",
  weight: ["700", "600", "500", "400", "300"],
});
export const metadata: Metadata = {
  metadataBase: new URL(WEB_URL),
  ...SEO.metadata,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
