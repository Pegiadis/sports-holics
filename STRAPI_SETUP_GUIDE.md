# Complete Guide: React + TypeScript + Strapi Integration

## 📋 Overview
This guide will help you set up a Strapi backend and connect it with your React TypeScript frontend.

---

## 🚀 Step 1: Create Strapi Backend

### 1.1 Create Strapi Project
```bash
# From the sports-holics directory
npx create-strapi-app@latest sportsholics-backend --quickstart
```

**What happens:**
- Strapi will prompt you to login/signup or skip
- Choose "Skip" if you want to proceed without an account
- Installation will take 2-3 minutes
- After completion, Strapi admin panel will open at `http://localhost:1337/admin`

### 1.2 Create Admin User
- Fill in the registration form:
  - First name
  - Last name
  - Email
  - Password (min 8 characters)
- Click "Let's start"

---

## 📦 Step 2: Create a Content Type in Strapi

### 2.1 Create "Article" Collection Type
1. In Strapi admin panel, click **Content-Type Builder** (left sidebar)
2. Click **Create new collection type**
3. Enter Display name: `Article`
4. Click **Continue**

### 2.2 Add Fields to Article
Add the following fields:

**Field 1 - Title:**
- Click **Add another field**
- Select **Text**
- Name: `title`
- Type: Short text
- Click **Add another field**

**Field 2 - Content:**
- Select **Rich Text**
- Name: `content`
- Click **Add another field**

**Field 3 - Author:**
- Select **Text**
- Name: `author`
- Type: Short text
- Click **Finish**

5. Click **Save** (top right)
6. Wait for server to restart

---

## 🔓 Step 3: Configure Permissions

### 3.1 Set Public Access
1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public** role
3. Expand **Article** permissions
4. Check these boxes:
   - ✅ `find` (Get all articles)
   - ✅ `findOne` (Get one article)
5. Click **Save**

---

## 🌐 Step 4: Configure CORS

### 4.1 Update CORS Settings
1. Open: `sportsholics-backend/config/middlewares.ts`
2. Update the CORS configuration:

```typescript
export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:5173', 'http://localhost:3000'],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

3. Restart Strapi server (Ctrl+C and run `npm run develop` again)

---

## ✍️ Step 5: Add Sample Data

### 5.1 Create Articles
1. Go to **Content Manager** → **Article**
2. Click **Create new entry**
3. Fill in:
   - Title: "My First Article"
   - Content: "This is a test article from Strapi!"
   - Author: "John Doe"
4. Click **Save**
5. Click **Publish** (top right)
6. Repeat to create 2-3 more articles

---

## ⚛️ Step 6: Install Axios in React Project

```bash
cd sportsholics-website
npm install axios
```

---

## 🧪 Step 7: Test Component (Created for you)

I've created `TestComponent.tsx` in your React project that:
- Fetches articles from Strapi API
- Displays them in a clean UI
- Shows loading and error states
- Uses TypeScript for type safety

---

## 🎯 Step 8: Run Both Projects

### Terminal 1 - Strapi Backend:
```bash
cd sportsholics-backend
npm run develop
```
Runs at: `http://localhost:1337`

### Terminal 2 - React Frontend:
```bash
cd sportsholics-website
npm run dev
```
Runs at: `http://localhost:5173`

---

## 🔍 Testing the Integration

1. Make sure both servers are running
2. Open `http://localhost:5173` in your browser
3. You should see your articles from Strapi displayed
4. Check browser console (F12) for any errors
5. Try adding/editing articles in Strapi admin and refresh React app

---

## 🛠️ Troubleshooting

### CORS Errors
- Make sure you updated `middlewares.ts` in Strapi
- Restart Strapi server after changes
- Check browser console for specific error messages

### 404 Errors
- Verify Strapi is running at `http://localhost:1337`
- Test API directly: `http://localhost:1337/api/articles`
- Make sure you published the articles in Strapi

### Empty Data
- Check if articles are published (not just saved as drafts)
- Verify Public role has `find` permission enabled
- Check network tab in browser DevTools

---

## 📚 API Endpoints Reference

Once Strapi is running, your API endpoints will be:

- **Get all articles:** `GET http://localhost:1337/api/articles`
- **Get one article:** `GET http://localhost:1337/api/articles/:id`
- **Admin panel:** `http://localhost:1337/admin`

---

## 🎨 Next Steps

1. Create more complex content types (with images, relations, etc.)
2. Add authentication to your React app
3. Implement create/update/delete operations
4. Add pagination and filtering
5. Deploy both applications

---

## 📖 Additional Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi REST API Reference](https://docs.strapi.io/dev-docs/api/rest)
- [React Query for better data fetching](https://tanstack.com/query/latest)

