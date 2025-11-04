import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    // Add custom locales if needed
    locales: [
      // 'fr',
      // 'es',
    ],
    
    // Customize authentication page
    auth: {
      logo: '/no_back.png', // Custom logo (you can add your own)
    },
    
    // Customize main navigation
    head: {
      favicon: '/no_back.png',
    },
    
    // Customize the admin panel's look and feel
    theme: {
      light: {
        colors: {
          // Primary brand color (Sports Holics Red)
          primary100: '#fef2f2',
          primary200: '#fee2e2',
          primary500: '#ef4444',
          primary600: '#dc2626',
          primary700: '#b91c1c',
          
          // Secondary color (Sports Holics Blue)
          secondary100: '#dbeafe',
          secondary200: '#bfdbfe',
          secondary500: '#1e40af',
          secondary600: '#1e3a8a',
          secondary700: '#1e3a8a',
          
          // Accent colors
          alternative100: '#f0f9ff',
          alternative200: '#e0f2fe',
          alternative500: '#0ea5e9',
          alternative600: '#0284c7',
          alternative700: '#0369a1',
          
          // Success colors
          success100: '#dcfce7',
          success200: '#bbf7d0',
          success500: '#22c55e',
          success600: '#16a34a',
          success700: '#15803d',
          
          // Danger colors
          danger100: '#fee2e2',
          danger200: '#fecaca',
          danger500: '#ef4444',
          danger600: '#dc2626',
          danger700: '#b91c1c',
          
          // Warning colors
          warning100: '#fef3c7',
          warning200: '#fde68a',
          warning500: '#f59e0b',
          warning600: '#d97706',
          warning700: '#b45309',
          
          // Neutral colors
          neutral0: '#ffffff',
          neutral100: '#f9fafb',
          neutral150: '#f3f4f6',
          neutral200: '#e5e7eb',
          neutral300: '#d1d5db',
          neutral400: '#9ca3af',
          neutral500: '#6b7280',
          neutral600: '#4b5563',
          neutral700: '#374151',
          neutral800: '#1f2937',
          neutral900: '#111827',
          neutral1000: '#000000',
        },
      },
      
      // Dark theme customization
      dark: {
        colors: {
          // Primary brand color (Sports Holics Red)
          primary100: '#7f1d1d',
          primary200: '#991b1b',
          primary500: '#ef4444',
          primary600: '#f87171',
          primary700: '#fca5a5',
          
          // Secondary color (Sports Holics Blue)
          secondary100: '#1e3a8a',
          secondary200: '#1e40af',
          secondary500: '#3b82f6',
          secondary600: '#60a5fa',
          secondary700: '#93c5fd',
          
          // Background colors for dark theme
          neutral0: '#1f2937',
          neutral100: '#111827',
          neutral150: '#0f172a',
          neutral200: '#1e293b',
          neutral300: '#334155',
          neutral400: '#475569',
          neutral500: '#64748b',
          neutral600: '#94a3b8',
          neutral700: '#cbd5e1',
          neutral800: '#e2e8f0',
          neutral900: '#f1f5f9',
          neutral1000: '#ffffff',
        },
      },
    },
    
    // Customize translations and labels
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'Sports Holics',
        'app.components.LeftMenu.navbrand.workplace': 'CMS Dashboard',
        'Auth.form.welcome.title': 'Welcome to Sports Holics!',
        'Auth.form.welcome.subtitle': 'Log in to your Sports Holics CMS account',
        'HomePage.welcome': 'Welcome to Sports Holics CMS! 🏆',
        'HomePage.welcome.again': 'Welcome back to Sports Holics! ⚽',
      },
    },
    
    // Custom menu configuration
    menu: {
      logo: '/no_back.png',
    },
    
    // Tutorials configuration
    tutorials: false, // Disable default tutorials for cleaner experience
    
    // Notifications configuration
    notifications: {
      releases: false, // Disable release notifications for cleaner UI
    },
  },
  
  bootstrap(app: StrapiApp) {
    // Custom styling injected on bootstrap
    const style = document.createElement('style');
    style.textContent = `
      /* Custom Sports Holics branding styles */
      
      /* Logo text styling */
      [class*="LeftMenu"] [class*="NavBrand"] {
        font-family: 'Arial Black', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-weight: 900;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #1e40af 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 1.25rem;
        letter-spacing: -0.02em;
      }
      
      /* Main header styling */
      [class*="MainNav"] {
        background: linear-gradient(90deg, #fef2f2 0%, #dbeafe 100%);
        border-bottom: 2px solid #ef4444;
      }
      
      /* Button hover effects */
      button[class*="Button"]:hover {
        transform: translateY(-1px);
        transition: all 0.2s ease;
      }
      
      /* Card hover effects */
      [class*="Box"] {
        transition: all 0.3s ease;
      }
      
      [class*="Box"]:hover {
        box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.1);
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      
      ::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 5px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #ef4444 0%, #1e40af 100%);
        border-radius: 5px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #dc2626 0%, #1e3a8a 100%);
      }
      
      /* Login page customization */
      [class*="UnauthenticatedLayout"] {
        background: linear-gradient(135deg, #fef2f2 0%, #dbeafe 50%, #f0f9ff 100%);
        background-size: 400% 400%;
        animation: gradientShift 15s ease infinite;
      }
      
      @keyframes gradientShift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      /* Login form styling */
      [class*="AuthPage"] [class*="Box"] {
        box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(239, 68, 68, 0.1);
      }
      
      /* Header logo area */
      [class*="MainNav"] [class*="Logo"] img {
        filter: drop-shadow(2px 2px 4px rgba(239, 68, 68, 0.2));
      }
      
      /* Success messages */
      [class*="alert-success"] {
        background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
        border-left: 4px solid #22c55e;
      }
      
      /* Error messages */
      [class*="alert-danger"] {
        background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
        border-left: 4px solid #ef4444;
      }
      
      /* Table row hover */
      [class*="Tbody"] [class*="Tr"]:hover {
        background: linear-gradient(90deg, #fef2f2 0%, #ffffff 100%);
        transform: scale(1.005);
        transition: all 0.2s ease;
      }
      
      /* Active navigation items */
      [class*="NavLink"][aria-current="page"] {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      }
    `;
    document.head.appendChild(style);
    
    console.log('🏆 Sports Holics CMS Admin Panel Loaded!');
  },
};

