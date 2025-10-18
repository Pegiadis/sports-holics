# 🚀 Quick Start - Football Page

## Commands to Run

### Terminal 1 - Start Strapi (Backend)
```bash
cd backend/sportsholics-cms
npm run develop
```
Wait for: `Welcome back!` message
Go to: `http://localhost:1337/admin`

---

### Terminal 2 - Start Next.js (Frontend)
```bash
cd frontend
npm run dev
```
Wait for: `Ready` message
Go to: `http://localhost:3000/football`

---

## First Time Setup (5 minutes)

### 1. Create Strapi Admin Account
- Go to: `http://localhost:1337/admin`
- Fill in your details
- Click "Let's start"

### 2. Make API Public
- Settings → Users & Permissions Plugin → Roles
- Click "Public"
- Expand "Football-article"
- Check: `find` and `findOne`
- Save

### 3. Create Test Articles
Content Manager → Football Article → Create new entry

**Article 1:**
```
Title: Ο Μέσι Σκοράρει Χατ-Τρικ
Description: Εκπληκτική εμφάνιση από τον Αργεντινό σούπερ σταρ...
Author: Γιάννης Παπαδόπουλος
Image: Upload any football image
```

**Article 2:**
```
Title: Νίκη της Ρεάλ Μαδρίτης στο Champions League  
Description: Η Βασίλισσα συνεχίζει το νικηφόρο σερί...
Author: Μαρία Κωνσταντίνου
Image: Upload any football image
```

**Article 3:**
```
Title: Ολυμπιακός - Παναθηναϊκός: Το Ντέρμπι
Description: Η αναμέτρηση των αιωνίων...
Author: Δημήτρης Νικολάου
Image: Upload any football image
```

Click **Publish** for each!

### 4. View Football Page
- Go to: `http://localhost:3000/football`
- You should see your 3 articles! ⚽

---

## ✅ Success Checklist

- [ ] Strapi running on port 1337
- [ ] Next.js running on port 3000
- [ ] Admin account created
- [ ] API made public
- [ ] 3 test articles created and published
- [ ] Articles visible on `/football` page

---

## 📁 What We Built

```
✅ Clean football page with single-column layout
✅ Strapi CMS with football-article content type
✅ API utilities colocated with page
✅ Type-safe TypeScript throughout
✅ Automatic image handling
✅ Time-ago calculation
✅ Fallback to empty state if no data
```

---

## 📚 Documentation

- **Setup Guide**: `FOOTBALL_SETUP_GUIDE.md`
- **Architecture**: `CLEAN_ARCHITECTURE_SUMMARY.md`
- **Visual Guide**: `VISUAL_STRUCTURE.md`
- **Page README**: `frontend/app/football/README.md`

---

## 🎯 Next Steps

1. **Test the football page** - add/edit articles, see updates
2. **Create basketball page** - same structure as football
3. **Create formula1 page** - same structure as football
4. **Build home page** - with carousel, main news, latest news

---

## 🆘 Troubleshooting

### Problem: Strapi won't start
```bash
cd backend/sportsholics-cms
rm -rf node_modules
npm install
npm run develop
```

### Problem: Frontend won't start
```bash
cd frontend
rm -rf node_modules .next
npm install
npm run dev
```

### Problem: Articles don't show
1. Check Strapi is running
2. Check API permissions (Settings → Roles → Public)
3. Check articles are published (not draft)
4. Check browser console for errors

### Problem: Images don't show
1. Make sure you uploaded images in Strapi
2. Check `backend/sportsholics-cms/public/uploads/` folder exists
3. Try different image format (JPG/PNG)

---

## 🎉 That's It!

You now have a working football page with:
- ✅ Clean architecture
- ✅ Colocation principles
- ✅ Simple Strapi integration
- ✅ Type safety
- ✅ Easy to maintain and extend

Ready to build the next page! 🚀

