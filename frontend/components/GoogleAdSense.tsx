import Script from 'next/script';

/**
 * Google AdSense Component
 * 
 * Loads the AdSense script in the document head.
 * Google will automatically display ads at the most appropriate places.
 * 
 * Note: It may take up to 1 hour for ads to appear on the page.
 */
export default function GoogleAdSense() {
  const adsenseId = 'ca-pub-5345946941895235';

  return (
    <>
      {/* AdSense verification meta tag */}
      <meta name="google-adsense-account" content={adsenseId} />
      
      {/* AdSense script */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}

