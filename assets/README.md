# Assets Folder - HTML Version

This folder contains all image references used in the HTML portfolio website.

## Image Configuration

All images are configured in `images.js` and loaded in the HTML file before `script.js`.

## File Structure

```
HTML version/
├── assets/
│   ├── images.js          # Image configuration (loaded first)
│   └── README.md          # This file
├── index.html             # Main HTML file (loads images.js then script.js)
└── script.js              # Main JavaScript (uses projectImagesById and galleryImages)
```

## How It Works

1. **`index.html`** loads `assets/images.js` first, which defines:
   - `images` object with all image URLs
   - `projectImagesById` object for project images
   - `galleryImages` array for gallery

2. **`script.js`** uses these global variables defined in `images.js`

## Adding a New Project

To add a new project (e.g., Project 5):

### Step 1: Add images to `images.js`
```javascript
// In the images object, add:
project5: [
  "https://your-image-url-1.jpg",
  "https://your-image-url-2.jpg",
  "https://your-image-url-3.jpg",
  "https://your-image-url-4.jpg",
],
```

### Step 2: Add to projectImagesById
```javascript
// In projectImagesById object, add:
const projectImagesById = {
  0: images.project1,
  1: images.project2,
  2: images.project3,
  3: images.project4,
  4: images.project5, // Add this line
};
```

### Step 3: Update HTML
Add the new project section in `index.html` following the same pattern as existing projects.

### Step 4: Initialize carousel
In `script.js`, add:
```javascript
initProjectCarousel(5, 'project5-carousel', 'project5-main-image');
```

## Image Categories

### Profile Image
- `images.profile` - Professional headshot

### Project Images
- `images.project1` - Array of 4 images for Hotel Onboarding App
- `images.project2` - Array of 4 images for Airport Shopping
- `images.project3` - Array of 5 images for Smart Home Dashboard
- `images.project4` - Array of 4 images for E-Commerce Platform

### Gallery Images
- `images.gallery` - Array of 5 dashboard images for masonry gallery

## Updating Images

To update or replace an image:
1. Open `assets/images.js`
2. Find the image URL you want to replace
3. Replace with new URL
4. Save the file
5. Refresh the browser

## Notes

- All images are currently hosted on Unsplash CDN
- The structure is scalable - just add new project arrays to the `images` object
- Images are loaded before the main script to ensure availability
- Each project can have a different number of images
- The carousel automatically adapts to the number of images
