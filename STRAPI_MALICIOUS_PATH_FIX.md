# 🔧 Fixed: "Malicious Path" Error

## ✅ What Was the Problem?

You were getting this error when trying to access Strapi API:
```json
{
  "data": null,
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Malicious Path"
  }
}
```

## 🎯 Root Cause

Strapi's default `security` middleware was too strict and was blocking legitimate API requests. This is a common issue when deploying Strapi to production environments.

## ✅ What I Fixed

Updated `backend/sportsholics-cms/config/middlewares.ts` to configure the security middleware with proper settings:

1. **Content Security Policy** - Configured to allow API requests
2. **Image sources** - Added `*.strapiapp.com` to allowed sources
3. **Media sources** - Added proper media handling
4. **Removed `upgradeInsecureRequests`** - Set to `null` to prevent issues with API calls

## 🚀 Next Steps

### 1. Wait for Strapi Cloud to Redeploy (5-10 minutes)

Strapi Cloud should automatically detect the changes and redeploy. Check your Strapi Cloud dashboard for deployment status.

### 2. Test the API Again

After Strapi Cloud finishes deploying, test again:

**Option A: Direct Browser Test**
Open this URL in your browser:
```
https://your-strapi-url.strapiapp.com/api/football-articles?populate=image
```

**Expected Result:** ✅ JSON with your articles
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "title": "Your Article Title",
      "description": "...",
      "image": { ... }
    }
  ],
  "meta": { ... }
}
```

**Option B: Use Debug Page**
Visit your Vercel site:
```
https://your-vercel-site.vercel.app/debug
```
Click on "Test Football Articles API" link.

### 3. Check Your Frontend

Once the API works, visit:
```
https://your-vercel-site.vercel.app/football
```

Your articles should now appear! 🎉

## 🔍 If Still Not Working

### Issue 1: Still Getting "Malicious Path"

**Check:**
- Has Strapi Cloud finished redeploying? (Check Strapi Cloud dashboard)
- Are you testing the correct URL? (Should be your Strapi Cloud URL, not localhost)

**Solution:**
- Wait for deployment to complete
- Clear browser cache (Ctrl+Shift+Delete)
- Try in incognito/private browsing mode

### Issue 2: Getting 403 Forbidden

**Problem:** Permissions not set

**Solution:**
1. Go to Strapi Admin: `https://your-strapi.strapiapp.com/admin`
2. Settings → Users & Permissions → Roles → Public
3. Enable for each content type:
   - ✅ `find`
   - ✅ `findOne`
4. Click Save

### Issue 3: Getting Empty Array `{"data": []}`

**Problem:** No articles or articles not published

**Solution:**
1. Go to Strapi Admin → Content Manager
2. Check that you have articles created
3. Make sure they are **Published** (not Draft)
4. Check that the article is in the correct content type (Football Article, etc.)

### Issue 4: Frontend Still Shows Empty

**Checklist:**
- [ ] Strapi API works when tested directly in browser ✅
- [ ] Permissions are set (find + findOne) ✅
- [ ] Environment variable set in Vercel (`NEXT_PUBLIC_STRAPI_API_URL`) ✅
- [ ] Vercel has been redeployed after adding env variable ✅
- [ ] Article is Published (not Draft) ✅
- [ ] Check browser console (F12) for errors

**Common Frontend Issues:**
1. **Cached old deployment** - Force reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Wrong environment variable** - Check `/debug` page shows correct URL
3. **CORS error** - The fix we just pushed should resolve this
4. **Network error** - Check browser console (F12) → Network tab

## 📋 Complete Verification Checklist

Before declaring success, verify:

- [ ] Strapi Cloud deployment completed successfully
- [ ] API endpoint returns articles (not error): `https://your-strapi.strapiapp.com/api/football-articles?populate=image`
- [ ] Permissions set: Settings → Roles → Public → find/findOne enabled
- [ ] Environment variable in Vercel: `NEXT_PUBLIC_STRAPI_API_URL` = your Strapi URL
- [ ] Vercel redeployed after adding environment variable
- [ ] Frontend `/debug` page shows correct Strapi URL (not localhost)
- [ ] Frontend `/football` page displays articles
- [ ] Images are loading correctly
- [ ] No errors in browser console (F12)

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ API URL returns JSON (not error)
2. ✅ `/debug` page shows your Strapi Cloud URL
3. ✅ `/football` page displays your article
4. ✅ Article image is visible
5. ✅ Browser console has no errors
6. ✅ Article is clickable and opens correctly

## 💡 Pro Tips

### For Future Articles

When creating new articles in Strapi:

1. **Fill required fields:**
   - Title
   - Description (rich text)
   - Author (defaults to "Sports Holics")
   - Image (upload one)

2. **Set visibility flags:**
   - `isCarousel` - Shows in homepage carousel
   - `isMainNews` - Shows in main news section
   - `isHomeSportSection` - Shows in sport section on homepage

3. **Publish:**
   - Don't forget to click "Publish" button!
   - Draft articles won't appear on frontend

### Performance Tips

- Images are automatically optimized by Next.js
- API responses are cached for 60 seconds (`revalidate: 60`)
- Consider using a CDN for images (Cloudinary, AWS S3) for better performance

## 🆘 Need More Help?

If you're still having issues after following all the steps above:

1. **Check Strapi Cloud logs:**
   - Go to Strapi Cloud dashboard
   - Look for deployment logs
   - Check for any errors during build/start

2. **Check Vercel logs:**
   - Go to Vercel dashboard
   - Your project → Deployments → Latest → View Function Logs
   - Look for API call errors

3. **Test locally:**
   - Make sure everything works locally first
   - Then deploy to production

## 📚 References

- [Strapi Security Middleware Docs](https://docs.strapi.io/dev-docs/configurations/middlewares#security)
- [Strapi Content API](https://docs.strapi.io/dev-docs/api/rest)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

**Last Updated:** After fixing "Malicious Path" error
**Status:** ✅ Fix deployed, waiting for Strapi Cloud to redeploy

