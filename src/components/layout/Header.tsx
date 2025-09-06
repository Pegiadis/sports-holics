import { useState } from 'react';
import { Menu, X, Search, Bell, User } from 'lucide-react';
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from '../../utils/constants';

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className={`bg-white shadow-md sticky top-0 z-50 ${className}`}>
      {/* Top bar with social links and quick actions */}
      <div className="bg-neutral-900 text-white">
        <div className="container">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full live-indicator"></div>
                <span>Live Scores</span>
              </div>
              <div className="hidden sm:flex items-center space-x-3">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label={link.platform}
                  >
                    <span className="text-xs">{link.platform}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSearch}
                className="p-1 text-neutral-400 hover:text-white transition-colors bg-transparent border-none"
                aria-label="Search"
                title="Search"
              >
                <Search size={16} />
              </button>
              <button
                className="p-1 text-neutral-400 hover:text-white transition-colors bg-transparent border-none"
                aria-label="Notifications"
              >
                <Bell size={16} />
              </button>
              <button
                className="p-1 text-neutral-400 hover:text-white transition-colors bg-transparent border-none"
                aria-label="User menu"
              >
                <User size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar (when open) */}
      {isSearchOpen && (
        <div className="bg-primary-50 border-b border-primary-200">
          <div className="container">
            <div className="py-4">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search news, teams, players..."
                  className="w-full pl-10 pr-4 py-3 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                <button
                  onClick={toggleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 bg-transparent border-none p-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main header */}
      <div className="container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-3">
              <img 
                src="/main-logo.jpg" 
                alt="Sports Holics Logo" 
                className="h-12 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-neutral-900 m-0">Sports Holics</h1>
                <p className="text-xs text-neutral-600 m-0">Euroleague Central</p>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href} className="relative group">
                  <a
                    href={item.href}
                    className="text-neutral-700 hover:text-primary-600 font-medium transition-colors py-2"
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 transition-colors"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-neutral-700 hover:text-primary-600 transition-colors bg-transparent border-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200">
          <div className="container">
            <nav className="py-4">
              <ul className="space-y-2">
                {NAVIGATION_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block py-3 px-4 text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 rounded-lg transition-colors font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                    {item.children && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              className="block py-2 px-4 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-primary-600 rounded-lg transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
