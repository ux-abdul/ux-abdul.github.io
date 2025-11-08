// Project images
const projectImages = [
    'https://images.unsplash.com/photo-1758957530781-4ff54e09bee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZXNpZ24lMjBwb3J0Zm9saW98ZW58MXx8fHwxNzYyMDM0NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1629494893504-d41e26a02631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMG1vY2t1cHxlbnwxfHx8fDE3NjIwOTM5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYyMTA2NzE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1683818051102-dd1199d163b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcHJvZHVjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NjIwNjc0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
];

// Gallery images
const galleryImages = [
    'https://images.unsplash.com/photo-1758957530781-4ff54e09bee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZXNpZ24lMjBwb3J0Zm9saW98ZW58MXx8fHwxNzYyMDM0NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1510873660878-bdf8de0ed851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMG1pbmltYWx8ZW58MXx8fHwxNzYyMDY5NDgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1629494893504-d41e26a02631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1aSUyMGRlc2lnbiUyMG1vY2t1cHxlbnwxfHx8fDE3NjIwOTM5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYyMTA2NzE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1683818051102-dd1199d163b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcHJvZHVjdCUyMGRlc2lnbnxlbnwxfHx8fDE3NjIwNjc0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1760548425425-e42e77fa38f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzYyMDc3MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
];

// Project carousel state
const projectState = {
    project1: 0,
    project2: 0,
    project3: 0,
    project4: 0
};

// Initialize project carousels
function initProjectCarousel(projectId, carouselId, mainImageId) {
    const carousel = document.getElementById(carouselId);
    const mainImage = document.getElementById(mainImageId);
    
    // Set initial main image
    mainImage.src = projectImages[0];
    
    projectImages.forEach((img, index) => {
        const button = document.createElement('button');
        button.className = `bg-white border ${index === 0 ? 'border-black' : 'border-[#ebebeb]'} rounded p-0.5 w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] cursor-pointer transition-all hover:scale-105`;
        button.onclick = () => selectProjectImage(projectId, index, mainImageId, carouselId);
        
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = `Thumbnail ${index + 1}`;
        imgElement.className = 'w-full h-full object-cover rounded';
        
        button.appendChild(imgElement);
        carousel.appendChild(button);
    });
}

function selectProjectImage(projectId, index, mainImageId, carouselId) {
    projectState[projectId] = index;
    
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
        div.className = 'w-full overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]';
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
    initProjectCarousel('project1', 'project1-carousel', 'project1-main');
    initProjectCarousel('project2', 'project2-carousel', 'project2-main');
    initProjectCarousel('project3', 'project3-carousel', 'project3-main');
    initProjectCarousel('project4', 'project4-carousel', 'project4-main');
    
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
