"use client";

import Image from "next/image";
import Link from "next/link";
import { sportsLinks, companyLinks, socialIcons } from "@/lib/data";
import { resetConsent } from "@/lib/cookie-consent";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      {/* Gradient top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />

      {/* Subtle pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Newsletter / CTA section */}
        <div className="py-10 border-b border-gray-800/60 text-center">
          <h3 className="text-2xl font-bold tracking-tight mb-2">
            Μείνετε ενημερωμένοι
          </h3>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Ακολουθήστε μας στα κοινωνικά δίκτυα για τα τελευταία αθλητικά νέα,
            αναλύσεις και αποκλειστικό περιεχόμενο.
          </p>
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-14">
          {/* Logo and Description */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="h-10 w-32 mb-4">
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
            <h4 className="font-bold mb-5 text-base tracking-wide">
              Περισσότερα
            </h4>
            <ul className="space-y-3 text-sm">
              {sportsLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-5 text-base tracking-wide">
              Γρήγοροι Σύνδεσμοι
            </h4>
            <ul className="space-y-3 text-sm">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  {link.action === "manageCookies" ? (
                    <button
                      onClick={() => {
                        resetConsent();
                        window.location.reload();
                      }}
                      className="text-gray-400 hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-200"
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
            <h4 className="font-bold mb-5 text-base tracking-wide">
              Ακολουθήστε μας
            </h4>
            <div className="flex flex-wrap gap-4">
              {socialIcons.map((social) => (
                <button
                  key={social.name}
                  className="group w-12 h-12 flex items-center justify-center bg-gray-800/80 hover:bg-gradient-to-br hover:from-[var(--color-primary)] hover:to-[var(--color-secondary)] rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[var(--color-primary)]/20"
                  aria-label={social.name}
                >
                  <i
                    className={`${social.icon} text-gray-400 group-hover:text-white cursor-pointer transition-colors duration-300 text-xl`}
                  ></i>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800/60 py-6 text-center">
          <p className="text-gray-500 text-xs tracking-wide">
            &copy; 2025 Sports Holics. Όλα τα δικαιώματα διατηρούνται.
          </p>
        </div>
      </div>
    </footer>
  );
}
