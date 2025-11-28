# Seeding & Cleanup Scripts

This folder contains scripts for managing test data in Strapi CMS.

## 📁 Files

### Seeding
- **`seed-all-data.js`** - Creates all test data (69 entries)

### Cleanup
- **`cleanup-all-data.js`** - Deletes ALL data (with confirmation)
- **`cleanup-selective.js`** - Choose which collections to delete

### Configuration
- **`strapi.token`** - Your API token (gitignored, not committed)
- **`strapi.token.example`** - Template file with instructions

## 🌱 Seeding Data

**Quick Start**:

1. **Create API token in Strapi**:
   ```
   Settings → API Tokens → Create new API Token
   Token Type: Full Access
   ```

2. **Save token**:
   ```bash
   cp strapi.token.example strapi.token
   # Edit strapi.token and paste your token
   ```

3. **Run seeding script**:
   ```bash
   node scripts/seed-all-data.js
   ```

4. **Publish articles in Strapi admin** (select all → publish)

**What gets created**:
- 15 Football Articles ⚽
- 15 Basketball Articles 🏀
- 15 Formula1 Articles 🏎️
- 15 News Articles 📰
- 3 Journalists 👥
- 9 Blog Articles 📝

## 🗑️ Cleanup Data

### Option 1: Delete Everything

Deletes ALL data from all collection types:

```bash
node scripts/cleanup-all-data.js
```

You'll be asked to confirm before deletion.

### Option 2: Selective Cleanup

Choose specific collection types to delete:

```bash
node scripts/cleanup-selective.js
```

Interactive menu lets you select:
1. Football Articles ⚽
2. Basketball Articles 🏀
3. Formula1 Articles 🏎️
4. News Articles 📰
5. Blog Articles 📝
6. Journalists 👥
7. Hero Sections 🎯
8. Breaking News 🔥
9. DELETE ALL 🗑️

Example:
```
Enter numbers separated by commas (e.g., 1,2,5): 1,2,3
# This will delete Football, Basketball, and Formula1 articles
```

## ⚠️ Safety Features

Both cleanup scripts have:
- ✅ Confirmation prompts before deletion
- ✅ Show what will be deleted
- ✅ Count of entries in each collection
- ✅ Can be cancelled at any time

## 🔒 Security

- `strapi.token` is **gitignored** and never committed
- Never share your API token publicly
- Regenerate token if compromised

## 📖 Full Documentation

See `SEEDING_GUIDE.md` in the project root for detailed instructions.

