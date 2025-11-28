# Production Scripts Guide

This directory contains scripts for managing your **PRODUCTION** Strapi database.

## ⚠️ IMPORTANT WARNINGS

- These scripts interact with your **LIVE PRODUCTION** database
- **ALWAYS** have a backup before running cleanup scripts
- Test on staging/development first
- Double-check the STRAPI_URL before running

---

## Files Overview

### Production Scripts
- **`cleanup-production.js`** - Deletes ALL data from production database
- **`seed-production.js`** - Populates production with demo/test data

### Development Scripts
- **`cleanup-all-data.js`** - Deletes ALL data from local database
- **`seed-all-data.js`** - Populates local database with demo/test data
- **`cleanup-selective.js`** - Interactive cleanup for local database

### Configuration
- **`strapi.token`** - Local development API token
- **`strapi_stage.token`** - Production/staging API token
- **`strapi.token.example`** - Template for creating tokens

---

## Setup

### 1. Get Your Production API Token

1. Go to your production Strapi admin panel
2. Navigate to: **Settings → API Tokens → Create new API Token**
3. Configure:
   - **Name**: "Production Scripts"
   - **Token type**: **Full Access**
   - **Token duration**: Unlimited (or set expiration)
4. **Copy the generated token**
5. Paste it into `backend/sportsholics-cms/scripts/strapi_stage.token`

### 2. Configure Production URL

Open the production scripts and update the `STRAPI_URL`:

```javascript
// In cleanup-production.js and seed-production.js
const STRAPI_URL = process.env.PRODUCTION_STRAPI_URL || 'https://your-actual-production-url.strapiapp.com';
```

**OR** set environment variable:
```bash
export PRODUCTION_STRAPI_URL=https://your-production-url.strapiapp.com
```

### 3. Prepare Demo Images (For Seeding)

1. Create directory: `backend/sportsholics-cms/public/demo-images/`
2. Copy your demo images there:
   ```
   public/
   └── demo-images/
       ├── football.png
       ├── basketball.png
       ├── formula.png
       ├── news-2.png
       └── ... (other images)
   ```

---

## Usage

### Cleanup Production Database

```bash
cd backend/sportsholics-cms
node scripts/cleanup-production.js
```

**What it does:**
- Deletes ALL articles (football, basketball, formula1, news, blog)
- Deletes ALL journalists
- Deletes ALL breaking news items
- Deletes ALL hero sections
- Deletes homepage configuration

**Confirmations required:**
1. Type "DELETE PRODUCTION"
2. Type "YES I AM SURE"

**Use case:** When you need to completely reset production data (e.g., fixing schema migration errors)

---

### Seed Production Database

```bash
cd backend/sportsholics-cms
node scripts/seed-production.js
```

**What it creates:**
- 15 Football articles
- 15 Basketball articles
- 15 Formula 1 articles
- 15 News articles
- 3 Journalists (with avatars)
- 9 Blog articles
- 5 Breaking news items
- 1 Hero section
- Homepage configuration (carousel + main news)

**Total:** ~79 entries

**Use case:**
- Initial production setup with demo content
- After cleanup to repopulate database
- Fixing schema migration issues (delete old data → seed new data)

---

## Common Scenarios

### Scenario 1: Fix Production Schema Migration Error

**Problem:** Production fails to start due to schema migration error (e.g., description field type change)

**Solution:**
```bash
# 1. Cleanup production (deletes old incompatible data)
node scripts/cleanup-production.js

# 2. Seed with fresh data (compatible with new schema)
node scripts/seed-production.js
```

### Scenario 2: Reset Production for Testing

```bash
# Cleanup + Seed in sequence
node scripts/cleanup-production.js && node scripts/seed-production.js
```

### Scenario 3: Partial Cleanup (Development Only)

For development, use the selective cleanup:
```bash
node scripts/cleanup-selective.js
```

---

## Safety Features

### URL Validation
Both production scripts validate the URL:
- **Reject** if URL contains `localhost` or `127.0.0.1`
- **Require** confirmation prompts before deletion

### Pagination Support
- Handles large datasets (>100 entries)
- Shows progress for long-running operations

### Error Handling
- Graceful failures (continues even if some operations fail)
- Detailed error messages
- Summary report at the end

---

## Troubleshooting

### Error: "Cannot read production token file"
**Solution:** Create `strapi_stage.token` file with your production API token

### Error: "Failed to fetch [endpoint]: 401"
**Solution:** Your API token is invalid or expired. Generate a new one.

### Error: "Failed to upload image"
**Solution:**
- Check that images exist in `public/demo-images/`
- Verify file permissions
- Check image file sizes (< 10MB recommended)

### Script hangs or times out
**Solution:**
- Check your network connection
- Verify production Strapi is running
- Try with smaller batch sizes

---

## Best Practices

1. **Always backup before cleanup**
   - Use Strapi's built-in backup features
   - Or export database manually

2. **Test on staging first**
   - Run scripts on staging environment
   - Verify results before running on production

3. **Use environment variables**
   ```bash
   # .env file
   PRODUCTION_STRAPI_URL=https://your-production-url.com
   ```

4. **Keep tokens secure**
   - Never commit `strapi_stage.token` to git
   - Add to `.gitignore` if not already
   - Rotate tokens periodically

5. **Monitor after seeding**
   - Check Strapi admin panel
   - Verify article counts
   - Publish articles if needed (check draftAndPublish setting)

---

## File Structure

```
backend/sportsholics-cms/
├── scripts/
│   ├── cleanup-all-data.js          # Local cleanup
│   ├── cleanup-production.js        # Production cleanup ⚠️
│   ├── cleanup-selective.js         # Interactive local cleanup
│   ├── seed-all-data.js            # Local seeding
│   ├── seed-production.js          # Production seeding ⚠️
│   ├── strapi.token                # Local token (gitignored)
│   ├── strapi_stage.token          # Production token (gitignored)
│   ├── strapi.token.example        # Token template
│   ├── README.md                   # General scripts documentation
│   └── PRODUCTION_README.md        # This file
└── public/
    └── demo-images/                # Images for seeding
        ├── football.png
        ├── basketball.png
        └── ...
```

---

## Support

If you encounter issues:

1. Check the error messages carefully
2. Verify your token and URL configuration
3. Test on local/staging first
4. Check Strapi server logs for details

---

**Remember:** Production scripts are powerful tools. Use them carefully! 🚀
