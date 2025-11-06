# 🔒 Fix: 403 Forbidden Error - Setup API Permissions

## ❌ The Problem

You're getting a **403 Forbidden** error when trying to access:
```
http://localhost:1337/api/blog-articles
http://localhost:1337/api/journalists
```

This means Strapi is blocking public access to these endpoints.

## ✅ The Solution

You need to set **Public API Permissions** in Strapi CMS.

---

## 📋 Step-by-Step Instructions

### 1. Open Strapi Admin Panel

Go to: `http://localhost:1337/admin`

### 2. Navigate to Settings → Roles

1. Click **Settings** (gear icon) in the left sidebar
2. Click **USERS & PERMISSIONS PLUGIN** section
3. Click **Roles**
4. Click **Public** role

### 3. Enable Permissions for Journalists

Scroll down to find **"Journalist"** section:

**Check these boxes:**
- ✅ `find` - Allows fetching all journalists
- ✅ `findOne` - Allows fetching single journalist by slug

**Leave unchecked:**
- ❌ `create` - Only admins should create
- ❌ `update` - Only admins should update
- ❌ `delete` - Only admins should delete

### 4. Enable Permissions for Blog-article

Scroll down to find **"Blog-article"** section:

**Check these boxes:**
- ✅ `find` - Allows fetching all blog articles
- ✅ `findOne` - Allows fetching single article by slug

**Leave unchecked:**
- ❌ `create` - Only admins should create
- ❌ `update` - Only admins should update
- ❌ `delete` - Only admins should delete

### 5. Save Changes

**IMPORTANT:** Click the **"Save"** button at the top right!

---

## 🧪 Test the Fix

After saving permissions, test these URLs in your browser:

### Test 1: Fetch All Journalists
```
http://localhost:1337/api/journalists?populate=avatar
```

**Expected Result:** JSON with list of journalists

### Test 2: Fetch All Blog Articles
```
http://localhost:1337/api/blog-articles?populate=journalist,coverImage
```

**Expected Result:** JSON with list of blog articles

### Test 3: Visit Your Blog Page
```
http://localhost:3000/blog
```

**Expected Result:** Page showing all journalists

---

## 📸 Visual Guide

```
Strapi Admin Panel
├── Settings (⚙️)
│   └── USERS & PERMISSIONS PLUGIN
│       └── Roles
│           └── Public
│               ├── Journalist
│               │   ├── [✅] find
│               │   └── [✅] findOne
│               └── Blog-article
│                   ├── [✅] find
│                   └── [✅] findOne
└── [Save Button] ← CLICK THIS!
```

---

## ⚠️ Common Mistakes

### ❌ Mistake 1: Forgetting to Save
- **Problem**: You checked the boxes but didn't click Save
- **Solution**: Always click the **Save** button after making changes

### ❌ Mistake 2: Wrong Role
- **Problem**: You edited "Authenticated" role instead of "Public"
- **Solution**: Make sure you're in the **Public** role

### ❌ Mistake 3: Not Publishing Content
- **Problem**: Permissions are set but content isn't published
- **Solution**: Go to Content Manager and **Publish** your journalists and articles

---

## 🔍 Verify Current Permissions

You can check if permissions are working by visiting these URLs directly:

```bash
# Should return 200 OK (not 403)
curl http://localhost:1337/api/journalists

# Should return 200 OK (not 403)
curl http://localhost:1337/api/blog-articles
```

If you still get **403**, permissions aren't saved correctly.

---

## 📝 What Each Permission Does

| Permission | What It Allows | Needed? |
|------------|---------------|---------|
| `find` | Fetch list of items (GET /api/journalists) | ✅ Yes |
| `findOne` | Fetch single item (GET /api/journalists/1) | ✅ Yes |
| `create` | Create new items (POST /api/journalists) | ❌ No |
| `update` | Update items (PUT /api/journalists/1) | ❌ No |
| `delete` | Delete items (DELETE /api/journalists/1) | ❌ No |

**Security Note:** Only enable `find` and `findOne` for public access. Create/Update/Delete should only be available to authenticated admins.

---

## ✅ After Setting Permissions

Once permissions are set, your blog system will work:

1. **Homepage** - Shows top 4 journalists ✅
2. **`/blog`** - Shows all journalists ✅
3. **`/blog/tasos`** - Shows Tasos's profile + articles ✅
4. **`/blog/tasos/article-slug`** - Shows full article ✅

---

## 🆘 Still Not Working?

### Check 1: Verify Journalist Exists in CMS

The page `/blog/tasos` requires a journalist with slug "tasos" to exist!

1. Go to Content Manager → Journalist
2. Check if journalist with slug "tasos" exists
3. If not, create one:
   - Name: "Tasos" (or full name)
   - Slug: Will auto-generate as "tasos"
   - Upload avatar
   - Set "Is Active" = true
   - **Publish** the journalist

### Check 2: Restart Both Servers
```bash
# Terminal 1 - Restart Strapi
cd backend/sportsholics-cms
# Stop Strapi (Ctrl+C)
npm run develop

# Terminal 2 - Restart Frontend
cd frontend
# Stop (Ctrl+C)
npm run dev
```

### Check 2: Check Content is Published

1. Go to Content Manager → Journalist
2. Make sure journalists have **"Published"** status (not Draft)
3. Do the same for Blog Article

### Check 3: Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors
4. If you see 403, permissions still aren't set

### Check 4: Clear Browser Cache

Sometimes the browser caches the 403 error:
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

## 🎯 Quick Checklist

Before testing your blog page:

- [ ] Strapi is running (`npm run develop`)
- [ ] Frontend is running (`npm run dev`)
- [ ] Public permissions enabled for **Journalist** (find, findOne)
- [ ] Public permissions enabled for **Blog-article** (find, findOne)
- [ ] Permissions are **saved** (clicked Save button)
- [ ] At least one journalist is created and **published**
- [ ] At least one blog article is created and **published**
- [ ] Browser cache cleared

---

## 🎉 Success!

After following these steps, visiting `http://localhost:3000/blog/tasos` should:
1. Load Tasos's profile
2. Show his bio and avatar
3. Display all his articles
4. No 404 or 403 errors

If you see "Δεν υπάρχουν άρθρα ακόμα" (No articles yet), that's normal - it means the page is working but Tasos hasn't published any articles yet!

