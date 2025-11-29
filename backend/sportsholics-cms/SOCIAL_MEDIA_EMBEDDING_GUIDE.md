# Social Media Embedding Guide for Editors

This guide explains how to embed social media posts from Twitter/X, Facebook, TikTok, and Instagram in your Sports-Holics articles.

## Table of Contents

1. [Overview](#overview)
2. [How to Add Social Media Embeds](#how-to-add-social-media-embeds)
3. [Platform-Specific Instructions](#platform-specific-instructions)
4. [Troubleshooting](#troubleshooting)
5. [Best Practices](#best-practices)
6. [Security Features](#security-features)

---

## Overview

Social media embeds allow you to include posts, tweets, and videos from popular platforms directly in your articles. These embeds are:

- **Fully interactive** - Readers can like, share, and interact with the content
- **Responsive** - Work perfectly on mobile, tablet, and desktop
- **Secure** - All embed codes are sanitized to prevent security issues
- **Easy to add** - Just paste the embed code from the platform

### Supported Platforms

- **Twitter/X** - Tweets and threads
- **Facebook** - Posts and videos
- **TikTok** - Videos
- **Instagram** - Posts and reels

---

## How to Add Social Media Embeds

### Step 1: Create or Edit an Article

1. Log in to Strapi admin at `http://localhost:1337/admin`
2. Navigate to **Content Manager**
3. Select your article type (Football, Basketball, Formula 1, News, or Blog)
4. Create a new article or edit an existing one

### Step 2: Add Social Media Embed Component

1. In the **Content** section (Dynamic Zone), click **Add a component**
2. Select **Social Media Embed** from the dropdown
3. A new embed form will appear

### Step 3: Fill in the Embed Details

The form has three fields:

1. **Platform** (required) - Select the social media platform:
   - Twitter
   - Facebook
   - TikTok
   - Instagram

2. **Embed Code** (required) - Paste the full HTML embed code from the platform
   - See [Platform-Specific Instructions](#platform-specific-instructions) below for how to get this code

3. **Caption** (optional) - Add a short description or context for the embed
   - Example: "Η επίσημη ανακοίνωση της ομάδας"

### Step 4: Save and Publish

1. Click **Save** to save your changes
2. Click **Publish** to make the article live on the website

---

## Platform-Specific Instructions

### Twitter/X

**How to get embed code:**

1. Go to [twitter.com](https://twitter.com) or [x.com](https://x.com)
2. Find the tweet you want to embed
3. Click the **share icon** (⋯) in the bottom right of the tweet
4. Select **Embed Tweet**
5. A new page will open with the embed code
6. Click **Copy Code**
7. Paste the entire code into the **Embed Code** field in Strapi

**Example embed code:**
```html
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Just setting up my twttr</p>&mdash; jack (@jack) <a href="https://twitter.com/jack/status/20?ref_src=twsrc%5Etfw">March 21, 2006</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

**Important notes:**
- Make sure to copy the entire code, including the `<blockquote>` and `<script>` tags
- The embed will work with both twitter.com and x.com URLs

---

### Facebook

**How to get embed code:**

1. Go to [facebook.com](https://facebook.com)
2. Find the post you want to embed
3. Click the **three dots (...)** in the top right corner of the post
4. Select **Embed**
5. A popup will appear with the embed code
6. Click **Copy Code** (or select all and copy)
7. Paste the entire code into the **Embed Code** field in Strapi

**Example embed code:**
```html
<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook%2Fposts%2F10158791540676729&show_text=true&width=500" width="500" height="660" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
```

**Important notes:**
- Copy the entire `<iframe>` tag
- Public posts work best for embedding
- Make sure the post is not restricted by privacy settings

---

### TikTok

**How to get embed code:**

1. Go to [tiktok.com](https://tiktok.com)
2. Find the video you want to embed
3. Click the **share icon** (arrow pointing right)
4. Select **Embed**
5. A popup will appear with the embed code
6. Click **Copy Code**
7. Paste the entire code into the **Embed Code** field in Strapi

**Example embed code:**
```html
<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tiktok/video/6829267836783971586" data-video-id="6829267836783971586" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@tiktok" href="https://www.tiktok.com/@tiktok">@tiktok</a> <p></p> <a target="_blank" title="♬ original sound - TikTok" href="https://www.tiktok.com/music/original-sound-6829267863923944197">♬ original sound - TikTok</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>
```

**Important notes:**
- Copy both the `<blockquote>` and `<script>` tags
- The video must be public (not private)

---

### Instagram

**How to get embed code:**

1. Go to [instagram.com](https://instagram.com)
2. Find the post or reel you want to embed
3. Click the **three dots (...)** in the top right corner
4. Select **Embed**
5. A popup will appear with the embed code
6. Click **Copy Embed Code**
7. Paste the entire code into the **Embed Code** field in Strapi

**Example embed code:**
```html
<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/CUbHfhpswxt/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/CUbHfhpswxt/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> </a></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>
```

**Important notes:**
- Copy both the `<blockquote>` and `<script>` tags
- The post must be public (not from a private account)
- Works with both posts and reels

---

## Troubleshooting

### Embed doesn't appear on the frontend

**Possible causes:**
1. **Article not published** - Make sure you clicked "Publish" in Strapi
2. **Invalid embed code** - Make sure you copied the entire code from the platform
3. **Private content** - The post might be private or deleted
4. **Wrong platform selected** - Make sure you selected the correct platform dropdown

**Solution:**
- Check that the article is published (not just saved as draft)
- Try getting a new embed code from the platform
- Verify the post is public and still exists

### Embed code gets rejected

**Possible causes:**
1. **Security validation failed** - The embed code contains untrusted URLs
2. **Incomplete code** - You didn't copy the entire embed code
3. **Wrong platform** - The embed code doesn't match the selected platform

**Solution:**
- Make sure you're copying the official embed code from the platform
- Copy the entire code including all `<script>` tags
- Select the correct platform in the dropdown

### Embed looks broken or unstyled

**Possible causes:**
1. **JavaScript not loaded** - The platform's SDK script hasn't loaded yet
2. **Network issues** - The embed can't load from the platform's servers

**Solution:**
- Wait a few seconds and refresh the page
- Check your internet connection
- Try viewing the page in a different browser

---

## Best Practices

### 1. Use Embeds Sparingly

- Don't overload articles with too many embeds
- Recommended: 1-3 embeds per article
- Too many embeds can slow down page load time

### 2. Add Context with Captions

- Always add a caption to explain why the embed is relevant
- Example: "Η επίσημη ανακοίνωση της ομάδας για τη μεταγραφή"
- This helps readers understand the content before it loads

### 3. Choose the Right Platform

- Make sure you select the correct platform from the dropdown
- Wrong platform selection = embed won't work

### 4. Test Before Publishing

- Always preview your article before publishing
- Check that all embeds load correctly
- View on both desktop and mobile

### 5. Keep Content Relevant

- Only embed posts that are directly related to your article
- Make sure the embedded content is appropriate
- Check that links still work (posts can be deleted)

### 6. Mix with Text

- Don't put embeds back-to-back
- Add explanatory text between embeds
- Create a narrative flow in your article

---

## Security Features

Sports-Holics implements several security measures to keep the site safe:

### HTML Sanitization

All embed codes are automatically sanitized before being displayed:
- **Removes malicious scripts** - Only allows embed codes from trusted platforms
- **Validates URLs** - Checks that all links point to official platform domains
- **Filters harmful content** - Blocks potentially dangerous HTML

### Allowed Domains

Only embed codes from these official domains are accepted:

- **Twitter/X**: `twitter.com`, `x.com`, `platform.twitter.com`
- **Facebook**: `facebook.com`, `fb.com`, `connect.facebook.net`
- **TikTok**: `tiktok.com`, `www.tiktok.com`
- **Instagram**: `instagram.com`, `www.instagram.com`, `platform.instagram.com`

### What This Means for You

- You can safely paste embed codes from official platforms
- The system will automatically reject suspicious or malicious code
- If a valid embed code is rejected, contact the development team

---

## Using Helper Scripts

For advanced users, there are command-line tools available:

### Add Embed to Existing Article

```bash
cd backend/sportsholics-cms
node scripts/add-social-embed-to-article.js
```

This interactive script will:
1. Prompt you to select an article
2. Ask which platform (Twitter, Facebook, TikTok, Instagram)
3. Show instructions for getting the embed code
4. Let you paste the embed code
5. Add the embed to your article

### Create Test Article

```bash
cd backend/sportsholics-cms
node scripts/test-social-embeds.js
```

This script creates a test article with sample embeds from all platforms, useful for:
- Testing that embeds work correctly
- Seeing examples of each platform
- Verifying frontend rendering

**Note:** You need a Strapi API token to use these scripts. See the main project documentation for setup instructions.

---

## Need Help?

If you encounter issues not covered in this guide:

1. Check the main project documentation in `CLAUDE.md`
2. Contact the development team
3. Report bugs on the project's issue tracker

---

## Changelog

### Version 1.0 (2025)
- Initial release
- Support for Twitter/X, Facebook, TikTok, Instagram
- HTML sanitization and security validation
- Responsive embeds on all devices
