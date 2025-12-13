"use client";

import { useEffect } from "react";

/**
 * Loads RemixIcon CSS asynchronously to prevent render blocking
 * This improves FCP and LCP metrics
 */
export default function RemixIconLoader() {
  useEffect(() => {
    // Check if already loaded
    const existingLink = document.querySelector(
      'link[href*="remixicon.min.css"]'
    );
    if (existingLink) return;

    // Create and append the stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css";
    document.head.appendChild(link);
  }, []);

  return null;
}

