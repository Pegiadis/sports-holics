"use client";

import Image from "next/image";
import Link from "next/link";
import { sportsLinks, companyLinks, socialIcons } from "@/lib/data";
import { resetConsent } from "@/lib/cookie-consent";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 mb-10 md:mb-0">
            <div className="h-10 w-32">
              <Image
                src="/no_back.png"
                alt="Sports Holics"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          {/* Sports Links */}
          <div>
            <h4 className="font-bold mb-4 text-base">Περισσότερα</h4>
            <ul className="space-y-2 text-sm">
              {sportsLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-4 text-base">Γρήγοροι Σύνδεσμοι</h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  {link.action === "manageCookies" ? (
                    <button
                      onClick={() => {
                        resetConsent();
                        window.location.reload();
                      }}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold mb-4 text-base">Ακολουθήστε μας</h4>
            <div className="flex flex-wrap gap-3">
              {socialIcons.map((social) => (
                <button
                  key={social.name}
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-primary rounded-lg transition-colors"
                  aria-label={social.name}
                >
                  <i
                    className={`${social.icon} text-gray-400 hover:text-white cursor-pointer transition-colors text-lg`}
                  ></i>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Sports Holics. Όλα τα δικαιώματα διατηρούνται.</p>
        </div>
      </div>
    </footer>
  );
}
