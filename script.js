// Images are loaded from assets/images.js
// Project carousel state
const projectState = {
    project1: 0,
    project2: 0,
    project3: 0,
    project4: 0
};

// Initialize project carousels
function initProjectCarousel(projectNum, carouselId, mainImageId) {
    const carousel = document.getElementById(carouselId);
    const mainImage = document.getElementById(mainImageId);
    
    // Check if elements exist before initializing
    if (!carousel || !mainImage) {
        return; // Exit early if elements don't exist
    }
    
    // Check if projectImagesById is defined
    if (typeof projectImagesById === 'undefined') {
        console.error('projectImagesById is not defined. Make sure assets/images.js is loaded before script.js');
        return; // Exit early if variable doesn't exist
    }
    
    const projectId = projectNum - 1; // Convert project1 -> 0, project2 -> 1, etc.
    const projectImages = projectImagesById[projectId] || [];
    
    // Set initial main image
    if (projectImages.length > 0 && mainImage) {
    mainImage.src = projectImages[0];
    }
    
    projectImages.forEach((img, index) => {
        const button = document.createElement('button');
        button.className = `bg-white border ${index === 0 ? 'border-black' : 'border-[#ebebeb]'} rounded p-0.5 w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] cursor-pointer transition-all hover:scale-105`;
        button.onclick = () => selectProjectImage(`project${projectNum}`, projectId, index, mainImageId, carouselId);
        
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = `Thumbnail ${index + 1}`;
        imgElement.className = 'w-full h-full object-cover rounded';
        
        button.appendChild(imgElement);
        carousel.appendChild(button);
    });
}

function selectProjectImage(projectStateKey, projectId, index, mainImageId, carouselId) {
    // Check if projectImagesById is defined
    if (typeof projectImagesById === 'undefined') {
        console.error('projectImagesById is not defined');
        return;
    }
    
    projectState[projectStateKey] = index;
    const projectImages = projectImagesById[projectId] || [];
    
    // Update main image
    const mainImage = document.getElementById(mainImageId);
    if (!mainImage || !projectImages[index]) {
        return; // Exit early if elements don't exist
    }
    
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
        mainImage.src = projectImages[index];
        mainImage.style.opacity = '1';
    }, 150);
    
    // Update active state on thumbnails
    const carousel = document.getElementById(carouselId);
    if (!carousel) {
        return; // Exit early if carousel doesn't exist
    }
    
    const thumbnails = carousel.querySelectorAll('button');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.className = 'bg-white border border-black rounded p-0.5 w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] cursor-pointer transition-all hover:scale-105';
        } else {
            thumb.className = 'bg-white border border-[#ebebeb] rounded p-0.5 w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] cursor-pointer transition-all hover:scale-105';
        }
    });
}

// Navigate project images with arrows
function navigateProject(projectNum, direction) {
    // Check if projectImagesById is defined
    if (typeof projectImagesById === 'undefined') {
        console.error('projectImagesById is not defined');
        return;
    }
    
    const projectStateKey = `project${projectNum}`;
    const projectId = projectNum - 1;
    const projectImages = projectImagesById[projectId] || [];
    
    // Check if project images exist
    if (projectImages.length === 0) {
        return; // Exit early if no images for this project
    }
    
    const currentIndex = projectState[projectStateKey];
    
    let newIndex;
    if (direction === 'prev') {
        newIndex = currentIndex === 0 ? projectImages.length - 1 : currentIndex - 1;
    } else {
        newIndex = currentIndex === projectImages.length - 1 ? 0 : currentIndex + 1;
    }
    
    selectProjectImage(
        projectStateKey, 
        projectId, 
        newIndex, 
        `project${projectNum}-main`, 
        `project${projectNum}-carousel`
    );
}

// Initialize gallery
function initGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Check if gallery grid exists
    if (!galleryGrid) {
        console.error('Gallery grid element not found');
        return; // Exit early if element doesn't exist
    }
    
    // Check if gallery images are available
    if (typeof galleryImages === 'undefined') {
        console.error('galleryImages variable is not defined. Make sure assets/images.js is loaded before script.js');
        return; // Exit early if variable doesn't exist
    }
    
    if (!galleryImages || galleryImages.length === 0) {
        console.warn('No gallery images available');
        return; // Exit early if no images
    }
    
    console.log('Initializing gallery with', galleryImages.length, 'images');
    
    galleryImages.forEach((img, index) => {
        const div = document.createElement('div');
        div.className = 'overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]';
        div.onclick = () => openGalleryModal(index);
        
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = `Gallery ${index + 1}`;
        imgElement.className = 'w-full h-auto block';
        imgElement.loading = 'lazy'; // Add lazy loading
        
        // Add error handling for image loading
        imgElement.onerror = function() {
            console.error('Failed to load gallery image:', img);
            this.style.display = 'none';
        };
        
        div.appendChild(imgElement);
        galleryGrid.appendChild(div);
    });
    
    console.log('Gallery initialized successfully');
}

