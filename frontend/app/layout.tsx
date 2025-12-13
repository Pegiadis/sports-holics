import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sports Holics - Τελευταία Αθλητικά Νέα",
  description: "Ο απόλυτος προορισμός σας για αθλητικά νέα, σκορ και αναλύσεις",
  keywords: "αθλητικά νέα, ποδόσφαιρο, μπάσκετ, Formula 1, Ελλάδα",
  icons: {
    icon: '/no_back.svg', // Sports icon - perfect for a sports site!
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: "Sports Holics - Τελευταία Αθλητικά Νέα",
    description: "Ο απόλυτος προορισμός σας για αθλητικά νέα, σκορ και αναλύσεις",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Sports Holics',
    locale: 'el_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sports Holics - Τελευταία Αθλητικά Νέα",
    description: "Ο απόλυτος προορισμός σας για αθλητικά νέα",
    creator: '@sportsholics',
    site: '@sportsholics',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* Cookie Consent Banner - GDPR Compliance */}
        <CookieConsent />
        
        {/* Google Analytics - Only loads after user consent */}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
