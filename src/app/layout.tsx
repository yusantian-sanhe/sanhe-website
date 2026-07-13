import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";
import { SiteStructuredData } from "@/components/seo/SiteStructuredData";
import { SEO } from "@/constants/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase:
    new URL(SEO.siteUrl),

  title: {
    default:
      SEO.defaultTitle,
    template:
      SEO.titleTemplate,
  },

  description:
    SEO.defaultDescription,

  applicationName:
    SEO.siteName,

  keywords:
    [...SEO.keywords],

  icons: {
    icon:
      "/logo-icon.png",

    shortcut:
      "/logo-icon.png",

    apple:
      "/apple-touch-icon.png",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    url: SEO.siteUrl,
    siteName: SEO.siteName,
    title: SEO.defaultTitle,
    description:
      SEO.defaultDescription,

    images: [
      {
        url:
          SEO.ogImage,

        width: 1200,
        height: 630,

        alt:
          `${SEO.siteName} global agricultural food supply`,
      },
    ],
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      SEO.defaultTitle,

    description:
      SEO.defaultDescription,

    images: [
      SEO.ogImage,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteStructuredData />

        {children}
      </body>
    </html>
  );
}