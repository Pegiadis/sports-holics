# 📸 Image Upload Guidelines for Sports Holics Editors

## Quick Reference Card

| Requirement | Specification |
|-------------|--------------|
| **Ideal Dimensions** | 1600 x 1000 pixels |
| **Minimum Dimensions** | 1200 x 800 pixels |
| **Aspect Ratio** | 16:10 or 3:2 (horizontal) |
| **File Format** | JPG (preferred), PNG, or WEBP |
| **File Size** | Under 2MB (ideal), Max 5MB |
| **Orientation** | Landscape (horizontal) only |

---

## Why These Requirements?

Your images appear in multiple places across the website:
- **Homepage cards** (various sizes)
- **Sport section pages** (list view)
- **Article detail pages** (hero image)
- **Sidebar thumbnails** (small previews)
- **Carousel sliders** (rotating featured articles)

Each location crops or scales the image differently. Following these guidelines ensures your images look great everywhere.

---

## ✅ DO - Best Practices

### 1. **Use Landscape (Horizontal) Images**
```
✅ GOOD: [===================]  16:10 or 3:2 ratio
❌ BAD:  [======]                Portrait/vertical
         [======]
         [======]
```

### 2. **Keep Important Content in the "Safe Zone"**
```
┌─────────────────────────────┐
│ ← 10% →                     │ ← Margins (may be cropped)
│     ┌───────────────┐       │
│     │               │       │
│     │  SAFE ZONE    │       │ ← Keep faces, text, action here
│     │   (center)    │       │
│     │               │       │
│     └───────────────┘       │
│                             │
└─────────────────────────────┘
```
- Keep faces, text, and main action in the center 60% of the image
- Leave 10% breathing room on all edges
- Top and bottom 20% may be cropped on some cards

### 3. **Ideal Compositions for Sports Photos**

#### ✅ Action Shots
- Subject in center
- Horizontal motion (left-right)
- Background not too busy
- Example: Player dribbling, centered

#### ✅ Team Photos
- Group centered
- Not too wide (avoid extreme panoramas)
- Faces clearly visible
- Example: Team celebration, huddled

#### ✅ Stadium/Environment
- Wide landscape shot
- Main feature centered
- Good lighting
- Example: Stadium overview, crowd shot

#### ❌ Avoid These
- Extreme close-ups (faces cut off)
- Portrait orientation (tall/narrow)
- Important elements at edges
- Text overlays near borders
- Very dark or underexposed photos

---

## 📐 Dimension Guide

### **Recommended Sizes**

| Use Case | Dimensions | Why |
|----------|------------|-----|
| **Standard Upload** | 1600 x 1000px | Perfect for all uses, good file size |
| **High Quality** | 1920 x 1200px | For important articles, hero images |
| **Minimum Acceptable** | 1200 x 800px | Will work but may be less sharp |

### **Aspect Ratios Explained**

```
16:10 (1.6:1) - RECOMMENDED
[================]
Best overall ratio, works everywhere

3:2 (1.5:1) - RECOMMENDED
[=============]
Standard photo ratio, very versatile

16:9 (1.78:1) - ACCEPTABLE
[=================]
Widescreen, good for landscapes

4:3 (1.33:1) - ACCEPTABLE
[============]
More square, OK for some shots
```

---

## 📁 File Format & Compression

### **Preferred Formats**
1. **JPG** (Best) - Use for photos, action shots
2. **PNG** - Use for graphics, logos (larger files)
3. **WEBP** - Modern format (if your tool supports it)

### **File Size Targets**

| Image Type | Target Size | Maximum |
|------------|-------------|---------|
| Regular Article | 500KB - 1MB | 2MB |
| Hero/Featured | 1MB - 1.5MB | 3MB |
| Emergency Maximum | - | 5MB |

### **Compression Tools** (Free)

1. **TinyPNG** - https://tinypng.com
   - Drag & drop your image
   - Download compressed version
   - Usually reduces size by 60-70%

2. **Squoosh** - https://squoosh.app
   - Google's tool
   - See before/after comparison
   - Adjust quality slider

3. **Photopea** - https://www.photopea.com
   - Free Photoshop alternative
   - Resize and crop images
   - Export optimized JPG

---

## 🎯 Step-by-Step Upload Process

### Before Uploading:

1. **Check Dimensions**
   - Right-click image → Properties (Windows)
   - Or use Preview/Photos app
   - Verify: Width ≥ 1200px, Landscape orientation

2. **Check File Size**
   - If > 2MB, compress using TinyPNG
   - Aim for 500KB - 1.5MB

