"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { hasAnalyticsConsent } from "@/lib/cookie-consent";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-K17RKWGK4M";

export default function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Check if user has given consent for analytics
    if (hasAnalyticsConsent()) {
      setShouldLoad(true);
    }
  }, []);

  // Don't render anything if no consent
  if (!shouldLoad) {
    return null;
  }

  return (
    <>
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
    </>
  );
}

