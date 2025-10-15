"use client";

import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/types";
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const tHeader = useTranslations('header');
  
  const sportsLinks = [
    { key: 'football', label: tHeader('football') },
    { key: 'basketball', label: tHeader('basketball') },
    { key: 'formula1', label: tHeader('formula1') },
  ];
  
  const companyLinks = [
    { key: 'about', label: t('links.about') },
    { key: 'contact', label: t('links.contact') },
    { key: 'privacy', label: t('links.privacy') },
    { key: 'terms', label: t('links.terms') },
  ];
  
  const socialIcons: SocialIcon[] = [
    { name: "Facebook", icon: "ri-facebook-fill" },
    { name: "Twitter", icon: "ri-twitter-fill" },
    { name: "Instagram", icon: "ri-instagram-fill" },
    { name: "YouTube", icon: "ri-youtube-fill" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="h-8 mb-4">
              <Image
                src="/no_back.png"
                alt="Sports Holics"
                width={120}
                height={32}
                className="h-full w-auto object-left"
                style={{ height: "auto" }}
              />
            </div>
          </div>

          {/* Sports Links */}
          <div>
            <h4 className="font-bold mb-4">{tHeader('more')}</h4>
            <ul className="space-y-2 text-sm">
              {sportsLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href="#"
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
            <h4 className="font-bold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold mb-4">{t('follow')}</h4>
            <div className="flex space-x-4">
              {socialIcons.map((social) => (
                <button
                  key={social.name}
                  className="w-8 h-8 flex items-center justify-center"
                  aria-label={social.name}
                >
                  <i
                    className={`${social.icon} text-gray-400 hover:text-primary cursor-pointer transition-colors`}
                  ></i>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Sports Holics. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}

