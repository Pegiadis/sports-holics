import React, { useState } from 'react';
import { Menu, X, Search, User, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'BASKETBALL', href: '/basketball', active: true },
    { name: 'FOOTBALL', href: '/football' },
    { name: 'VOLLEYBALL', href: '/volleyball' },
    { name: 'TENNIS', href: '/tennis' },
    { name: 'AUTO-MOTO', href: '/auto-moto' },
    { name: 'WATER POLO', href: '/water-polo' },
    { name: 'TRACK & FIELD', href: '/track-field' },
    { name: 'BLOGS', href: '/blogs' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>🔴 LIVE: Greece - Spain (Eurobasket)</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:text-primary-200" title="Notifications" aria-label="Notifications">
                <Bell size={16} />
              </button>
              <button className="hover:text-primary-200" title="User Profile" aria-label="User Profile">
                <User size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">SPORTS HOLICS</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`nav-link ${item.active ? 'active' : ''}`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-6 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  item.active
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
