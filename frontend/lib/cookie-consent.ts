/**
 * Cookie Consent Management Utilities
 * Handles GDPR-compliant cookie consent for Google Analytics
 */

const CONSENT_STORAGE_KEY = 'sportsholics_cookie_consent';

export interface CookieConsent {
  analytics: boolean;
  timestamp: number;
}

/**
 * Get the current cookie consent preferences from localStorage
 * Returns null if no consent has been given yet
 */
export function getConsent(): CookieConsent | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!stored) {
      return null;
    }
    return JSON.parse(stored) as CookieConsent;
  } catch {
    return null;
  }
}

/**
 * Check if user has given consent for analytics cookies
 */
export function hasAnalyticsConsent(): boolean {
  const consent = getConsent();
  return consent?.analytics === true;
}

/**
 * Check if user has made any consent choice (accept or reject)
 */
export function hasConsentChoice(): boolean {
  return getConsent() !== null;
}

/**
 * Save cookie consent preferences to localStorage
 */
export function setConsent(analytics: boolean): void {
  if (typeof window === 'undefined') {
    return;
  }

  const consent: CookieConsent = {
    analytics,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // localStorage might be full or disabled
    console.warn('Failed to save cookie consent preferences');
  }
}

/**
 * Accept all cookies (analytics enabled)
 */
export function acceptAllCookies(): void {
  setConsent(true);
}

/**
 * Reject all cookies (analytics disabled)
 */
export function rejectAllCookies(): void {
  setConsent(false);
}

/**
 * Reset cookie consent (remove from localStorage)
 * User will see the consent banner again
 */
export function resetConsent(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    console.warn('Failed to reset cookie consent');
  }
}

