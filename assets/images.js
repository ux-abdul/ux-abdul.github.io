// Image configuration for the portfolio
const images = {
  profile: "https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc2NDM2NTA1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  
  // Project 1: Hotel Onboarding App
  project1: [
    "assets/img/hotel1.png",
    "assets/img/review-suspense-usp.png",
    "assets/img/credit-card-recon.png",
    "assets/img/review-suspense-usp-details.png",
  ],
  
  // Project 2: Airport Shopping
  project2: [
    "assets/img/airport-shopping1.png",
    "assets/img/review-suspense-usp.png",
    "assets/img/credit-card-recon.png",
    "assets/img/review-suspense-usp-details.png",
  ],
  
  // Project 3: Smart Home Dashboard
  project3: [
    "assets/img/thumb-mockup.png",
    "assets/img/review-suspense-usp.png",
    "assets/img/credit-card-recon.png",
    "assets/img/review-suspense-usp-details.png",
  ],
  
  // Project 4: E-Commerce Platform
  project4: [
    "assets/img/thumb-mockup.png",
    "assets/img/review-suspense-usp.png",
    "assets/img/credit-card-recon.png",
    "assets/img/review-suspense-usp-details.png",
  ],
  
  // Gallery images
  gallery: [
    "assets/img/specialist.png",
    "assets/img/wallet.png",
    "assets/img/law.png",
  ]
};

// Project images by project ID - Scalable structure
// To add a new project, simply add: projectImagesById[4] = images.project5;
const projectImagesById = {
  0: images.project1, // Hotel Onboarding App
  1: images.project2, // Airport Shopping
  2: images.project3, // Smart Home Dashboard
  3: images.project4, // E-Commerce Platform
};

// Gallery images
const galleryImages = images.gallery;
