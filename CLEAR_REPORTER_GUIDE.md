# 📰 Reporter Guide - Clear & Simple

## 🎯 3 Simple Checkboxes - Easy to Understand!

When you create an article, you control **WHERE** it appears with **3 clear checkboxes**:

```
☐ Show in Carousel (Hot News)
☐ Show in Main News  
☐ Show in Sport Section (Homepage)
```

**That's it! Simple and clear!**

---

## 📍 Where Each Checkbox Controls

### ☐ Show in Carousel
**Location:** Top of homepage - Hot news carousel

```
┌─────────────────────────────────────┐
│  🔥 HOT NEWS CAROUSEL (Top)         │
│  ← [Article] [Article] [Article] →  │
│  Click dots to navigate              │
└─────────────────────────────────────┘
```

**Use for:** Breaking news, urgent updates, hot topics
**Limit:** Best to have 2-3 per sport

---

### ☐ Show in Main News
**Location:** Middle of homepage - Main news section

```
┌─────────────────────────────────────┐
│  📰 MAIN NEWS SECTION (Middle)      │
│  ┌────────┐ ┌────────┐             │
│  │Article │ │Article │             │
│  └────────┘ └────────┘             │
│  [Article] [Article] [Article]      │
└─────────────────────────────────────┘
```

**Use for:** Important news, featured stories
**Limit:** Shows 4-5 articles total (from all sports)

---

### ☐ Show in Sport Section (Homepage)
**Location:** Bottom of homepage - Sport-specific sections

```
┌─────────────────────────────────────┐
│  ⚽ FOOTBALL SECTION (Bottom)        │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │Article │ │Article │ │Article │  │
│  └────────┘ └────────┘ └────────┘  │
└─────────────────────────────────────┘
```

**Use for:** Regular featured news for your sport
**Limit:** Shows 6 articles per sport

---

## 🔄 Latest News Section

**Special:** No checkbox needed!
- Automatically shows the **10 most recent** articles from all sports
- Always sorted by date (newest first)
- Has a carousel with click navigation
- Updates automatically

---

## ✍️ Creating an Article - Step by Step

### 1. Login to Strapi
Go to: `http://localhost:1337/admin`

### 2. Choose Your Sport
**Content Manager** → Select:
- **Football Article** (for football news)
- **Basketball Article** (for basketball news)
- **Formula1 Article** (for Formula 1 news)

### 3. Click "+ Create new entry"

### 4. Fill in Basic Info
```
Title: "Messi Scores Amazing Goal"
Description: "Full article text goes here..."
Author: "Your Name"
Image: [Upload Image]
```

### 5. Choose WHERE It Appears

**Question 1: Is this BREAKING/HOT NEWS?**
```
☑ Show in Carousel  ← Check this!
```

**Question 2: Is this IMPORTANT/FEATURED?**
```
☑ Show in Main News  ← Check this!
```

**Question 3: Should it be in homepage sport section?**
```
☑ Show in Sport Section (Homepage)  ← Check this!
```

### 6. Click "Save" then "Publish"

**Done!** Article appears in checked locations within 60 seconds.

---

## 📊 Examples - Where Will My Article Appear?

### Example 1: Breaking News
```
☑ Show in Carousel
☐ Show in Main News
☐ Show in Sport Section

WHERE IT APPEARS:
✅ Hot news carousel (top of homepage)
✅ /football page (all articles)
```

### Example 2: Important Featured News
```
☐ Show in Carousel
☑ Show in Main News
☑ Show in Sport Section

WHERE IT APPEARS:
✅ Main news section (middle of homepage)
✅ Football section (bottom of homepage)
✅ /football page (all articles)
```

### Example 3: Everything Checked (Maximum Visibility!)
```
☑ Show in Carousel
☑ Show in Main News
☑ Show in Sport Section

WHERE IT APPEARS:
✅ Hot news carousel
✅ Main news section
✅ Football section
✅ /football page
✅ Latest news carousel (automatic)
```

### Example 4: Regular Article (Nothing Checked)
```
☐ Show in Carousel
☐ Show in Main News
☐ Show in Sport Section

WHERE IT APPEARS:
✅ /football page only
✅ Latest news carousel (automatic)
```

---

## 🎨 Homepage Layout Explained

```
┌────────────────────────────────────────────┐
│           SPORTS HOLICS HOMEPAGE           │
├────────────────────────────────────────────┤
│                                            │
│  🔥 HOT NEWS CAROUSEL                      │
│  ← [Breaking] [News] [Hot] [Topics] →      │
│     ☑ Show in Carousel                     │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│  📰 MAIN NEWS                              │
│  ┌────────┐ ┌────────┐                    │
│  │ Story  │ │ Story  │                    │
│  └────────┘ └────────┘                    │
│  [Story] [Story] [Story]                   │
│     ☑ Show in Main News                    │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│  🆕 LATEST NEWS (Auto - 10 items)          │
│  ← [Recent] [News] [From] [All] →          │
│     No checkbox needed (automatic)         │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│  ⚽ FOOTBALL SECTION                        │
│  ┌────────┐ ┌────────┐ ┌────────┐         │
│  │Article │ │Article │ │Article │         │
│  └────────┘ └────────┘ └────────┘         │
│     ☑ Show in Sport Section                │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│  🏀 BASKETBALL SECTION                     │
│  ┌────────┐ ┌────────┐ ┌────────┐         │
│  │Article │ │Article │ │Article │         │
│  └────────┘ └────────┘ └────────┘         │
│     ☑ Show in Sport Section                │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│  🏎️  FORMULA 1 SECTION                    │
│  ┌────────┐ ┌────────┐ ┌────────┐         │
│  │Article │ │Article │ │Article │         │
│  └────────┘ └────────┘ └────────┘         │
│     ☑ Show in Sport Section                │
│                                            │
└────────────────────────────────────────────┘
```

