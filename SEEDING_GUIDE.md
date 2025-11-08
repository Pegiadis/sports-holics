# Complete Seeding Guide for Sports-holics

## 🎯 What This Script Does

The `seed-all-data.js` script automatically creates test data for your entire website:

- ✅ **15 Football Articles** (all flags enabled)
- ✅ **15 Basketball Articles** (all flags enabled)
- ✅ **15 Formula 1 Articles** (all flags enabled)
- ✅ **15 News Articles** (all flags enabled)
- ✅ **3 Journalists** (with Greek names and bios)
- ✅ **9 Blog Articles** (3 per journalist)

**Total: 69 entries** ready for testing!

---

## 📋 Step-by-Step Instructions

### Step 1: Get Your JWT Token

1. **Start Strapi** (if not running):
   ```bash
   cd backend/sportsholics-cms
   npm run develop
   ```

2. **Open Strapi Admin**: `http://localhost:1337/admin`

3. **Login** with your admin credentials

4. **Open Browser DevTools**:
   - Press `F12` or right-click → "Inspect"
   - Go to **"Application"** tab (Chrome) or **"Storage"** tab (Firefox)

5. **Find JWT Token**:
   - In the left sidebar, expand **"Local Storage"**
   - Click on `http://localhost:1337`
   - Find the key named **`jwtToken`**
   - **Copy the entire value** (it's a long string)

### Step 2: Add Token to Script

1. **Open the script**: `backend/sportsholics-cms/scripts/seed-all-data.js`

2. **Find line 12**:
   ```javascript
   const ADMIN_JWT = 'YOUR_JWT_TOKEN_HERE';
   ```

3. **Replace** `YOUR_JWT_TOKEN_HERE` with your actual token:
   ```javascript
   const ADMIN_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Your actual token
   ```

4. **Save the file**

### Step 3: Run the Script

```bash
cd backend/sportsholics-cms
node scripts/seed-all-data.js
```

You'll see output like:
```
🌱 Starting Complete Data Seeding...

═══════════════════════════════════════

👥 Creating Journalists...

✅ Created: Γιώργος Παπαδόπουλος (ID: 1)
✅ Created: Μαρία Αντωνίου (ID: 2)
✅ Created: Νίκος Καραγιάννης (ID: 3)

✅ Created 3 journalists

⚽ Creating Football Articles...

✅ Football 1/15: Ο Παναθηναϊκός κέρδισε με 2-1 τον Ολυμπιακό...
...
```

### Step 4: Publish Articles in Strapi

⚠️ **IMPORTANT**: Articles are created in **DRAFT** status!

1. Go to **Strapi Admin**: `http://localhost:1337/admin`

2. For each collection type:
   - **Football Articles**
   - **Basketball Articles**
   - **Formula1 Articles**
   - **News Articles**
   - **Blog Articles**
   - **Journalists**

3. **Select All** articles (checkbox at top)

4. Click **"Publish"** button

5. Confirm bulk publish

### Step 5: View on Website

1. **Start Frontend** (if not running):
   ```bash
   cd frontend
   npm run dev
   ```

2. **Open**: `http://localhost:3000`

3. **You'll see**:
   - Carousel with articles
   - Main news section
   - Football section (first 9 articles)
   - Basketball section (first 9 articles)
   - Formula 1 section (first 9 articles)
   - News section (first 9 articles)
   - Journalists section

4. **Navigate to sport pages**:
   - `/football` - All 15 football articles (with pagination)
   - `/basketball` - All 15 basketball articles (with pagination)
   - `/formula1` - All 15 formula1 articles (with pagination)
   - `/news` - All 15 news articles (with pagination)

5. **Navigate to blog**:
   - `/blog` - See 3 journalists
   - `/blog/giorgos-papadopoulos` - See his 3 blog articles
   - `/blog/maria-antoniou` - See her 3 blog articles
   - `/blog/nikos-karagiannis` - See his 3 blog articles

---

## 📊 What Gets Created

### Journalists (3)

| Name | Slug | Specialty |
|------|------|-----------|
| Γιώργος Παπαδόπουλος | giorgos-papadopoulos | Ποδόσφαιρο & Μπάσκετ |
| Μαρία Αντωνίου | maria-antoniou | Formula 1 |
| Νίκος Καραγιάννης | nikos-karagiannis | Τακτική Ανάλυση |

### Sport Articles (15 each)

**All articles have**:
- ✅ `isCarousel: true` (appear in homepage carousel)
- ✅ `isMainNews: true` (appear in main news section)
- ✅ `isHomeSportSection: true` (appear in homepage sport sections)
- Greek titles and content
- Varied subtitles and descriptions

### Blog Articles (9 total)

- 3 articles per journalist
- Greek content
- Categories: Ποδόσφαιρο, Μπάσκετ, Formula 1, Ανάλυση
- Read time: 3-13 minutes
- First article of each journalist is featured

---

## 🔧 Troubleshooting

### Error: "JWT token is invalid"

- Your token expired (tokens expire after some time)
- Get a new token (repeat Step 1)
- Update the script with the new token

### Error: "fetch failed" or "ECONNREFUSED"

- Make sure Strapi is running: `npm run develop`
- Check the URL is correct: `http://127.0.0.1:1337`
- Try `http://localhost:1337` if `127.0.0.1` doesn't work

### Error: "Unique constraint violation"

- Data already exists
- Either:
  1. Delete existing data in Strapi admin
  2. Or modify slugs in the script to be unique

### Articles not showing on website

1. **Check if published**: Go to Strapi admin and publish articles
2. **Check permissions**: Settings → Users & Permissions → Public role
   - Enable `find` and `findOne` for all collection types
3. **Hard refresh**: `Ctrl+Shift+R` on the website

### Images not showing

- The script doesn't upload images
- Articles will use default placeholder images
- To add images:
  - Go to Strapi admin
  - Edit each article
  - Upload images manually

---

## 🎨 Customization

### Want More Articles?

Change the loop counters in the script:

```javascript
// Change from 15 to any number
for (let i = 0; i < 25; i++) {  // Create 25 instead of 15
  // ...
}
```

### Want Different Flags?

Modify the article objects:

```javascript
const article = {
  // ...
  isCarousel: false,           // Don't show in carousel
  isMainNews: true,            // Show in main news
  isHomeSportSection: false,   // Don't show on homepage
};
```

### Want More Journalists?

Add to the `journalists` array:

```javascript
{
  name: 'Σοφία Δημητρίου',
  slug: 'sofia-dimitriou',
  title: 'Sports Reporter',
  // ... other fields
}
```

### Want More Blog Articles Per Journalist?

Change the blog creation loop:

```javascript
for (let i = 0; i < 5; i++) {  // Create 5 instead of 3
  // ...
}
```

---

## 🚀 Quick Start (TL;DR)

```bash
# 1. Get JWT token from browser DevTools
# 2. Add it to the script
# 3. Run:
cd backend/sportsholics-cms
node scripts/seed-all-data.js

# 4. Publish all in Strapi admin
# 5. View on http://localhost:3000
```

---

## 📝 Notes

- **Draft vs Published**: Scripts create in draft mode for safety
- **No Images**: Script doesn't upload images (add manually if needed)
- **Greek Content**: All content is in Greek for realistic testing
- **Unique Slugs**: Each article has a unique slug
- **Relations**: Blog articles are properly linked to journalists
- **Flags**: All sport articles have all flags enabled
- **Pagination**: With 15 articles per sport, you'll see 2 pages (10 + 5)

---

## ✅ Success Checklist

After running the script, you should have:

- [ ] 3 journalists visible at `/blog`
- [ ] 15 football articles at `/football` (2 pages)
- [ ] 15 basketball articles at `/basketball` (2 pages)
- [ ] 15 formula1 articles at `/formula1` (2 pages)
- [ ] 15 news articles at `/news` (2 pages)
- [ ] 9 blog articles distributed among journalists
- [ ] Articles in carousel on homepage
- [ ] Articles in main news on homepage
- [ ] Sport sections on homepage showing articles
- [ ] Pagination working on all sport pages
- [ ] Sidebar showing latest news and hot news

---

Happy testing! 🎉

