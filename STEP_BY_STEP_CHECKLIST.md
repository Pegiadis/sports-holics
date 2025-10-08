# ✅ Step-by-Step Checklist: React + Strapi Integration

Use this checklist to make sure you complete all steps correctly.

---

## ✅ Setup Checklist

### Phase 1: Strapi Backend Setup

- [ ] **Step 1.1:** Run `npx create-strapi-app@latest sportsholics-backend --quickstart`
- [ ] **Step 1.2:** Choose "Skip" when asked to login/signup
- [ ] **Step 1.3:** Wait for installation to complete
- [ ] **Step 1.4:** Strapi admin opens at `http://localhost:1337/admin`

### Phase 2: Create Admin Account

- [ ] **Step 2.1:** Fill in first name
- [ ] **Step 2.2:** Fill in last name
- [ ] **Step 2.3:** Enter email address
- [ ] **Step 2.4:** Create password (min 8 characters)
- [ ] **Step 2.5:** Click "Let's start"

### Phase 3: Create Content Type

- [ ] **Step 3.1:** Click "Content-Type Builder" in sidebar
- [ ] **Step 3.2:** Click "Create new collection type"
- [ ] **Step 3.3:** Enter name: `Article`
- [ ] **Step 3.4:** Click "Continue"
- [ ] **Step 3.5:** Add Text field named `title`
- [ ] **Step 3.6:** Add Rich Text field named `content`
- [ ] **Step 3.7:** Add Text field named `author`
- [ ] **Step 3.8:** Click "Finish"
- [ ] **Step 3.9:** Click "Save"
- [ ] **Step 3.10:** Wait for server to restart

### Phase 4: Configure Permissions

- [ ] **Step 4.1:** Go to Settings → Users & Permissions Plugin → Roles
- [ ] **Step 4.2:** Click "Public" role
- [ ] **Step 4.3:** Find and expand "Article" section
- [ ] **Step 4.4:** Check `find` permission
- [ ] **Step 4.5:** Check `findOne` permission
- [ ] **Step 4.6:** Click "Save"

### Phase 5: Add Sample Data

- [ ] **Step 5.1:** Go to Content Manager → Article
- [ ] **Step 5.2:** Click "Create new entry"
- [ ] **Step 5.3:** Add title: "Welcome to Strapi"
- [ ] **Step 5.4:** Add content: "This is my first article!"
- [ ] **Step 5.5:** Add author: Your name
- [ ] **Step 5.6:** Click "Save"
- [ ] **Step 5.7:** Click "Publish" ⚠️ Important!
- [ ] **Step 5.8:** Create 2 more articles
- [ ] **Step 5.9:** Publish all articles

### Phase 6: Configure CORS

- [ ] **Step 6.1:** Open `sportsholics-backend/config/middlewares.ts`
- [ ] **Step 6.2:** Update CORS origin to include `http://localhost:5173`
- [ ] **Step 6.3:** Save file
- [ ] **Step 6.4:** Restart Strapi server (Ctrl+C then `npm run develop`)

### Phase 7: Run React App

- [ ] **Step 7.1:** Open new terminal
- [ ] **Step 7.2:** Run `cd sportsholics-website`
- [ ] **Step 7.3:** Run `npm run dev`
- [ ] **Step 7.4:** Open `http://localhost:5173` in browser

### Phase 8: Verify Integration

- [ ] **Step 8.1:** React app loads without errors
- [ ] **Step 8.2:** Articles from Strapi are displayed
- [ ] **Step 8.3:** All article fields show correctly (title, content, author)
- [ ] **Step 8.4:** Refresh button works
- [ ] **Step 8.5:** No errors in browser console (F12)

---

## 🧪 Final Tests

- [ ] **Test 1:** Add new article in Strapi and see it in React after refresh
- [ ] **Test 2:** Edit an article in Strapi and verify changes appear
- [ ] **Test 3:** Check API directly: `http://localhost:1337/api/articles`
- [ ] **Test 4:** Both servers can run simultaneously

---

## 📊 Expected Outcomes

### Terminal 1 (Strapi):
```
✔ Building your admin UI with Vite in development mode...
✔ Server listening on http://localhost:1337
```

### Terminal 2 (React):
```
  VITE v5.x.x  ready in xxx ms
  
  ➜  Local:   http://localhost:5173/
```

### Browser:
- Clean UI with article cards
- No console errors
- Data loads from Strapi
- Refresh button works

---

## 🐛 Common Issues & Solutions

| Issue | Solution | Step |
|-------|----------|------|
| "Cannot connect to Strapi" | Start Strapi server | Phase 6 |
| "Access forbidden" | Enable public permissions | Phase 4 |
| "404 Not Found" | Create Article content type | Phase 3 |
| "No articles found" | Publish articles | Phase 5.7 |
| CORS errors | Update middlewares.ts | Phase 6 |
| Port already in use | Kill process or change port | - |

---

## ⏱️ Estimated Time

- **Strapi Setup:** 5-7 minutes
- **Content Type Creation:** 3 minutes
- **Adding Sample Data:** 2 minutes
- **Testing:** 2 minutes
- **Total:** ~15 minutes

---

## 🎯 Success Criteria

You're done when:
1. ✅ Both servers running without errors
2. ✅ Articles visible in React app
3. ✅ No console errors
4. ✅ Can add/edit in Strapi and see changes
5. ✅ API endpoint accessible

---

## 📞 Support

If stuck:
1. Read error messages carefully
2. Check browser console (F12)
3. Verify all checkboxes above are checked
4. Review `QUICK_START.md` for detailed steps
5. Check `STRAPI_SETUP_GUIDE.md` for full documentation

---

**Last Updated:** October 2025  
**Works with:** Strapi v5.x, React 18, Vite 5