// Gallery modal state
let currentGalleryIndex = 0;

function openGalleryModal(index) {
    if (typeof galleryImages === 'undefined' || !galleryImages[index]) {
        console.error('Gallery image not found at index:', index);
        return;
    }
    
    currentGalleryIndex = index;
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    
    if (!modal || !modalImage) {
        console.error('Gallery modal elements not found');
        return;
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modalImage.src = galleryImages[index];
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Update thumbnails
    updateModalThumbnails();
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

function goToPreviousImage() {
    currentGalleryIndex = currentGalleryIndex === 0 
        ? galleryImages.length - 1 
        : currentGalleryIndex - 1;
    
    updateModalImage();
}

function goToNextImage() {
    currentGalleryIndex = currentGalleryIndex === galleryImages.length - 1 
        ? 0 
        : currentGalleryIndex + 1;
    
    updateModalImage();
}

function updateModalImage() {
    if (typeof galleryImages === 'undefined' || !galleryImages[currentGalleryIndex]) {
        console.error('Gallery image not found at index:', currentGalleryIndex);
        return;
    }
    
    const modalImage = document.getElementById('modal-image');
    if (!modalImage) {
        console.error('Modal image element not found');
        return;
    }
    
    modalImage.src = galleryImages[currentGalleryIndex];
    
    updateModalThumbnails();
}

function updateModalThumbnails() {
    if (typeof galleryImages === 'undefined') {
        console.error('galleryImages is not defined');
        return;
    }
    
    const thumbnailsContainer = document.getElementById('modal-thumbnails');
    if (!thumbnailsContainer) {
        console.error('Modal thumbnails container not found');
        return;
    }
    
    thumbnailsContainer.innerHTML = '';
    
    galleryImages.forEach((img, index) => {
        const button = document.createElement('button');
        button.className = `flex-shrink-0 w-20 h-20 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
            currentGalleryIndex === index
                ? 'border-black scale-110'
                : 'border-gray-300 hover:border-gray-500'
        }`;
        button.onclick = () => selectGalleryImage(index);
        
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = `Thumbnail ${index + 1}`;
        imgElement.className = 'w-full h-full object-cover';
        
        button.appendChild(imgElement);
        thumbnailsContainer.appendChild(button);
    });
}

function selectGalleryImage(index) {
    currentGalleryIndex = index;
    updateModalImage();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing portfolio');
    
    // Check if required variables are available
    if (typeof projectImagesById === 'undefined') {
        console.error('projectImagesById is not defined. Make sure assets/images.js is loaded before script.js');
    }
    if (typeof galleryImages === 'undefined') {
        console.error('galleryImages is not defined. Make sure assets/images.js is loaded before script.js');
    }
    
    // Initialize project carousels - wrapped in try-catch to prevent errors from stopping gallery initialization
    try {
    initProjectCarousel(1, 'project1-carousel', 'project1-main');
    } catch (error) {
        console.error('Error initializing project 1:', error);
    }
    
    try {
    initProjectCarousel(2, 'project2-carousel', 'project2-main');
    } catch (error) {
        console.error('Error initializing project 2:', error);
    }
    
    try {
    initProjectCarousel(3, 'project3-carousel', 'project3-main');
    } catch (error) {
        console.error('Error initializing project 3:', error);
    }
    
    try {
    initProjectCarousel(4, 'project4-carousel', 'project4-main');
    } catch (error) {
        console.error('Error initializing project 4:', error);
    }
    
    // Initialize gallery - this should always run, even if projects fail
    try {
    initGallery();
    } catch (error) {
        console.error('Error initializing gallery:', error);
    }
    
    // Modal close buttons - with safety checks
    const closeModalDesktop = document.getElementById('close-modal-desktop');
    const closeModalMobile = document.getElementById('close-modal-mobile');
    if (closeModalDesktop) {
        closeModalDesktop.onclick = closeGalleryModal;
    }
    if (closeModalMobile) {
        closeModalMobile.onclick = closeGalleryModal;
    }
    
    // Modal navigation buttons - with safety checks
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    if (modalPrev) {
        modalPrev.onclick = goToPreviousImage;
    }
    if (modalNext) {
        modalNext.onclick = goToNextImage;
    }
    
    // Close modal when clicking outside
    const galleryModal = document.getElementById('gallery-modal');
    if (galleryModal) {
        galleryModal.onclick = function(e) {
        if (e.target.id === 'gallery-modal') {
            closeGalleryModal();
        }
    };
    }
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('gallery-modal');
        if (modal && !modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeGalleryModal();
            } else if (e.key === 'ArrowLeft') {
                goToPreviousImage();
            } else if (e.key === 'ArrowRight') {
                goToNextImage();
            }
        }
    });
    
    console.log('Portfolio initialization complete');
});
