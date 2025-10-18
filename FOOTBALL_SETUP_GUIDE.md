# Football Page Setup Guide

Simple guide to get the football page working with Strapi CMS.

## 🚀 Quick Start

### 1. Start Strapi Backend

```bash
cd backend/sportsholics-cms
npm install
npm run develop
```

Strapi will start at: `http://localhost:1337`

### 2. First Time Setup - Create Admin User

1. Go to `http://localhost:1337/admin`
2. Create your admin account:
   - First name
   - Last name
   - Email
   - Password
3. Click "Let's start"

### 3. Create Football Articles

1. In Strapi admin, go to **Content Manager**
2. Click **Football Article** in the left menu
3. Click **+ Create new entry**
4. Fill in:
   - **Title**: e.g., "Ο Μέσι Σκοράρει Χατ-Τρικ"
   - **Description**: e.g., "Εκπληκτική εμφάνιση από τον Αργεντινό σούπερ σταρ..."
   - **Author**: e.g., "Γιάννης Παπαδόπουλος"
   - **Image**: Upload a football image
5. Click **Publish**

Create 3-4 test articles!

### 4. Make API Public

By default, Strapi APIs are protected. Make them public:

1. In Strapi admin, go to **Settings** (left sidebar)
2. Click **Users & Permissions Plugin** → **Roles**
3. Click **Public**
4. Expand **Football-article**
5. Check these permissions:
   - ✅ `find`
   - ✅ `findOne`
6. Click **Save**

### 5. Start Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will start at: `http://localhost:3000`

### 6. View Football Page

Go to: `http://localhost:3000/football`

You should see your articles in a clean, scrollable list! ⚽

---

## 📁 Project Structure

```
sports-holics/
├── backend/
│   └── sportsholics-cms/
│       └── src/
│           └── api/
│               └── football-article/       ← Strapi content type
│                   ├── content-types/
│                   │   └── football-article/
│                   │       └── schema.json  ← Database schema
│                   ├── controllers/
│                   ├── services/
│                   └── routes/
│
└── frontend/
    └── app/
        └── football/                      ← Football page
            ├── page.tsx                   ← Main component
            ├── api.ts                     ← API utilities
            └── README.md                  ← Documentation
```

---

## 🎯 How It Works

### Content Flow:

```
1. Reporter creates article in Strapi admin
2. Clicks "Publish"
3. Article saved to database
4. Frontend fetches via API: /api/football-articles
5. Articles displayed on /football page
6. Updates every 60 seconds (Next.js revalidation)
```

### Data Transformation:

```typescript
Strapi Data:
{
  id: 1,
  title: "Article Title",
  description: "Article description...",
  author: "John Doe",
  image: { url: "/uploads/image.jpg" },
  createdAt: "2024-01-01T12:00:00.000Z"
}

↓ Transformed by api.ts ↓

Frontend Data:
{
  id: 1,
  title: "Article Title",
  description: "Article description...",
  author: "John Doe",
  imageUrl: "http://localhost:1337/uploads/image.jpg",
  category: "ΠΟΔΟΣΦΑΙΡΟ",
  categoryColor: "bg-green-100 text-green-800",
  timeAgo: "2 hours ago"
}
```

---

## 🔧 Troubleshooting

### Problem: "Cannot fetch articles"
**Solution**: 
1. Make sure Strapi is running on port 1337
2. Check API permissions are set to Public
3. Make sure you've published at least one article

### Problem: "Images not showing"
**Solution**:
1. Make sure images are uploaded in Strapi
2. Check image permissions in Strapi settings
3. Images should be in `backend/sportsholics-cms/public/uploads/`

### Problem: "Page shows empty"
**Solution**:
1. Create and publish at least one article in Strapi
2. Check browser console for errors
3. Verify Strapi is running

---

## ✅ Next Steps

Once football page is working:
1. Create basketball page (same structure)
2. Create formula1 page (same structure)
3. Create home page with carousel/featured sections
4. Add article detail pages

---

## 📝 Notes

- Articles update every 60 seconds (Next.js ISR)
- Strapi runs on port 1337
- Frontend runs on port 3000
- Simple, clean, maintainable structure
- Colocation: API utilities next to page that uses them

