# 🚀 Deployment Guide: Connect Vercel Frontend to Strapi Cloud

## ✅ What We've Done So Far

1. ✅ Strapi backend deployed to Strapi Cloud
2. ✅ CORS configured for Vercel domains (`*.vercel.app`)
3. ✅ Next.js configured to load images from Strapi Cloud (`*.strapiapp.com`)
4. ✅ Frontend uses environment variable: `NEXT_PUBLIC_STRAPI_API_URL`

---

## 📋 Complete Setup Checklist

### **Step 1: Get Your Strapi Cloud URL** ✅

From your Strapi Cloud dashboard:
- Your URL: `https://your-project-name.strapiapp.com`
- Copy this URL (no trailing slash)

---

### **Step 2: Configure Environment Variable in Vercel** 🔴 **ACTION REQUIRED**

#### **Method 1: Vercel Dashboard (Recommended)**

1. Go to: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your **sports-holics** (or frontend) project
3. Click **Settings** → **Environment Variables**
4. Click **"Add Variable"**
5. Enter:
   ```
   Name:  NEXT_PUBLIC_STRAPI_API_URL
   Value: https://your-actual-strapi-url.strapiapp.com
   ```
   ⚠️ Replace with your **actual** Strapi Cloud URL!

6. Select environments (check all):
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

7. Click **Save**

---

### **Step 3: Redeploy Your Vercel Frontend** 🔴 **ACTION REQUIRED**

After adding the environment variable, you MUST redeploy:

#### **Method A: Through Dashboard (Easiest)**
1. Go to your project in Vercel
2. Click on **Deployments** tab
3. Find the latest deployment
4. Click the **"..."** menu → **"Redeploy"**
5. Confirm redeploy

#### **Method B: Push to GitHub**
```bash
# Make a small change (this file is already changed)
git add .
git commit -m "Configure Strapi Cloud URL for production"
git push origin feature/strapi-cloud
```
Vercel will automatically redeploy.

---

### **Step 4: Configure Strapi Permissions** 🔴 **ACTION REQUIRED**

By default, Strapi API is **private**. You need to make your content types public:

1. Go to your Strapi admin: `https://your-project-name.strapiapp.com/admin`
2. Create your first admin user (if you haven't)
3. Go to **Settings** → **Users & Permissions** → **Roles**
4. Click on **Public** role
5. Expand each content type:
   - **Basketball-article**: Check ✅ `find` and ✅ `findOne`
   - **Football-article**: Check ✅ `find` and ✅ `findOne`
   - **Formula1-article**: Check ✅ `find` and ✅ `findOne`
6. Click **Save**

**Why?** This allows your frontend to read articles without authentication.

---

### **Step 5: Test Your Connection** 🧪

#### **Test 1: API Endpoint**
Open in your browser:
```
https://your-project-name.strapiapp.com/api/football-articles?populate=image
```

✅ **Expected**: JSON response with articles  
❌ **If 403 Forbidden**: Check Step 4 (Permissions)  
❌ **If 404**: Check your Strapi deployment

#### **Test 2: Frontend**
Open your Vercel site:
```
https://your-frontend.vercel.app/football
```

✅ **Expected**: Articles load from Strapi  
❌ **If empty/errors**: Check browser console (F12)

---

## 🔧 Troubleshooting

### **Problem: "Failed to fetch articles"**

**Check 1: Environment Variable**
```bash
# In Vercel → Settings → Environment Variables
# Verify: NEXT_PUBLIC_STRAPI_API_URL is set correctly
```

**Check 2: CORS Error in Browser Console**
```
Access to fetch at 'https://...' has been blocked by CORS policy
```
**Solution**: 
- CORS is already configured in `backend/sportsholics-cms/config/middlewares.ts`
- Push the latest changes to GitHub
- Redeploy Strapi Cloud

**Check 3: 403 Forbidden**
```
GET https://your-strapi.strapiapp.com/api/football-articles 403
```
**Solution**: Configure permissions in Strapi (Step 4)

---

### **Problem: Images Not Loading**

**Solution**: Already fixed! `next.config.ts` now includes:
```typescript
{
  protocol: 'https',
  hostname: '*.strapiapp.com',
  pathname: '/uploads/**',
}
```

Just push changes and redeploy Vercel.

---

### **Problem: Environment Variable Not Working**

**Common Issues:**
1. ❌ Forgot to redeploy after adding env var
   - **Fix**: Redeploy (see Step 3)

2. ❌ Typo in variable name
   - **Must be exactly**: `NEXT_PUBLIC_STRAPI_API_URL`
   - **Must start with**: `NEXT_PUBLIC_` (Next.js requirement)

3. ❌ Added only to Production
   - **Fix**: Add to all environments (Production, Preview, Development)

---

## 📝 Quick Commands Reference

### **Check Current Environment Variable (Local)**
```bash
cd frontend
echo $env:NEXT_PUBLIC_STRAPI_API_URL  # Windows PowerShell
```

### **Test Strapi API (PowerShell)**
```powershell
# Replace with your actual Strapi URL
$strapiUrl = "https://your-project.strapiapp.com"
Invoke-RestMethod "$strapiUrl/api/football-articles?populate=image"
```

### **Push Changes to GitHub**
```bash
git status
git add .
git commit -m "Configure Strapi Cloud connection"
git push origin feature/strapi-cloud
```

---

## 🎯 Final Checklist

Before going live, verify:

- [ ] Strapi Cloud deployed and accessible
- [ ] Admin user created in Strapi
- [ ] Public permissions set for all content types (find, findOne)
- [ ] `NEXT_PUBLIC_STRAPI_API_URL` added to Vercel
- [ ] Vercel frontend redeployed
- [ ] Test API endpoint directly (returns JSON)
- [ ] Test frontend pages (articles load)
- [ ] Images display correctly
- [ ] No CORS errors in browser console

---

## 🚀 Production Tips

### **1. Add Custom Domain**
In Vercel:
- Settings → Domains
- Add your custom domain (e.g., `sportsholics.com`)

Update Strapi CORS if needed:
```typescript
// backend/sportsholics-cms/config/middlewares.ts
origin: [
  'https://*.vercel.app',
  'https://sportsholics.com',      // Your domain
  'https://www.sportsholics.com',  // www subdomain
],
```

### **2. Use API Tokens (Optional - More Secure)**
Instead of public permissions, you can use API tokens:

1. Strapi: Settings → API Tokens → Create new token
2. Copy token
3. Add to Vercel:
   ```
   Name:  NEXT_PUBLIC_STRAPI_API_TOKEN
   Value: your-token-here
   ```
4. Update frontend to include token in headers

### **3. Set Up CDN for Images**
For better performance, consider:
- Cloudinary
- AWS S3 + CloudFront
- Vercel Image Optimization (already enabled)

---

## 📞 Need Help?

Common resources:
- [Strapi Cloud Docs](https://docs.strapi.io/cloud/)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

## 🎉 You're Done!

Your architecture:
```
User Browser
    ↓
Vercel (Next.js Frontend)
    ↓ (API Calls)
Strapi Cloud (CMS Backend)
    ↓ (Stores Data)
PostgreSQL (Managed by Strapi Cloud)
```

Everything is connected and ready to go! 🚀

