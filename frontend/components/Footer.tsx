import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/types";

export default function Footer() {
  const sportsLinks: string[] = ["Football", "Basketball", "Formula 1", "Tennis"];
  const companyLinks: string[] = ["About Us", "Contact", "Privacy Policy", "Terms of Service"];
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
                className="h-full w-auto object-contain"
                style={{ height: "auto" }}
              />
            </div>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for sports news, scores, and analysis.
            </p>
          </div>

          {/* Sports Links */}
          <div>
            <h4 className="font-bold mb-4">Sports</h4>
            <ul className="space-y-2 text-sm">
              {sportsLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
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
          <p>&copy; 2025 Sports Holics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

