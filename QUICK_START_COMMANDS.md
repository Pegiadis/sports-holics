# Quick Start Commands - Strapi Integration

## 🚀 One-Time Setup

### 1. Create Environment File

Create `frontend/.env.local`:

```bash
# In Windows PowerShell (from project root)
cd frontend
New-Item -Path ".env.local" -ItemType File
```

Add this content to `frontend/.env.local`:
```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=
```

### 2. Start Strapi (First Terminal)

```bash
cd backend/sportsholics-cms
npm run develop
```

### 3. Configure Strapi Permissions

1. Open: http://localhost:1337/admin
2. Create admin account (first time only)
3. Go to: **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
4. Scroll to **Article** section
5. Enable: ✅ `find` and ✅ `findOne`
6. Click **Save**

### 4. Create Test Articles

In Strapi Admin (http://localhost:1337/admin):

1. Go to: **Content Manager** → **Articles**
2. Click: **Create new entry**
3. Fill in:
   ```
   Title: "Εκπληκτική Νίκη στο Τελευταίο Δευτερόλεπτο"
   Description: "Η ομάδα πέτυχε εντυπωσιακή ανατροπή..."
   Category: "ΜΠΑΣΚΕΤ"
   Author: "Νίκος Παπαδόπουλος"
   isCarousel: ✅ true
   isFeatured: (optional)
   ```
4. Upload an image
5. Click **Publish**
6. **Repeat 2-3 times** to create more carousel articles

### 5. Start Frontend (Second Terminal)

```bash
cd frontend
npm run dev
```

### 6. View Results

Open: http://localhost:3000

Scroll to "Σημαντικά Νέα" section to see your Strapi articles! 🎉

---

## 🔄 Daily Development Commands

### Start Everything

**Terminal 1 - Strapi:**
```bash
cd backend/sportsholics-cms
npm run develop
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access Points

- **Frontend**: http://localhost:3000
- **Strapi Admin**: http://localhost:1337/admin
- **Strapi API**: http://localhost:1337/api/articles

---

## 🧪 Testing the API

### Test Strapi API Directly

Open in browser or use curl:

```bash
# Get all articles
http://localhost:1337/api/articles?populate=image

# Get carousel articles
http://localhost:1337/api/articles?filters[isCarousel][$eq]=true&populate=image

# Get featured articles
http://localhost:1337/api/articles?filters[isFeatured][$eq]=true&populate=image
```

---

## 📝 Creating Articles Checklist

When creating articles in Strapi:

- [ ] Title is filled
- [ ] Description is filled
- [ ] Category is filled (use Greek names like "ΜΠΑΣΚΕΤ", "ΠΟΔΟΣΦΑΙΡΟ")
- [ ] Author is filled
- [ ] Image is uploaded
- [ ] **isCarousel is TRUE** (for carousel articles)
- [ ] Click **Publish** (not just Save)

---

## ❌ Troubleshooting

### Articles not showing?

```bash
# Check Strapi is running
# Open: http://localhost:1337/admin

# Check articles in Strapi
# Go to: Content Manager → Articles
# Verify: isCarousel = true AND status = Published

# Check API endpoint
# Open: http://localhost:1337/api/articles?filters[isCarousel][$eq]=true&populate=image
```

### "Failed to fetch" error?

1. ✅ Is Strapi running? (http://localhost:1337/admin)
2. ✅ Is `.env.local` created with correct URL?
3. ✅ Are Public permissions enabled for articles?
4. ✅ Restart the frontend after creating `.env.local`

### Images not loading?

1. ✅ Check image uploaded in Strapi
2. ✅ Check `next.config.ts` has remotePatterns for localhost:1337
3. ✅ Restart frontend after modifying next.config.ts

---

## 📚 Documentation

- **Detailed Setup**: `frontend/STRAPI_SETUP.md`
- **Integration Summary**: `STRAPI_INTEGRATION_SUMMARY.md`
- **This File**: `QUICK_START_COMMANDS.md`

---

## 🎯 What's Working Now

✅ Carousel articles are fetched from Strapi CMS
✅ Falls back to mock data if Strapi is unavailable
✅ Server-side rendering for better performance
✅ Type-safe API integration
✅ Automatic image URL handling
✅ Category color mapping
✅ Time ago calculation

---

## 🚀 Next Steps

Want to extend this to other sections?

1. **Main News**: Change `fetchArticles()` parameters
2. **Football News**: Add `filters[category][$eq]=ΠΟΔΟΣΦΑΙΡΟ`
3. **Basketball News**: Add `filters[category][$eq]=ΜΠΑΣΚΕΤ`
4. **Formula 1 News**: Add `filters[category][$eq]=FORMULA 1`

Example for football section:
```typescript
const footballArticles = await fetchArticles({ 
  limit: 6 
});
// Then filter by category in Strapi or frontend
```

Happy coding! 🎉

