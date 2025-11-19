// Project images by project ID
const projectImagesById = {
    0: [ // Hotel Onboarding App
        'assets/1a.png',
        'assets/1b.png',
        'assets/1c.png',
        'assets/1d.png',
    ],
    1: [ // Airport Shopping
        'https://framerusercontent.com/assets/3aa919e9d6c8d5194031a982cced55e99d3d7cec.png',
        'https://framerusercontent.com/assets/9defdf003610155af4ce588b36327ba43cdd51d5.png',
        'https://framerusercontent.com/assets/957bc6031ddad8c3a429ee35d288c7a16d19f623.png',
        'https://framerusercontent.com/assets/7c4b9b14f61e82bb0254132cc4cddf1e74dc6dcc.png',
    ],
    2: [ // Smart Home Dashboard
        'https://framerusercontent.com/assets/d19edbf8b2a8bc05bc5685b43d1db7f9783dd7ea.png',
        'https://framerusercontent.com/assets/fbc5c7d3774654c34d0f015ebebfd8d27c9b3521.png',
        'https://framerusercontent.com/assets/03bf4c9ea1b0beb1d45a78b73bf1bfe47b31ac9a.png',
        'https://framerusercontent.com/assets/48af282c86422ca231786ac7f6c0b1f90023e3eb.png',
        'https://images.unsplash.com/photo-1683818051102-dd1199d163b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcHJvZHVjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NjIwNjc0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYyMDc3MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    3: [ // E-Commerce Platform
        'https://framerusercontent.com/assets/233aa75caa27d9d13111c343c02851e5e606c3dc.png',
        'https://framerusercontent.com/assets/234206e2a9fb03d918ca6dc7dc0bc63a8db6c177.png',
        'https://framerusercontent.com/assets/c7764fe70fc0489adf732e266d740826de492ac7.png',
        'https://framerusercontent.com/assets/96d45c6dbf7d4cff2c9a38606dcba35ca638037d.png',
    ],
};

// Gallery images
const galleryImages = [
    'https://framerusercontent.com/assets/c79187e0e48190df400f1f0688dad01629ff1cd6.png',
    'https://framerusercontent.com/assets/5494e96b5fae8f1e7dff8d4c77777adc7f5f85b3.png',
    'https://framerusercontent.com/assets/55126b685b1ef2454759916c6de4efeb0ac5e9d9.png',
    'https://framerusercontent.com/assets/d42aa198da941433eadce3c4df10a4ce86b354a6.png',
    'https://framerusercontent.com/assets/730696846f64744ad6d1d88296fc49873e737d34.png',
];

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
