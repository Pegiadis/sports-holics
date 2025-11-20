# Demo Images for Production Seeding

This directory contains demo images used by the `seed-production.js` script.

## Required Images

Place these images in this directory before running the production seed script:

```
demo-images/
├── 216-scaled-1.jpg
├── BG-football-1600x1000-1170x600-1.jpeg
├── Ferrari_F1.jpg
├── wp14783249.jpg
├── formula.png
├── apex.png
├── basketball.png
├── football.png
├── images.jpeg
├── news-2.png
└── racing-car.png
```

## Image Specifications

### Article Images (Football, Basketball, Formula 1, News)
- **Resolution**: 1600 x 1000 pixels (16:10 aspect ratio)
- **Format**: JPG or PNG
- **File size**: < 2MB

### Blog Cover Images
- **Resolution**: 1920 x 1080 pixels (16:9 aspect ratio)
- **Format**: JPG or PNG
- **File size**: < 2MB

### Journalist Avatars
- **Resolution**: 400 x 400 pixels (1:1 square)
- **Format**: JPG or PNG
- **File size**: < 500KB

### Hero Background Images
- **Resolution**: 2560 x 1080 pixels (21:9 aspect ratio)
- **Format**: JPG or PNG
- **File size**: < 3MB

## How to Add Images

1. Copy your demo images to this directory
2. Use the exact filenames listed above (or update `seed-production.js`)
3. Run the seed script:
   ```bash
   node scripts/seed-production.js
   ```

## Where to Get Images

You can use images from:
- Your frontend `public/` directory
- Free stock photo sites (Unsplash, Pexels, Pixabay)
- Sports photography sites
- AI-generated images (Midjourney, DALL-E)

## Notes

- Images are uploaded to Strapi's media library during seeding
- The script randomly selects images from this directory
- Missing images will be skipped (entries created without images)
- You can add more images and update the `AVAILABLE_IMAGES` array in `seed-production.js`

## .gitignore

This directory is typically excluded from git to avoid large binary files in the repository.
Only this README is tracked.
