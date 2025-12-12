import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import type { Metadata } from "next";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-K17RKWGK4M';

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
        
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