3. **Preview Composition**
   - Is main subject centered?
   - Any important details near edges?
   - Is it horizontal/landscape?

### In Strapi CMS:

1. **Upload Image** - Drag & drop or browse
2. **Add Alt Text** - Describe the image (e.g., "Panathinaikos player scoring goal")
3. **Preview Article** - Check how it looks on the live site
4. **Adjust if Needed** - If cropping looks bad, try a different photo

---

## 🚨 Common Mistakes & Solutions

### Problem: "Faces are Cut Off!"
**Cause:** Face too close to top/bottom edge  
**Solution:** Use images with faces in center third of photo

### Problem: "Image Looks Blurry"
**Cause:** Image too small (under 1200px wide)  
**Solution:** Find higher resolution version or use different photo

### Problem: "Sides are Cropped"
**Cause:** Portrait/vertical image used  
**Solution:** Use landscape/horizontal image instead

### Problem: "File Too Large Error"
**Cause:** Image over 5MB  
**Solution:** Compress using TinyPNG, reduce to under 2MB

### Problem: "Image Looks Stretched"
**Cause:** Extreme panorama or wrong aspect ratio  
**Solution:** Crop to 16:10 or 3:2 ratio before uploading

---

## 📊 Image Cheat Sheet by Content Type

### Football (Soccer)
- **Action shots**: Player with ball, centered, 16:10
- **Team photos**: Group in middle, 3:2
- **Stadium**: Wide angle, 16:9 acceptable
- **Avoid**: Tight close-ups, goalkeeper in net (too much empty space)

### Basketball
- **Dunks/Jumps**: Show full body, lots of vertical space, 3:2
- **Dribbling**: Player centered, horizontal motion, 16:10
- **Court overview**: Wide shot, 16:9
- **Avoid**: Only showing upper body of jumping players

### Formula 1
- **Racing**: Car in motion, centered or slightly off-center, 16:9
- **Podium**: Winners centered, 3:2
- **Pit stop**: Action in middle, 16:10
- **Avoid**: Extreme angles, too much track and no car

---

## 🔍 Quality Checklist

Before uploading any image, verify:

- [ ] Dimensions: At least 1200 x 800px
- [ ] Orientation: Landscape (horizontal)
- [ ] Aspect ratio: 16:10, 3:2, 16:9, or 4:3
- [ ] File size: Under 2MB
- [ ] Format: JPG, PNG, or WEBP
- [ ] Main subject: In center of image
- [ ] Focus: Sharp and in focus
- [ ] Lighting: Not too dark or overexposed
- [ ] Composition: Professional looking
- [ ] No important content within 10% of edges

---

## 💡 Pro Tips

1. **Batch Compress** - Process multiple images at once with TinyPNG
2. **Save Originals** - Keep high-res originals before compressing
3. **Reuse Good Images** - Build a library of properly sized images
4. **Check Mobile** - View articles on phone to see how images appear
5. **Seasonal Updates** - Update hero images for major events
6. **Copyright** - Only use images you have rights to use

---

## ❓ FAQ

**Q: Can I use vertical/portrait images?**  
A: No, they will be heavily cropped. Always use horizontal/landscape.

**Q: What if I only have a small image?**  
A: Find a higher resolution version or choose a different photo. Small images look blurry.

**Q: Can I add text to images before uploading?**  
A: Better to use the title/subtitle fields. If you must, keep text in center and make it large.

**Q: How do I crop an image to 16:10?**  
A: Use Photopea.com or your photo editor. Select "Crop" tool, set ratio to 16:10 or 8:5.

**Q: My image is 5MB, what do I do?**  
A: Compress it at TinyPNG.com. You can usually reduce to under 1MB without visible quality loss.

**Q: Do images need to be exactly 1600 x 1000?**  
A: No, but they should be at least 1200px wide and landscape oriented. 1600x1000 is ideal.

---

## 📞 Need Help?

If you're unsure about an image:
1. Try uploading it and preview the article
2. Ask a colleague to review
3. When in doubt, choose a landscape image with centered subject

**Remember:** A properly sized, well-composed image makes your article look professional and attracts more readers!

---

## 🎓 Quick Training Exercise

Try this with your next upload:
1. Find a sports photo you want to use
2. Check dimensions (should be 1200+ wide)
3. Compress if over 2MB
4. Upload to Strapi
5. Preview on live site
6. Check how it looks on homepage card AND article detail page

---

**Last Updated:** November 2025  
**Questions?** Contact the development team

