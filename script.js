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
    const projectId = projectNum - 1; // Convert project1 -> 0, project2 -> 1, etc.
    const projectImages = projectImagesById[projectId] || [];
    
    // Set initial main image
    mainImage.src = projectImages[0];
    
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
    projectState[projectStateKey] = index;
    const projectImages = projectImagesById[projectId] || [];
    
    // Update main image
    const mainImage = document.getElementById(mainImageId);
    mainImage.style.opacity = '0';
    
    setTimeout(() => {
        mainImage.src = projectImages[index];
        mainImage.style.opacity = '1';
    }, 150);
    
    // Update active state on thumbnails
    const carousel = document.getElementById(carouselId);
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
    const projectStateKey = `project${projectNum}`;
    const projectId = projectNum - 1;
    const projectImages = projectImagesById[projectId] || [];
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
    
    galleryImages.forEach((img, index) => {
        const div = document.createElement('div');
        div.className = 'overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]';
        div.onclick = () => openGalleryModal(index);
        
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = `Gallery ${index + 1}`;
        imgElement.className = 'w-full h-auto block';
        
        div.appendChild(imgElement);
        galleryGrid.appendChild(div);
    });
}

// Gallery modal state
let currentGalleryIndex = 0;

function openGalleryModal(index) {
    currentGalleryIndex = index;
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    
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
    const modalImage = document.getElementById('modal-image');
    modalImage.src = galleryImages[currentGalleryIndex];
    
    updateModalThumbnails();
}

function updateModalThumbnails() {
    const thumbnailsContainer = document.getElementById('modal-thumbnails');
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
    // Initialize project carousels
    initProjectCarousel(1, 'project1-carousel', 'project1-main');
    initProjectCarousel(2, 'project2-carousel', 'project2-main');
    initProjectCarousel(3, 'project3-carousel', 'project3-main');
    initProjectCarousel(4, 'project4-carousel', 'project4-main');
    
    // Initialize gallery
    initGallery();
    
    // Modal close buttons
    document.getElementById('close-modal-desktop').onclick = closeGalleryModal;
    document.getElementById('close-modal-mobile').onclick = closeGalleryModal;
    
    // Modal navigation buttons
    document.getElementById('modal-prev').onclick = goToPreviousImage;
    document.getElementById('modal-next').onclick = goToNextImage;
    
    // Close modal when clicking outside
    document.getElementById('gallery-modal').onclick = function(e) {
        if (e.target.id === 'gallery-modal') {
            closeGalleryModal();
        }
    };
    
    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('gallery-modal');
        if (!modal.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeGalleryModal();
            } else if (e.key === 'ArrowLeft') {
                goToPreviousImage();
            } else if (e.key === 'ArrowRight') {
                goToNextImage();
            }
        }
    });
});
