# 📰 Reporter Guide - Sports Holics CMS

## Quick Overview

Create content **ONCE** and control where it appears with simple checkboxes!

---

## 🎯 How It Works

### Content Types in Strapi:

```
📁 Football Article  → /football page + Homepage football section
📁 Basketball Article → /basketball page + Homepage basketball section  
📁 Formula1 Article  → /formula1 page + Homepage formula1 section
```

**One article, multiple places!**

---

## ✍️ Creating a New Article

### Step 1: Go to Strapi Admin
- URL: `http://localhost:1337/admin`
- Login with your credentials

### Step 2: Choose Content Type
Navigate to: **Content Manager** → Choose your sport:
- **Football Article**
- **Basketball Article**
- **Formula1 Article**

### Step 3: Click "+ Create new entry"

### Step 4: Fill in Article Details

```
┌────────────────────────────────────────┐
│ Title *                                │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │
│ Example: "Messi Scores Hat-trick"     │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Description *                          │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │
│ Full article text...                   │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Author *                               │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    │
│ Example: "John Doe"                    │
└────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ Image                                  │
│ [ Upload Image ]                       │
│ Feature image for article              │
└────────────────────────────────────────┘
```

### Step 5: Control WHERE It Appears

```
📍 Where should this appear?

☐ Show on Homepage
   Check to display in homepage sport section

☐ Show in Carousel  
   Check to display in main hot news carousel

📊 Order
   [ 1 ] Lower number = appears first
```

---

## 🎚️ Control Panel Explained

### ☐ Show on Homepage
- **Checked** → Article appears in homepage sport section
- **Unchecked** → Article only appears on sport page

### ☐ Show in Carousel
- **Checked** → Article appears in hot news carousel (top of homepage)
- **Unchecked** → Normal article

### 📊 Order Field
- **1** = Appears first
- **2** = Appears second
- **999** = Appears last (default)

---

## 📍 Where Articles Appear

### Example: Football Article

#### Scenario 1: Both Unchecked
```
☐ Show on Homepage
☐ Show in Carousel
```
**Result:** Only on `/football` page

#### Scenario 2: Homepage Checked
```
☑ Show on Homepage  
☐ Show in Carousel
Order: 1
```
**Result:** 
- ✅ `/football` page
- ✅ Homepage football section (first position)

#### Scenario 3: Carousel Checked
```
☐ Show on Homepage
☑ Show in Carousel
Order: 1
```
**Result:**
- ✅ `/football` page
- ✅ Homepage carousel (hot news)

#### Scenario 4: Both Checked
```
☑ Show on Homepage
☑ Show in Carousel  
Order: 1
```
**Result:**
- ✅ `/football` page
- ✅ Homepage football section
- ✅ Homepage carousel (hot news)

---

## 🔄 Updating Articles

### To Update Where It Appears:
1. Find the article in Content Manager
2. Click to edit
3. Check/uncheck boxes
4. Change order number if needed
5. Click **Save** then **Publish**

### To Remove from Homepage:
1. Find the article
2. Uncheck "Show on Homepage"
3. Click **Save** then **Publish**

**The article remains on the sport page!**

---

## 📊 Homepage Layout

```
HOMEPAGE
├─ 🔥 Carousel (Hot News)
│  ├─ Football articles (isCarousel=true, limit 2)
│  ├─ Basketball articles (isCarousel=true, limit 2)
│  └─ Formula1 articles (isCarousel=true, limit 2)
│
├─ 📰 Main News Section
│  └─ Latest from all sports (4 articles)
│
├─ 🆕 Latest News Section
│  └─ Most recent (4 articles)
│
├─ ⚽ Football Section
│  └─ Football articles (showOnHomepage=true, limit 6)
│
├─ 🏀 Basketball Section
│  └─ Basketball articles (showOnHomepage=true, limit 6)
│
└─ 🏎️ Formula 1 Section
   └─ Formula1 articles (showOnHomepage=true, limit 6)
```

---

## 💡 Best Practices

### 1. Carousel Articles
- **Use for:** Breaking news, hot topics
- **Limit:** 1-2 per sport
- **Update:** Frequently (daily)

### 2. Homepage Section Articles
- **Use for:** Important/featured news
- **Limit:** 3-6 per sport
- **Update:** Every few days

### 3. Regular Articles
- **Use for:** All other news
- **No limit**
- **Stays on sport page**

### 4. Order Numbers
```
Carousel/Hot News:
Order 1 = Most important
Order 2 = Second most important

Homepage Sections:
Order 1 = Top of section
Order 5 = Middle of section
Order 10 = Bottom of section
```

---

## 🎯 Quick Decision Guide

**Ask yourself:**

**Q: Is this BREAKING NEWS?**
✅ Yes → Check "Show in Carousel"
❌ No → Leave unchecked

**Q: Should it be on HOMEPAGE?**
✅ Yes → Check "Show on Homepage"
❌ No → Leave unchecked

**Q: How IMPORTANT is it?**
🔥 Very important → Order: 1
⭐ Important → Order: 5
📰 Normal → Order: 999 (default)

---

## 📝 Example Workflow

### Creating a Breaking News Article:

```
1. Content Manager → Football Article → Create

2. Fill in:
   Title: "Champions League Final: Real Madrid Wins!"
   Description: "Historic victory in dramatic final..."
   Author: "Maria Santos"
   Image: Upload celebration photo

3. Checkboxes:
   ☑ Show on Homepage (want it featured)
   ☑ Show in Carousel (breaking news!)
   Order: 1 (most important)

4. Click Publish

5. Result:
   ✅ Appears in carousel immediately
   ✅ Appears in homepage football section
   ✅ Appears on /football page
```

---

## 🔍 Finding Articles

### By Status:
- **Published** → Live on website
- **Draft** → Not visible yet

### By Location:
Use filters in Content Manager:
- `showOnHomepage = true` → Homepage articles
- `isCarousel = true` → Carousel articles

---

## ⚠️ Important Notes

1. **Save before Publish** → Always click Save, then Publish
2. **Order matters** → Lower numbers appear first
3. **Limits apply** → Homepage has limits (6 per section)
4. **Updates are instant** → Changes appear within 60 seconds

---

## 🆘 Troubleshooting

### Article not appearing on homepage?
✅ Check "Show on Homepage" is checked
✅ Check article is Published (not Draft)
✅ Wait 60 seconds for cache refresh

### Article not in carousel?
✅ Check "Show in Carousel" is checked
✅ Check article is Published
✅ Check if limit reached (max 2 per sport)

### Wrong order?
✅ Change Order number (1 = first)
✅ Save and Publish
✅ Wait 60 seconds

---

## 📞 Support

Need help? Contact the development team!

---

**Remember: Create once, control where it appears with checkboxes!** ✨

