'use client';

import { useEffect } from 'react';

/**
 * Loads social media platform scripts on the client side
 * Transforms static blockquotes into interactive embeds
 */
export default function SocialMediaScripts() {
  useEffect(() => {
    // Twitter/X Widget Script
    if (!document.getElementById('twitter-wjs')) {
      const twitterScript = document.createElement('script');
      twitterScript.id = 'twitter-wjs';
      twitterScript.src = 'https://platform.twitter.com/widgets.js';
      twitterScript.async = true;
      twitterScript.charset = 'utf-8';
      document.body.appendChild(twitterScript);
    }

    // Instagram Embed Script
    if (!document.getElementById('instagram-embed')) {
      const instagramScript = document.createElement('script');
      instagramScript.id = 'instagram-embed';
      instagramScript.src = 'https://www.instagram.com/embed.js';
      instagramScript.async = true;
      document.body.appendChild(instagramScript);

      // Trigger Instagram embed processing if window.instgrm exists
      setTimeout(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      }, 1000);
    }

    // TikTok Embed Script
    if (!document.getElementById('tiktok-embed')) {
      const tiktokScript = document.createElement('script');
      tiktokScript.id = 'tiktok-embed';
      tiktokScript.src = 'https://www.tiktok.com/embed.js';
      tiktokScript.async = true;
      document.body.appendChild(tiktokScript);
    }

    // Note: Facebook SDK requires app ID, so omitting for now
    // Can be added later with proper configuration
  }, []);

  return null; // This component doesn't render anything
}

// TypeScript declaration for Instagram global
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
