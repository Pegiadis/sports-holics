# 🚀 Quick Start - Blog System

## Current Issue

The blog page returns 404 because Strapi needs to be restarted to load the new **Journalist** and **Blog Article** collection types.

## ✅ Solution (3 Steps)

### Step 1: Restart Strapi

```bash
# Stop Strapi if running (Ctrl+C)
# Then restart:
cd backend/sportsholics-cms
npm run develop
```

**Wait for:** "Server started on http://localhost:1337"

### Step 2: Set API Permissions

1. Go to: `http://localhost:1337/admin`
2. **Settings** → **Roles** → **Public**
3. Scroll to **Journalist**:
   - ✅ Check `find`
   - ✅ Check `findOne`
4. Scroll to **Blog-article**:
   - ✅ Check `find`
   - ✅ Check `findOne`
5. **Click SAVE** (top right)

### Step 3: Create Test Journalist

1. **Content Manager** → **Journalist** → **Create new entry**
2. Fill in:
   ```
   Name: Tasos
   Slug: tasos (auto-generated)
   Title: Sports Journalist
   Bio: Experienced sports journalist...
   Avatar: [Upload image]
   Specialty: Ποδόσφαιρο
   Is Active: ✅ true
   Priority: 10
   ```
3. Click **Save**
4. Click **Publish**

### Step 4: Test

Visit: `http://localhost:3000/blog/tasos`

**Expected Result:**
- ✅ Page loads (200 OK)
- ✅ Shows Tasos's profile
- ✅ Shows "Δεν υπάρχουν άρθρα ακόμα" (correct - no articles yet!)

---

## 📝 Optional: Create First Blog Article

1. **Content Manager** → **Blog Article** → **Create new entry**
2. Fill in:
   ```
   Title: Champions League Analysis  
   Subtitle: The best moments
   Content: [Write article in rich text editor]
   Excerpt: Quick summary...
   Cover Image: [Upload image]
   Journalist: SELECT "Tasos" ← IMPORTANT!
   Category: Ποδόσφαιρο
   Read Time: 5
   Is Featured: ✅ (optional)
   ```
3. Click **Save**
4. Click **Publish**
5. Refresh `/blog/tasos` → See the article!

---

## ⚠️ Common Issues

### Issue: Still getting 404
**Cause:** Strapi not restarted
**Fix:** Stop and restart Strapi completely

### Issue: 403 Forbidden
**Cause:** Permissions not set or not saved
**Fix:** Double-check permissions and click SAVE

### Issue: "Journalist not found"
**Cause:** Journalist not published
**Fix:** Go to Content Manager → Journalist → Publish

---

## 🎯 System Overview

```
/blog → All journalists
/blog/tasos → Tasos's profile + articles
/blog/tasos/article-slug → Full article page
```

All done! Your blog system is ready! 🎉

