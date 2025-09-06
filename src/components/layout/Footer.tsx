import { Facebook, Twitter, Instagram, Youtube, Music } from 'lucide-react';
import { SOCIAL_LINKS, NAVIGATION_ITEMS } from '../../utils/constants';

interface FooterProps {
  className?: string;
}

const getSocialIcon = (iconName: string) => {
  const icons: Record<string, any> = {
    Facebook,
    Twitter,
    Instagram,
    Youtube,
    Music, // TikTok
  };
  return icons[iconName] || Facebook;
};

export default function Footer({ className = '' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-neutral-900 text-white ${className}`}>
      {/* Main footer content */}
      <div className="container">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/main-logo.jpg" 
                  alt="Sports Holics Logo" 
                  className="h-10 w-auto object-contain"
                />
                <div>
                  <h3 className="text-lg font-bold text-white m-0">Sports Holics</h3>
                  <p className="text-sm text-neutral-400 m-0">Euroleague Central</p>
                </div>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Your ultimate destination for Euroleague basketball news, analysis, stats, and insights. 
                Stay connected with the latest updates from the world's premier basketball competition.
              </p>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = getSocialIcon(link.icon);
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-primary-600 transition-all duration-200"
                      aria-label={link.platform}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {NAVIGATION_ITEMS.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-neutral-400 hover:text-white transition-colors text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Euroleague */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Euroleague</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/euroleague/standings" className="text-neutral-400 hover:text-white transition-colors text-sm">
                    Standings
                  </a>
                </li>
                <li>
                  <a href="/euroleague/schedule" className="text-neutral-400 hover:text-white transition-colors text-sm">
                    Schedule
                  </a>
                </li>
                <li>
                  <a href="/euroleague/stats" className="text-neutral-400 hover:text-white transition-colors text-sm">
                    Statistics
                  </a>
                </li>
                <li>
                  <a href="/euroleague/teams" className="text-neutral-400 hover:text-white transition-colors text-sm">
                    Teams
                  </a>
                </li>
                <li>
                  <a href="/euroleague/players" className="text-neutral-400 hover:text-white transition-colors text-sm">
                    Players
                  </a>
                </li>
                <li>
                  <a href="/euroleague/mvp" className="text-neutral-400 hover:text-white transition-colors text-sm">
                    MVP Race
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
              <p className="text-neutral-400 text-sm mb-4">
                Get the latest Euroleague news and analysis delivered to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-neutral-500 mt-2">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-neutral-400 text-sm">
                © {currentYear} Sports Holics. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a href="/privacy" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </a>
                <a href="/contact" className="text-neutral-400 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </div>
            </div>
            <div className="text-neutral-400 text-sm">
              Made with ❤️ for basketball fans
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
