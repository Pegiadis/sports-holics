# ⚡ Sports News Homepage - Quick Start

## 🎉 What's Been Created

✅ **Modern Sports News Homepage** - Dark theme, professional layout  
✅ **Hero Section** - Large featured article with image  
✅ **Sidebar Articles** - 3 smaller articles with thumbnails  
✅ **Articles Grid** - Grid of article cards  
✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Full Strapi Integration** - Ready to connect to your CMS  

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Update Strapi Article Fields (2 minutes)

Go to Strapi admin (`http://localhost:1337/admin`):

1. **Content-Type Builder** → Click **Article**
2. Add these NEW fields:
   - `image` → Media (Single media, Images only)
   - `excerpt` → Text (Short text)
   - `category` → Text (Short text)
   - `featured` → Boolean (default: false)
3. Click **Save** and wait for restart

### Step 2: Enable Upload Permissions (30 seconds)

1. **Settings** → **Roles** → **Public**
2. Under **Upload**, check:
   - ✅ `find`
   - ✅ `findOne`
3. Make sure **Article** has `find` and `findOne` checked
4. Click **Save**

### Step 3: Create Sample Articles (2 minutes)

**Content Manager** → **Article** → **Create new entry**

Create 3-4 articles with:
- Title: Any sports headline
- Excerpt: 1-2 sentence summary
- Content: Full article text
- Category: "CHAMPIONSHIP", "TRANSFERS", "LIVE", etc.
- Author: Your name
- Featured: Check box for ONE article (this becomes hero)
- Image: Upload any sports image

**Important**: Click **Publish** (not just save!)

### Step 4: View Your Site! (now)

```bash
# Make sure both are running:
# Terminal 1: cd sportsholics-backend && npm run develop
# Terminal 2: cd sportsholics-website && npm run dev
```

Open: `http://localhost:5173`

---

## 🎨 What You'll See

### Layout:
```
┌─────────────────────────────────────┐
│         HEADER / LOGO / NAV         │
├─────────────────────┬───────────────┤
│                     │  Article 1    │
│   HERO ARTICLE      ├───────────────┤
│   (Featured)        │  Article 2    │
│                     ├───────────────┤
│                     │  Article 3    │
├─────────────────────┴───────────────┤
│  Article │ Article │ Article │ ...  │
│  Grid    │  Grid   │  Grid   │ ...  │
└──────────┴─────────┴─────────┴──────┘
```

### Features:
- ✨ Dark theme (black background)
- 🖼️ Image-rich cards
- 🏷️ Category badges (blue)
- 📅 Formatted dates
- 🎯 Hover effects
- 📱 Mobile responsive

---

## 📸 Getting Free Sports Images

### Quick Sources:
1. **Unsplash**: https://unsplash.com/s/photos/sports
2. **Pexels**: https://www.pexels.com/search/sports/
3. **Pixabay**: https://pixabay.com/images/search/football/

### Upload in Strapi:
- In article editor → **Image** field → **Add new assets**
- Drag & drop or browse
- Recommended size: 1200x675px (16:9)

---

## 🎯 Sample Article Data

Use this template for quick testing:

**Article 1** (Featured):
```
Title: Team Clinches Championship in Dramatic Final
Excerpt: Historic victory sealed in the dying minutes of an incredible match that had fans on the edge of their seats.
Category: CHAMPIONSHIP
Featured: ✅ true
```

**Article 2**:
```
Title: Star Player Signs Five-Year Extension
Excerpt: Club announces major signing that secures the future of their key player for years to come.
Category: TRANSFERS
Featured: ❌ false
```

**Article 3**:
```
Title: Coach Reveals Strategy for Upcoming Season
Excerpt: In an exclusive interview, the manager discusses tactics and expectations for the new campaign.
Category: INTERVIEWS
Featured: ❌ false
```

---

## 🐛 Troubleshooting

### "No Articles Yet"
- Create articles in Strapi
- Make sure to click **Publish**

### Images Not Showing
- Check Upload permissions (Step 2)
- Make sure images uploaded in Strapi
- Verify articles are published

### Featured Article Not Working
- Mark ONE article with `featured: true`
- Or newest article will show in hero by default

### CORS Errors
- Already configured! Just restart Strapi if needed

---

## 🎨 Customization

### Change Colors:
Edit `HomePage.css`:
```css
:root {
  --accent-blue: #2563eb;    /* Change to your color */
  --accent-green: #10b981;   /* Change to your color */
}
```

### Change Hero Size:
Edit `HomePage.css`:
```css
.hero-article {
  height: 500px; /* Change height */
}
```

### Change Number of Articles:
Edit `HomePage.tsx` (line ~190):
```typescript
const sideArticles = articles.slice(0, 3);  // Change 3
const gridArticles = articles.slice(3, 9);  // Change 9
```

---

## ✅ Checklist

- [ ] Strapi running (`npm run develop`)
- [ ] React app running (`npm run dev`)
- [ ] Article content type updated with 4 new fields
- [ ] Upload permissions enabled
- [ ] At least 3 articles created WITH IMAGES
- [ ] All articles published (not drafts)
- [ ] One article marked as featured
- [ ] Browser showing dark sports theme
- [ ] Images loading correctly
- [ ] No console errors

---

## 📚 Full Documentation

For detailed setup instructions, see:
- `STRAPI_INTEGRATION_GUIDE.md` - Complete Strapi setup
- `README_INTEGRATION.md` - General React + Strapi info
- `QUICK_START.md` - Original test component guide

---

## 🎉 You're Done!

Your sports news website is ready! 

**What's next?**
- Add more articles
- Customize colors and styling
- Add single article pages
- Add search/filter functionality
- Deploy to production

Enjoy building your sports platform! ⚽🏀🏈