---

## 💡 Quick Decision Guide

Ask yourself these questions:

### Q1: Is this HOT/BREAKING news right now?
- **YES** → ☑ Show in Carousel
- **NO** → ☐ Leave unchecked

### Q2: Is this an important/featured story?
- **YES** → ☑ Show in Main News
- **NO** → ☐ Leave unchecked

### Q3: Should it be featured in the sport section?
- **YES** → ☑ Show in Sport Section
- **NO** → ☐ Leave unchecked

**Remember:** You can check ALL, SOME, or NONE!

---

## 🔄 How Latest News Works

**Completely Automatic!**

- Shows the 10 most recent articles from ALL sports
- No checkbox needed
- Always sorted by publish date (newest first)
- Has a carousel with:
  - ← → Navigation arrows (auto-rotate)
  - Click dots at bottom to jump to specific articles
  - Shows 3 articles at a time on desktop
  - Rotates automatically every few seconds

---

## 📝 Real-World Workflow

### Scenario: Champions League Final

**Article:** "Real Madrid Wins Champions League!"

**Step 1:** Create article
- Title: "Real Madrid Wins Champions League!"
- Description: Full match report...
- Author: Maria Santos
- Image: Celebration photo

**Step 2:** Choose checkboxes
```
☑ Show in Carousel (Hot breaking news!)
☑ Show in Main News (Important story!)
☑ Show in Sport Section (Feature it!)
```

**Step 3:** Publish

**Result:**
- ✅ Shows in hot news carousel (seen first!)
- ✅ Shows in main news section
- ✅ Shows in football section
- ✅ Shows in latest news (automatic)
- ✅ Shows on /football page (automatic)

**Maximum visibility!** ⭐

---

### Scenario: Regular Match Report

**Article:** "Barcelona wins 2-1"

**Step 1:** Create article
- Title: "Barcelona defeats Atletico 2-1"
- Description: Match summary...
- Author: John Doe
- Image: Match photo

**Step 2:** Choose checkboxes
```
☐ Show in Carousel (Not breaking news)
☐ Show in Main News (Not that important)
☑ Show in Sport Section (Feature in football section)
```

**Step 3:** Publish

**Result:**
- ✅ Shows in football section on homepage
- ✅ Shows in latest news (automatic)
- ✅ Shows on /football page (automatic)

**Good visibility for regular news!**

---

## ⚙️ Technical Details (For Understanding)

### Sorting:
- All articles sorted by **date** (newest first)
- No "order" field needed - it's automatic!

### Limits:
- **Carousel:** Up to 6 items (2 per sport)
- **Main News:** Up to 4-5 items total
- **Sport Section:** Up to 6 per sport
- **Latest News:** Always 10 items (automatic)

### Updates:
- Changes appear within **60 seconds**
- Cache refreshes automatically

---

## ⚠️ Important Notes

1. **All articles appear on sport page** - Checkboxes only control homepage
2. **Latest News is automatic** - No checkbox, always shows recent
3. **Multiple checkboxes OK** - Check all 3 for maximum visibility!
4. **Save before Publish** - Always click Save, then Publish
5. **Limits exist** - If too many checked, newest ones show first

---

## 🆘 Troubleshooting

### Article not in carousel?
✅ Check "Show in Carousel" is checked
✅ Make sure article is Published
✅ Wait 60 seconds for cache

### Article not in main news?
✅ Check "Show in Main News" is checked
✅ Make sure article is Published
✅ Check if limit reached (newer articles have priority)

### Article not in sport section?
✅ Check "Show in Sport Section" is checked
✅ Make sure article is Published
✅ Check if limit reached (max 6 per sport)

### Article not showing anywhere?
✅ Check article is Published (not Draft)
✅ Check at least one checkbox is selected
✅ Wait 60 seconds for cache refresh
✅ Check on the sport page directly (/football, /basketball, /formula1)

---

## ✨ Summary

**3 Clear Checkboxes:**
1. ☐ **Show in Carousel** → Hot news at top
2. ☐ **Show in Main News** → Featured in middle  
3. ☐ **Show in Sport Section** → Featured in sport area

**Plus Automatic:**
- **Latest News** → Always shows 10 most recent (no checkbox needed)

**Simple, clear, and easy to understand!** 🎉

---

**Questions? Contact the development team!**

