# Cleanup Scripts Guide

## 🗑️ Overview

Two cleanup scripts are available for removing test data from your Strapi CMS:

1. **`cleanup-all-data.js`** - Nuclear option: Deletes everything
2. **`cleanup-selective.js`** - Surgical option: Choose what to delete

---

## 🚀 Quick Start

### Delete Everything

```bash
cd backend/sportsholics-cms
node scripts/cleanup-all-data.js
```

You'll see:
```
🗑️  Cleanup Script for Sports-holics CMS

═══════════════════════════════════════

⚠️  WARNING: This will DELETE ALL data from:

   - Football Articles
   - Basketball Articles
   - Formula1 Articles
   - News Articles
   - Blog Articles
   - Journalists
   - Hero Sections
   - Breaking News

⚠️  This action CANNOT be undone!

Are you sure you want to continue? (yes/no):
```

Type **`yes`** to confirm, or **`no`** to cancel.

### Delete Specific Collections

```bash
cd backend/sportsholics-cms
node scripts/cleanup-selective.js
```

You'll see an interactive menu:
```
🗑️  Selective Cleanup Script

═══════════════════════════════════════

Select collection types to delete:

1. ⚽ Football Articles (15 entries)
2. 🏀 Basketball Articles (15 entries)
3. 🏎️  Formula1 Articles (15 entries)
4. 📰 News Articles (15 entries)
5. 📝 Blog Articles (9 entries)
6. 👥 Journalists (3 entries)
7. 🎯 Hero Sections (1 entries)
8. 🔥 Breaking News (0 entries)
9. 🗑️  DELETE ALL
0. ❌ Cancel

Enter numbers separated by commas (e.g., 1,2,5):
```

---

## 📋 Use Cases

### Scenario 1: Fresh Start

**Want to**: Delete everything and reseed

```bash
# 1. Delete all data
node scripts/cleanup-all-data.js
# Confirm with 'yes'

# 2. Reseed with fresh data
node scripts/seed-all-data.js

# 3. Publish in Strapi admin
```

### Scenario 2: Keep Journalists, Delete Articles

**Want to**: Keep journalists but refresh all articles

```bash
node scripts/cleanup-selective.js
# Enter: 1,2,3,4,5
# This deletes all articles but keeps journalists
```

### Scenario 3: Clean Only One Sport

**Want to**: Delete only Football articles

```bash
node scripts/cleanup-selective.js
# Enter: 1
# This deletes only Football articles
```

### Scenario 4: Test Pagination

**Want to**: Test with fewer articles

```bash
# Delete all
node scripts/cleanup-all-data.js

# Then manually create 5 articles in Strapi
# to test single-page view
```

---

## ⚠️ Important Notes

### Safety Features

Both scripts have multiple safety layers:

1. **Confirmation Required**: You must type 'yes' to proceed
2. **Shows What Will Be Deleted**: Displays collections and counts
3. **Can Cancel Anytime**: Press Ctrl+C or type 'no'
4. **No Accidental Runs**: Interactive prompts prevent automation

### What Gets Deleted

**All Data Script** deletes:
- ✅ All Football Articles
- ✅ All Basketball Articles
- ✅ All Formula1 Articles
- ✅ All News Articles
- ✅ All Blog Articles
- ✅ All Journalists
- ✅ All Hero Sections
- ✅ All Breaking News

**Selective Script** deletes:
- ✅ Only what you select
- ✅ Can choose multiple
- ✅ Can delete all with option 9

### What DOESN'T Get Deleted

- ❌ Users (admin accounts)
- ❌ API tokens
- ❌ Settings/configuration
- ❌ Collection type schemas
- ❌ Uploaded media files (images stay in `/uploads`)

---

## 🔧 Troubleshooting

### Error: "Token file not found"

```bash
# Create token file
cd backend/sportsholics-cms/scripts
cp strapi.token.example strapi.token
# Edit strapi.token and paste your API token
```

### Error: "Failed to fetch"

- Make sure Strapi is running: `npm run develop`
- Check the URL in script (default: `http://127.0.0.1:1337`)

### Error: "Failed to delete"

- Check API token has "Full Access" permissions
- Some entries might be in draft status (this is OK)
- Script will continue with remaining entries

### Script Hangs or Freezes

- Press `Ctrl+C` to cancel
- Check your internet/network connection
- Restart Strapi and try again

---

## 💡 Tips & Tricks

### Quick Delete & Reseed

Create a shell script:

**Windows (PowerShell)** - `reset-data.ps1`:
```powershell
node scripts/cleanup-all-data.js
node scripts/seed-all-data.js
Write-Host "Data reset complete! Remember to publish in Strapi admin."
```

**Mac/Linux (Bash)** - `reset-data.sh`:
```bash
#!/bin/bash
node scripts/cleanup-all-data.js
node scripts/seed-all-data.js
echo "Data reset complete! Remember to publish in Strapi admin."
```

### Delete Without Confirmation (Advanced)

**⚠️ DANGEROUS**: Only for automated testing

Modify the script to skip confirmation:
```javascript
// In cleanup-all-data.js, change:
const confirmed = true; // Skip the askConfirmation() call
```

### Check Before Deleting

Want to see what exists without deleting?

```bash
# Run selective cleanup
node scripts/cleanup-selective.js

# When you see the menu with counts, just press Ctrl+C
# This shows you what exists without deleting
```

---

## 🎯 Common Workflows

### Daily Development

```bash
# Morning: Fresh data
node scripts/cleanup-all-data.js
node scripts/seed-all-data.js

# Evening: Clean up
node scripts/cleanup-all-data.js
```

### Testing Features

```bash
# Test pagination: Keep only 5 articles
node scripts/cleanup-selective.js  # Delete all articles
# Manually create 5 in Strapi

# Test with full data again
node scripts/seed-all-data.js
```

### Before Committing

```bash
# Clean up test data
node scripts/cleanup-all-data.js

# Keep only necessary demo data
# Manually create 1-2 articles in each category
```

---

## 📊 Script Comparison

| Feature | cleanup-all-data.js | cleanup-selective.js |
|---------|-------------------|-------------------|
| **Speed** | Fast (one confirmation) | Medium (menu navigation) |
| **Control** | None (all or nothing) | High (choose collections) |
| **Safety** | High (requires 'yes') | Very High (menu + confirm) |
| **Use Case** | Complete reset | Partial cleanup |
| **Best For** | Fresh start | Targeted deletion |

---

## 🔒 Security

- Scripts use same token as seeding
- Token stored in `strapi.token` (gitignored)
- Requires "Full Access" API token
- No data sent externally
- All operations local to your Strapi

---

## ❓ FAQ

**Q: Can I undo deletion?**  
A: No. Deletion is permanent. Always confirm before proceeding.

**Q: Will it delete my admin account?**  
A: No. Only content in the collection types is deleted.

**Q: What about uploaded images?**  
A: Images in `/uploads` folder are NOT deleted. Only database entries.

**Q: Can I run this on production?**  
A: ⚠️ Not recommended! These scripts are for development only.

**Q: How long does it take?**  
A: Usually 5-10 seconds for ~70 entries.

**Q: Can I stop it mid-deletion?**  
A: Yes, press `Ctrl+C`. Some items may already be deleted.

---

## 📝 Summary

**Cleanup All Data**:
- ⚡ Fast nuclear option
- 🗑️ Deletes everything
- ✅ Simple confirmation

**Cleanup Selective**:
- 🎯 Surgical precision
- 📋 Choose what to delete
- ✅ Interactive menu

Both are safe, reversible only by reseeding, and require confirmation! 🛡️

