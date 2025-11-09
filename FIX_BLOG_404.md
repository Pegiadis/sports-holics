# 🔧 Fix: Blog Article 404 Error

## The Problem
When you click on a blog article from a journalist's page, you get a **404 Not Found** error.

## Root Causes
There are three possible reasons:

### 1️⃣ Articles Are Not Published
Blog articles in Strapi might be in **Draft** state instead of **Published**.

### 2️⃣ API Permissions Not Set
The Public role might not have permission to read blog articles.

### 3️⃣ URL Trailing Slash Issue (FIXED)
The STRAPI_URL had a trailing slash causing double slashes - this is now fixed in the code.

---

## ✅ Solutions

### Solution 1: Publish Blog Articles

1. Go to your Strapi admin panel:
   - **Local**: `http://localhost:1337/admin`
   - **Production**: `https://clever-garden-138bbdfa99.strapiapp.com/admin`

2. Go to **Content Manager** → **Collection Types** → **Blog Article**

3. For each article:
   - Click on the article
   - Look at the top right - if it says **"Draft"**, the article is not published
   - Click **"Publish"** button
   - Confirm the action

4. Repeat for all articles you want to be visible

**Why this matters:** By default, Strapi creates content in Draft state. Only **Published** content is accessible via the API.

---

### Solution 2: Check API Permissions

1. Go to Strapi admin: `http://localhost:1337/admin` (or your production URL)

2. Navigate to:
   - **Settings** (⚙️ gear icon in left sidebar)
   - **Users & Permissions Plugin**
   - **Roles**
   - **Public** role

3. Scroll down to **"Blog-article"** section

4. **Check these boxes:**
   - ✅ `find` - Allows fetching all blog articles
   - ✅ `findOne` - Allows fetching single article

5. Scroll to **"Journalist"** section (if not already done)

6. **Check these boxes:**
   - ✅ `find` - Allows fetching all journalists
   - ✅ `findOne` - Allows fetching single journalist

7. **Click "Save"** button at the top right

---

### Solution 3: Test the API Directly

After publishing and setting permissions, test if the API works:

#### Test 1: Fetch All Blog Articles
Open in your browser:
```
http://localhost:1337/api/blog-articles?populate=*
```

**Expected:** JSON response with articles  
**If 403:** Go back to Solution 2 (Permissions)  
**If empty data array:** No articles are published (Solution 1)

#### Test 2: Fetch Specific Article by Slug
```
http://localhost:1337/api/blog-articles?filters[slug][$eq]=your-article-slug&populate=*
```

Replace `your-article-slug` with an actual article slug from your Strapi.

**Expected:** JSON response with one article  
**If empty:** Article doesn't exist or isn't published

---

## 🧪 Test the Fix

After completing the solutions:

1. Go to: `http://localhost:3000/blog`
2. Click on a journalist
3. Click on one of their articles
4. **Expected Result:** Article page loads successfully (not 404)

---

## 📋 Checklist

- [ ] All blog articles are **Published** (not Draft)
- [ ] Public role has `find` and `findOne` permissions for **Blog-article**
- [ ] Public role has `find` and `findOne` permissions for **Journalist**
- [ ] Clicked **Save** after changing permissions
- [ ] Tested API endpoint directly in browser
- [ ] Frontend now shows articles without 404

---

## 🔍 Still Getting 404?

If you still see 404 after the above steps, check the browser console (F12 → Console tab) for error messages and share them.

**Common issues:**
- Article slug in URL doesn't match the slug in Strapi
- Journalist slug in URL doesn't match
- Strapi server not running
- Wrong STRAPI_URL environment variable

