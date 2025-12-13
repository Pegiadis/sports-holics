"use client";

import { useState, useEffect } from "react";
import {
  hasConsentChoice,
  acceptAllCookies,
  rejectAllCookies,
} from "@/lib/cookie-consent";

interface CookieConsentProps {
  onConsentChange?: (accepted: boolean) => void;
}

export default function CookieConsent({ onConsentChange }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Only show banner if user hasn't made a choice yet
    if (!hasConsentChoice()) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    acceptAllCookies();
    setShowBanner(false);
    onConsentChange?.(true);
    // Reload to apply analytics
    window.location.reload();
  };

  const handleReject = () => {
    rejectAllCookies();
    setShowBanner(false);
    onConsentChange?.(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Text Content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0v-2zm0-4a1 1 0 112 0 1 1 0 01-2 0z" />
              </svg>
              <h3 className="text-white font-semibold text-lg">
                Χρήση Cookies
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Χρησιμοποιούμε cookies για να αναλύουμε την επισκεψιμότητα του
              ιστότοπου και να βελτιώσουμε την εμπειρία σας. Τα cookies
              ανάλυσης μας βοηθούν να κατανοήσουμε πώς χρησιμοποιείτε τον
              ιστότοπο.{" "}
              <a
                href="/privacy-policy"
                className="text-red-400 hover:text-red-300 underline transition-colors"
              >
                Μάθετε περισσότερα
              </a>
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleReject}
              className="px-6 py-2.5 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200 border border-gray-600"
            >
              Απόρριψη
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 shadow-lg shadow-red-600/20"
            >
              Αποδοχή
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

