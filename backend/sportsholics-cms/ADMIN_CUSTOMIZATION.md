# Sports Holics CMS - Admin Panel Customization

## Overview

The Strapi admin panel has been fully customized to match the Sports Holics brand identity with an appealing, modern design.

## What's Been Customized

### 🎨 Brand Colors
- **Primary Red**: `#ef4444` - Main brand color
- **Secondary Blue**: `#1e40af` - Accent color
- Custom color palette for both light and dark themes

### 🎯 Visual Enhancements

1. **Custom Theme**
   - Branded color scheme matching the frontend
   - Beautiful gradients and hover effects
   - Smooth animations and transitions
   - Custom scrollbar with gradient styling

2. **Login Page**
   - Animated gradient background
   - Enhanced form styling with shadows
   - Branded welcome messages
   - Modern card design

3. **Navigation**
   - Custom branded logo with gradient text effect
   - Gradient header background
   - Active link highlighting with brand colors
   - Smooth hover transitions

4. **Content Areas**
   - Card hover effects with subtle shadows
   - Enhanced table row interactions
   - Smooth button animations
   - Custom alert/notification styling

5. **Dark Mode**
   - Fully customized dark theme
   - Maintains brand colors in dark context
   - Optimized for extended use

### 📁 Files Modified/Created

1. **`src/admin/app.tsx`** (NEW)
   - Main admin customization file
   - Theme configuration (light & dark)
   - Custom translations and labels
   - Bootstrap styling injection

2. **`src/admin/vite.config.ts`** (NEW)
   - Vite configuration for admin panel
   - Build optimization
   - Development server setup

3. **`config/admin.ts`** (UPDATED)
   - Admin panel title: "Sports Holics CMS"
   - Email configuration
   - URL settings

4. **`public/uploads/logo.svg`** (NEW)
   - Custom Sports Holics logo with trophy icon
   - Gradient styling matching brand colors
   - Scalable vector format

## How to Use

### Development
```bash
cd backend/sportsholics-cms
npm run develop
```

The admin panel will be available at `http://localhost:1337/admin`

### Production Build
```bash
cd backend/sportsholics-cms
npm run build
npm start
```

## Customization Options

### Change Colors
Edit the color values in `src/admin/app.tsx`:
```typescript
theme: {
  light: {
    colors: {
      primary500: '#ef4444', // Change this to your desired color
      secondary500: '#1e40af',
      // ... other colors
    }
  }
}
```

### Add Custom Logo
Replace `public/uploads/logo.svg` with your own logo file. Supported formats:
- SVG (recommended)
- PNG
- JPEG

Update the logo path in `src/admin/app.tsx`:
```typescript
auth: {
  logo: '/uploads/your-logo.svg',
}
```

### Custom Translations
Modify the translations object in `src/admin/app.tsx`:
```typescript
translations: {
  en: {
    'Auth.form.welcome.title': 'Your Custom Title',
    // ... other translations
  }
}
```

### Add Custom CSS
Add your custom styles in the `bootstrap()` function in `src/admin/app.tsx`:
```typescript
bootstrap(app: StrapiApp) {
  const style = document.createElement('style');
  style.textContent = `
    /* Your custom CSS here */
  `;
  document.head.appendChild(style);
}
```

## Features

✅ Custom branded color scheme  
✅ Smooth animations and transitions  
✅ Responsive design  
✅ Dark mode support  
✅ Custom logo and branding  
✅ Enhanced user experience  
✅ Professional appearance  
✅ Gradient effects and modern styling  
✅ Custom scrollbars  
✅ Hover effects throughout  

## Additional Customization Ideas

### Add Favicon
1. Add your favicon to `public/uploads/favicon.png`
2. It will automatically be used by the admin panel

### Custom Fonts
Add custom fonts by importing them in the bootstrap function:
```typescript
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Your+Font';
link.rel = 'stylesheet';
document.head.appendChild(link);
```

### Disable Features
You can disable certain UI elements in `src/admin/app.tsx`:
```typescript
config: {
  tutorials: false, // Disable tutorials
  notifications: {
    releases: false, // Disable release notifications
  }
}
```

## Support

For more customization options, refer to the [Strapi Admin Panel API documentation](https://docs.strapi.io/dev-docs/admin-panel-customization).

---

**Enjoy your beautifully branded Sports Holics CMS! 🏆⚽**

