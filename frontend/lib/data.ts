import { SocialIcon } from "@/types";

// Footer navigation links
export const sportsLinks = [
  { key: 'football', label: 'Ποδόσφαιρο', href: '/football' },
  { key: 'basketball', label: 'Μπάσκετ', href: '/basketball' },
  { key: 'formula1', label: 'Auto Moto', href: '/formula1' },
];

export const companyLinks = [
  { key: 'about', label: 'Σχετικά', href: '#' },
  { key: 'contact', label: 'Επικοινωνία', href: '#' },
  { key: 'privacy', label: 'Πολιτική Απορρήτου', href: '/privacy-policy' },
  { key: 'cookies', label: 'Διαχείριση Cookies', href: '#', action: 'manageCookies' },
];

export const socialIcons: SocialIcon[] = [
  { name: "Facebook", icon: "ri-facebook-fill" },
  { name: "Twitter", icon: "ri-twitter-fill" },
  { name: "Instagram", icon: "ri-instagram-fill" },
  { name: "YouTube", icon: "ri-youtube-fill" },
];