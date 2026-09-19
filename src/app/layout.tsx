import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";

import { site } from "@/config/site";

import "./globals.css";

const bodyFont = Be_Vietnam_Pro({
  weight: ["400", "500"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-be-vietnam",
});

const displayFont = Playfair_Display({
  weight: ["400", "500"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: site.url ?? undefined,
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates:
    site.indexable && site.url ? { canonical: site.url.origin } : undefined,
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    ...(site.indexable && site.url
      ? {
          url: site.url.origin,
          images: [
            {
              url: new URL(site.ogImage.src, site.url).toString(),
              width: site.ogImage.width,
              height: site.ogImage.height,
              alt: site.ogImage.alt,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    ...(site.indexable && site.url
      ? { images: [new URL(site.ogImage.src, site.url).toString()] }
      : {}),
  },
  robots: { index: site.indexable, follow: site.indexable },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#faf8f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${bodyFont.variable} ${displayFont.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
