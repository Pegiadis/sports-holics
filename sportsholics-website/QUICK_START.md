# 🚀 Quick Start Guide

## What's been set up for you:

✅ React + TypeScript project created  
✅ Test component created (`TestComponent.tsx`)  
✅ Axios installed for API requests  
✅ Beautiful UI with loading/error states  

---

## 📝 Steps to Follow:

### 1️⃣ **Create Strapi Backend** (5 minutes)

Open a new terminal and run:

```bash
# Make sure you're in the sports-holics directory
npx create-strapi-app@latest sportsholics-backend --quickstart
```

**During installation:**
- When prompted "Please log in or sign up", choose **"Skip"**
- Wait for installation to complete
- Strapi admin panel will automatically open at `http://localhost:1337/admin`

### 2️⃣ **Create Admin Account**

Fill in the form that appears:
- First name
- Last name  
- Email
- Password (minimum 8 characters)

Click **"Let's start"**

### 3️⃣ **Create "Article" Content Type**

In Strapi admin panel:

1. Click **"Content-Type Builder"** (puzzle icon in left sidebar)
2. Click **"Create new collection type"**
3. Enter name: `Article`
4. Click **"Continue"**

**Add these fields:**

**Field 1:**
- Click **"Add another field"**
- Select **"Text"**
- Name: `title`
- Click **"Add another field"**

**Field 2:**
- Select **"Rich Text"**
- Name: `content`
- Click **"Add another field"**

**Field 3:**
- Select **"Text"**  
- Name: `author`
- Click **"Finish"**

5. Click **"Save"** (top right)
6. Wait for server restart

### 4️⃣ **Enable Public Access**

1. Go to **"Settings"** → **"Users & Permissions Plugin"** → **"Roles"**
2. Click **"Public"**
3. Scroll to **"Article"** and expand it
4. Check these boxes:
   - ✅ `find`
   - ✅ `findOne`
5. Click **"Save"**

### 5️⃣ **Add Sample Articles**

1. Go to **"Content Manager"** → **"Article"**
2. Click **"Create new entry"**
3. Fill in:
   - Title: "Welcome to Strapi"
   - Content: "This is my first article from Strapi CMS!"
   - Author: "Your Name"
4. Click **"Save"**
5. Click **"Publish"** (top right)
6. Create 2-3 more articles

### 6️⃣ **Configure CORS** (Important!)

1. Open `sportsholics-backend/config/middlewares.ts` in your editor
2. Find the cors section and update it:

```typescript
{
  name: 'strapi::cors',
  config: {
    enabled: true,
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  },
}
```

3. Save the file
4. Restart Strapi (Ctrl+C in terminal, then run `npm run develop`)

### 7️⃣ **Run Your React App**

Open a **NEW terminal** and run:

```bash
cd sportsholics-website
npm run dev
```

Open `http://localhost:5173` in your browser

---

## ✅ What You Should See:

Your React app will display:
- All articles from Strapi
- Each article with title, content, author, and date
- A refresh button to reload data
- Beautiful cards with hover effects

---

## 🐛 Troubleshooting:

### "Cannot connect to Strapi"
- Make sure Strapi is running in another terminal
- Check `http://localhost:1337/api/articles` in browser

### "Access forbidden (403)"
- Enable public permissions (Step 4)
- Make sure you saved the permissions

### "Articles endpoint not found (404)"
- Make sure you created the Article content type
- Check spelling: must be exactly "Article" (capital A)

### "No articles found"
- Make sure articles are **published**, not just saved
- Check in Strapi Content Manager

---

## 🎯 Test Your Setup:

1. Both terminals running (Strapi + React)
2. Articles showing in React app
3. Add new article in Strapi admin
4. Click "Publish"
5. Click "Refresh" in React app
6. New article appears! 🎉

---

## 📚 What's Next?

Once this works, you can:
- Add more fields to Article (images, categories, etc.)
- Create other content types (Products, Users, etc.)
- Add create/edit/delete functionality in React
- Add authentication
- Style it further

**Full detailed guide:** See `STRAPI_SETUP_GUIDE.md`

---

## 🆘 Need Help?

Check the console in your browser (F12) for error messages. Most issues are:
1. CORS not configured properly
2. Public permissions not enabled
3. Articles not published
4. Strapi server not running

Good luck! 🚀

