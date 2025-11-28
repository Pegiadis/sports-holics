# Production Migration Fix Guide

## Problem

Your production Strapi failed to start with this error:

```
alter table "public"."basketball_articles" alter column "description" type jsonb 
using ("description"::jsonb) - invalid input syntax for type json
```

**Root Cause:** The production database had articles with plain text `description` fields, but Strapi was trying to migrate them to `jsonb` (blocks format). The plain text couldn't be converted to valid JSON, causing the migration to fail.

## Solution Steps

### ✅ Step 1: Clean Production Data (COMPLETED)

We deleted all articles from production using `cleanup-production-auto.js`:

- ✅ Deleted 15 Football Articles
- ✅ Deleted 15 Basketball Articles  
- ✅ Deleted 15 Formula1 Articles
- ✅ Deleted 15 News Articles
- ✅ Deleted 9 Blog Articles
- ✅ Deleted 35 Breaking News Items

**Total: 104 entries removed**

### ⏳ Step 2: Restart Production Strapi

Now that the data is clean, Strapi should start successfully:

1. Go to your production hosting dashboard (Strapi Cloud/Render/etc.)
2. Restart the Strapi instance
3. The migration will now run successfully with empty tables

### ⏳ Step 3: Re-seed with Blocks Format

Once Strapi is running, seed the data again:

```bash
cd backend/sportsholics-cms
node scripts/seed-production.js
```

The script has been updated to use the correct **blocks format** (jsonb):

```javascript
// Old (plain text - caused the error)
description: "Some text..."

// New (blocks format - correct)
description: [
  {
    type: 'paragraph',
    children: [{ type: 'text', text: 'Some text...' }]
  }
]
```

## Why This Happened

1. **Local dev** had already migrated to blocks format (`type: "blocks"` in schema)
2. **Production** still had old text format (`type: "text"` in schema)
3. We seeded production with plain text (which worked at the time)
4. Then Strapi tried to auto-migrate production schema from `text` → `blocks`
5. PostgreSQL couldn't convert plain text strings to JSON objects → migration failed

## Prevention

- **Always** match your seed data format to the target environment's schema
- **Test migrations** on staging before production
- **Backup** before major schema changes
- Check production logs before seeding

## Scripts Available

- `cleanup-production-auto.js` - Quick cleanup without confirmations (for emergencies)
- `cleanup-production.js` - Safe cleanup with double confirmation
- `seed-production.js` - Seed with blocks format (use AFTER migration succeeds)
- `seed-all-data.js` - Local development seeding

## Current Status

- ✅ Production database cleaned
- ⏳ Waiting for Strapi restart and migration
- ⏳ Ready to re-seed once Strapi is running

## Next Actions

1. **Check production logs** - Verify Strapi starts without errors
2. **Verify migration** - Confirm tables have `jsonb` type for description columns
3. **Re-run seed script** - Populate with blocks-formatted content
4. **Verify in admin** - Check articles display correctly in Strapi admin

---

**Last Updated:** 2025-11-21  
**Status:** Database cleaned, awaiting Strapi restart
