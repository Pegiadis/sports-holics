# ✅ Verify Blog Articles Setup

## The Fix Applied

I've updated the blog API to properly populate the journalist data when fetching articles.

## What You Need to Check in Strapi

### 1️⃣ **Every Blog Article MUST Have a Journalist Assigned**

This is **critical** - if an article doesn't have a journalist, the page will show 404.

**Steps to verify:**

1. Go to Strapi admin: `http://localhost:1337/admin` or your production URL

2. Go to **Content Manager** → **Collection Types** → **Blog Article**

3. **For each article**, click on it and check:
   - ✅ **Journalist** field is filled (not empty)
   - ✅ A journalist is selected from the dropdown
   - ✅ Article is **Published** (not Draft)

4. If any article is missing a journalist:
   - Click on the article
   - In the **Journalist** field, select a journalist from the dropdown
   - Click **Save**
   - Click **Publish**

---

### 2️⃣ **Test the API Directly**

Open this URL in your browser to test:

```
http://localhost:1337/api/blog-articles?populate[coverImage]=*&populate[journalist][populate][0]=avatar
```

**Check the response:**
- Each article should have a `journalist` object
- The journalist object should have: `id`, `name`, `slug`, `avatar`
- If `journalist` is `null` or missing, that article needs a journalist assigned in Strapi

**Example of correct response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "My Article",
      "slug": "my-article",
      "journalist": {
        "id": 1,
        "name": "John Doe",
        "slug": "john-doe",
        "avatar": {
          "url": "/uploads/avatar.jpg"
        }
      }
    }
  ]
}
```

---

### 3️⃣ **Test Individual Article**

Test fetching a specific article by slug:

```
http://localhost:1337/api/blog-articles?filters[slug][$eq]=YOUR_ARTICLE_SLUG&populate[coverImage]=*&populate[journalist][populate][0]=avatar
```

Replace `YOUR_ARTICLE_SLUG` with the actual slug of an article you're trying to view.

**Expected:** 
- JSON response with 1 article
- Article has `journalist` object with `slug` field

---

## 🧪 Test in Frontend

After verifying the above:

1. Go to: `http://localhost:3000/blog`
2. Click on a journalist
3. Click on one of their articles
4. **Expected Result:** Article page loads (not 404)

---

## 🔍 Debugging Steps

If you still get 404, check the browser console (F12 → Console):

### Look for these messages:

**Message:** `"No blog article found with slug: xxx"`
- **Cause:** Article doesn't exist or isn't published
- **Fix:** Publish the article in Strapi

**Message:** `"Blog article is missing journalist data"`
- **Cause:** Article doesn't have a journalist assigned
- **Fix:** Assign a journalist to the article in Strapi

**Message:** `"Failed to fetch from Strapi"`
- **Cause:** Strapi server not running or API permissions not set
- **Fix:** Start Strapi and check permissions (Settings → Roles → Public)

---

## 🎯 Quick Checklist

- [ ] All blog articles have a **journalist assigned**
- [ ] All blog articles are **Published** (not Draft)
- [ ] All journalists are **Published** (not Draft)
- [ ] API permissions are set:
  - [ ] Blog-article: `find` and `findOne` ✅
  - [ ] Journalist: `find` and `findOne` ✅
- [ ] Tested API endpoint directly in browser
- [ ] Frontend now loads article pages (no 404)

---

## 💡 Common Issue

**Most common cause of 404 for blog articles:**
- Article exists and is published
- But article doesn't have a journalist assigned
- The page checks if `article.journalist.slug === journalistSlug`
- If journalist is missing, this check fails → 404

**Solution:** Go to each blog article in Strapi and make sure a journalist is selected!

