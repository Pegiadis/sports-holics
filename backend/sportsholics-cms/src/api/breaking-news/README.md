# Breaking News Collection Type

This collection type manages the breaking news ticker that appears under the header on all pages.

## Overview

The Breaking News ticker displays urgent, time-sensitive news items in a scrolling marquee format. Content editors can manage multiple breaking news items that rotate in the ticker.

## Fields

### Required Fields
- **text** (string, max 200 characters): The breaking news message

### Optional Fields
- **link** (string): URL to link to (can be article slug like `/article/my-article` or external URL)

### System Fields
- **isActive** (boolean): Set to true to show this item in the ticker (default: true)
- **priority** (integer): Higher priority items appear first in the ticker (default: 0)

## Usage

### Creating Breaking News Items

1. Go to Strapi Admin Panel → Content Manager → Breaking News
2. Click "Create new entry"
3. Fill in the fields:
   - **Text**: Your breaking news message (keep it concise, max 200 characters)
   - **Link**: Optional URL to link to
   - **Is Active**: Set to `true` to show in ticker
   - **Priority**: Set higher numbers to show first (e.g., 10 for urgent, 5 for important, 0 for normal)
4. Save and Publish

### Example Breaking News Items

```
Text: "Μάντσεστερ Γιουνάιτεντ νικά Λίβερπουλ 3-1 στην Premier League"
Link: /article/man-united-liverpool-match
Is Active: true
Priority: 10
```

```
Text: "NBA Finals: Lakers προηγούνται 3-2 μετά από εντυπωσιακή νίκη"
Link: /article/lakers-game-5
Is Active: true
Priority: 5
```

```
Text: "Formula 1: Verstappen κερδίζει το Grand Prix του Μονακό"
Link: /article/monaco-gp-verstappen
Is Active: true
Priority: 8
```

## Display Order

Breaking news items are sorted by:
1. **Priority** (highest first)
2. **Creation date** (newest first)

The ticker displays up to 10 active items at once, separated by bullet points (•).

## Important Notes

- **Keep text concise**: Maximum 200 characters for optimal display
- **Active flag**: Only items with `isActive = true` appear in the ticker
- **Links are optional**: Items can display without links
- **Real-time updates**: Changes appear within 30 seconds (cache revalidation)
- **Priority system**: Use priority to control order of appearance
  - 10+ = Breaking/Urgent news
  - 5-9 = Important news
  - 0-4 = Standard news

## API Endpoint

**GET** `/api/breaking-news-items`

### Query Parameters
- `filters[isActive][$eq]=true` - Get only active items
- `sort[0]=priority:desc` - Sort by priority (highest first)
- `sort[1]=createdAt:desc` - Then by creation date (newest first)
- `pagination[limit]=10` - Get up to 10 items

### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "text": "Manchester United defeats Liverpool 3-1",
      "link": "/article/man-united-liverpool",
      "isActive": true,
      "priority": 10
    },
    {
      "id": 2,
      "text": "NBA Finals: Lakers lead series 3-2",
      "link": "/article/lakers-game-5",
      "isActive": true,
      "priority": 8
    }
  ]
}
```

## Frontend Integration

The breaking news ticker is automatically displayed on:
- Homepage (under header)
- Can be added to other pages as needed

**Location**: `frontend/components/BreakingNews.tsx`
**API Function**: `frontend/app/homepage-api.ts` → `fetchBreakingNews()`

## Tips for Content Editors

1. **Keep it short**: Aim for 100-150 characters for best readability
2. **Use Greek or English**: Match your audience language
3. **Update regularly**: Breaking news should be current and timely
4. **Use priority wisely**: Don't set everything to priority 10
5. **Archive old news**: Set `isActive = false` for outdated items instead of deleting
6. **Test links**: Make sure article links work before publishing
7. **Use descriptive text**: Readers should understand the news at a glance

## Best Practices

### Priority Guidelines
- **Priority 10**: Major breaking news (championships, transfers, shocking results)
- **Priority 7-9**: Important recent news (match results, significant announcements)
- **Priority 4-6**: Notable updates (injuries, upcoming events)
- **Priority 1-3**: General news items
- **Priority 0**: Filler content

### Text Writing Tips
- Start with the most important information
- Use active voice
- Include key details (who, what, when)
- Avoid unnecessary words
- Use numbers for scores and statistics

### Examples of Good Breaking News
✅ "Real Madrid κερδίζει Barcelona 2-1 στο El Clasico"
✅ "NBA: LeBron James ανακοινώνει αποχώρηση από Lakers"
✅ "Formula 1: Ferrari παρουσιάζει νέο μονοθέσιο για 2025"

### Examples to Avoid
❌ "Σημαντικό ματς σήμερα το βράδυ μεταξύ δύο ομάδων που θα..."
❌ "Διαβάστε το άρθρο μας για την αναμέτρηση που..."
❌ Text longer than 200 characters with too much detail

## Troubleshooting

**Breaking news not showing?**
- Check that `isActive` is set to `true`
- Ensure the entry is Published (not Draft)
- Verify public API permissions are enabled

**Items showing in wrong order?**
- Check the `priority` field values
- Higher numbers appear first

**Text appears cut off?**
- Keep text under 150 characters
- The ticker scrolls, but shorter is better

**Link not working?**
- Verify the link URL is correct
- For article links, use `/article/article-slug` format
- Test the link before publishing

