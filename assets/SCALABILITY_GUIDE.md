# Portfolio Scalability Guide

## Quick Reference: Adding a New Project

This guide shows you exactly what to modify to add a new project to your portfolio.

---

## 📋 Checklist

- [ ] Add project images to `assets/images.js`
- [ ] Add project to `projectImagesById` in `assets/images.js`
- [ ] Add HTML markup in `index.html`
- [ ] Initialize carousel in `script.js`

---

## 🎯 Step-by-Step Example: Adding Project 5

### 1️⃣ Update `assets/images.js`

```javascript
const images = {
  profile: "...",
  project1: [...],
  project2: [...],
  project3: [...],
  project4: [...],
  
  // ✅ ADD THIS - Project 5: Your New Project Name
  project5: [
    "https://your-image-1.jpg",
    "https://your-image-2.jpg",
    "https://your-image-3.jpg",
    "https://your-image-4.jpg",
  ],
  
  gallery: [...],
};

const projectImagesById = {
  0: images.project1,
  1: images.project2,
  2: images.project3,
  3: images.project4,
  4: images.project5, // ✅ ADD THIS LINE
};
```

---

### 2️⃣ Add HTML in `index.html`

Copy an existing project section and modify it:

```html
<!-- Project 5: Your New Project -->
<div class="bg-white rounded-[24px] border border-[#ebebeb] shadow-[2px_2px_0px_0px_#c7c7c7] overflow-hidden">
  <div class="p-4 lg:p-6 pb-0">
    <!-- Main Image Container with 2px black border -->
    <div class="relative bg-[#ebebeb] rounded-lg p-1 border-2 border-black overflow-hidden">
      <!-- Navigation arrows - 24x24px, positioned 60px from edge -->
      <button 
        onclick="navigateProject(5, 'prev')"
        class="absolute left-[60px] top-1/2 -translate-y-1/2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md text-gray-700 transition-all border border-gray-200 hover:bg-white hover:shadow-lg hover:scale-110"
        aria-label="Previous image">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <img 
        id="project5-main-image" 
        src="" 
        alt="Your New Project" 
        class="w-full h-auto rounded block"
      >

      <button 
        onclick="navigateProject(5, 'next')"
        class="absolute right-[60px] top-1/2 -translate-y-1/2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md text-gray-700 transition-all border border-gray-200 hover:bg-white hover:shadow-lg hover:scale-110"
        aria-label="Next image">
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </div>

  <!-- Project Info -->
  <div class="p-4 lg:p-6 pt-4 flex flex-col gap-3">
    <div class="flex flex-col gap-1">
      <h3 class="text-black">Your New Project Name</h3>
      <p class="text-[13px] text-black/70">Brief description of your project</p>
    </div>
    
    <!-- Carousel -->
    <div id="project5-carousel" class="flex gap-2 overflow-x-auto pb-2"></div>
    
    <!-- View Case Study Button -->
    <button 
      onclick="openCaseStudy('project5')"
      class="mt-1 bg-black text-white text-[13px] px-4 py-2.5 rounded-full hover:bg-gray-800 transition-colors border-2 border-black shadow-[2px_2px_0px_0px_#c7c7c7] hover:shadow-[3px_3px_0px_0px_#c7c7c7] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-[1px_1px_0px_0px_#c7c7c7] active:translate-x-[1px] active:translate-y-[1px]">
      View Case Study →
    </button>
  </div>
</div>
```

---

### 3️⃣ Update `script.js`

Find the initialization section and add:

```javascript
// Initialize all project carousels
document.addEventListener('DOMContentLoaded', function() {
    initProjectCarousel(1, 'project1-carousel', 'project1-main-image');
    initProjectCarousel(2, 'project2-carousel', 'project2-main-image');
    initProjectCarousel(3, 'project3-carousel', 'project3-main-image');
    initProjectCarousel(4, 'project4-carousel', 'project4-main-image');
    initProjectCarousel(5, 'project5-carousel', 'project5-main-image'); // ✅ ADD THIS
    
    // ... rest of initialization
});
```

Also add project state:

```javascript
const projectState = {
    project1: 0,
    project2: 0,
    project3: 0,
    project4: 0,
    project5: 0, // ✅ ADD THIS
};
```

---

## 🎨 Customization Options

### Different Number of Images
Each project can have a different number of images:

```javascript
project1: [img1, img2, img3, img4],        // 4 images
project2: [img1, img2, img3],               // 3 images
project3: [img1, img2, img3, img4, img5],  // 5 images
```

### Using Local Images
Instead of URLs, you can use relative paths:

```javascript
project5: [
  "assets/project5/image1.jpg",
  "assets/project5/image2.jpg",
  "assets/project5/image3.jpg",
]
```

---

## 🔧 Troubleshooting

### Images Not Showing?
1. Check browser console for errors
2. Verify `assets/images.js` is loaded before `script.js` in `index.html`
3. Confirm image URLs are accessible

### Carousel Not Working?
1. Verify `initProjectCarousel()` is called with correct IDs
2. Check project number matches the array index (Project 5 = index 4)
3. Ensure `projectState` includes the new project

### Arrow Buttons Not Appearing?
1. Verify the button HTML includes all Tailwind classes
2. Check that `navigateProject()` function exists in `script.js`
3. Ensure project number parameter is correct

---

## 📦 Current Project Structure

```
Project Index | Project Number | Variable Name | HTML ID
-------------|----------------|---------------|------------------
0            | 1              | project1      | project1-*
1            | 2              | project2      | project2-*
2            | 3              | project3      | project3-*
3            | 4              | project4      | project4-*
4            | 5              | project5      | project5-*
```

**Note:** Array indices start at 0, but project numbers start at 1 for HTML IDs and function calls.

---

## ✅ Testing Your New Project

After adding a new project:

1. [ ] Refresh the page
2. [ ] Check if main image loads
3. [ ] Click left/right arrows - images should cycle
4. [ ] Click carousel thumbnails - main image should update
5. [ ] Check responsive behavior on mobile
6. [ ] Verify glassmorphism effect on arrows
7. [ ] Test "View Case Study" button (if implemented)

---

## 💡 Best Practices

1. **Consistent naming**: Follow the pattern `project[N]`
2. **Image optimization**: Use optimized images (recommended: 1200px wide)
3. **Alt text**: Always include descriptive alt text
4. **Aspect ratio**: Try to keep consistent aspect ratios within a project
5. **Loading**: Consider adding loading states for images

---

## 📚 Related Files

- `assets/images.js` - Image configuration
- `script.js` - JavaScript functionality
- `index.html` - HTML structure
- `styles.css` - Styling (if separate)
