import React from 'react';
import { Facebook, Twitter, Youtube, Instagram, Rss } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Sports',
      links: [
        'Basketball',
        'Football',
        'Volleyball',
        'Tennis',
        'Auto-Moto',
        'Water Polo',
      ],
    },
    {
      title: 'Leagues',
      links: [
        'Euroleague',
        'Greek Basket League',
        'NBA',
        'Champions League',
        'Premier League',
        'Super League',
      ],
    },
    {
      title: 'Features',
      links: [
        'Live Scores',
        'Statistics',
        'Photo Galleries',
        'Blogs',
        'News',
        'Analysis',
      ],
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Contact',
        'Privacy Policy',
        'Terms of Service',
        'Careers',
        'Advertise',
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Rss, href: '#', label: 'RSS Feed' },
  ];

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-secondary-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300 mb-4">
                Get the latest sports news, scores, and analysis delivered to your inbox.
              </p>
              <div className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-secondary-800 border border-secondary-600 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-r-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="lg:text-right">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4 lg:justify-end">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="p-2 bg-secondary-800 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-8 border-t border-secondary-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <h2 className="text-xl font-bold text-primary-400 mr-4">SPORTS HOLICS</h2>
              <span className="text-gray-400">
                © {currentYear} All rights reserved
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              Powered by passion for sports
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
