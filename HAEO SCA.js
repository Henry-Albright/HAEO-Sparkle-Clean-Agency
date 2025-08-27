// Background slideshow functionality
let currentImageIndex = 0;
const backgroundImages = [
    'ecf939564b0fd31cca0eefd04d1662e2.jpg',
    'f1ce8ffd8716040aad5ade5d7e938a85.jpg',
    'fbb109e0572faa8bdad6d0b2ad35c10b.jpg',
    'dbbc14d9d6db6ed9d47c6566474f3769.jpg',
    'b62969c312eacc6f4ba3910b3680228f.jpg',
    '191363612a660dfc72447aed02b86036.jpg',
    '65a700e50849eb9bba371758b1458eb3.jpg',
    '8cff5541968c473b9b72da8ff7ff20df.jpg',
    '8cf91368331b1e76a807681ebb07ee6a.jpg',
    '2b32d1a7c6f69143bd180e808bb0ce0b.jpg',
];

function changeBackgroundImage() {
    const hero = document.querySelector('.hero::before') || document.querySelector('.hero');
    if (hero) {
        document.documentElement.style.setProperty('--current-bg', `url('${backgroundImages[currentImageIndex]}')`);
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    }
}

// Initialize background slideshow
document.addEventListener('DOMContentLoaded', () => {
    // Set initial background
    document.documentElement.style.setProperty('--current-bg', `url('${backgroundImages[0]}')`);
    
    // Update hero background to use CSS variable
    const style = document.createElement('style');
    style.textContent = `
        .hero::before {
            background-image: var(--current-bg, url('${backgroundImages[0]}'));
        }
    `;
    document.head.appendChild(style);
    
    // Start slideshow
    setInterval(changeBackgroundImage, 10000); // Change every 10 seconds
});

// Video gallery functionality
function playVideo(button) {
    const galleryItem = button.parentElement;
    const video = galleryItem.querySelector('video');
    const overlay = galleryItem.querySelector('.video-overlay');
    
    if (video.paused) {
        video.play();
        button.style.display = 'none';
        overlay.style.display = 'none';
        video.controls = true;
    }
}

// Reset video when it ends
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('.gallery-item video');
    videos.forEach(video => {
        video.addEventListener('ended', function() {
            const galleryItem = this.parentElement;
            const button = galleryItem.querySelector('.play-button');
            const overlay = galleryItem.querySelector('.video-overlay');
            
            button.style.display = 'block';
            overlay.style.display = 'block';
            this.controls = false;
            this.currentTime = 0;
        });
    });
});
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });


// Back to top button functionality
function scrollToTop(){
// Show/hide back to top button
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    // Header background change on scroll
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0,0,0,0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--primary-black) 0%, var(--crimson) 100%)';
    }
});
}

function toggleMenu() {
    const nav = document.getElementById('navLinks');
    const button = document.querySelector('.mobile-menu');
    
    nav.classList.toggle('active');
    
    // Change button icon based on menu state
    if (nav.classList.contains('active')) {
        button.textContent = '✕'; // Close icon
    } else {
        button.textContent = '☰'; // Hamburger icon
    }
}

// Optional: Close menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('navLinks');
    const button = document.querySelector('.mobile-menu');
    
    if (!nav.contains(event.target) && !button.contains(event.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        button.textContent = '☰';
    }
});

// Optional: Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        const nav = document.getElementById('navLinks');
        const button = document.querySelector('.mobile-menu');
        
        nav.classList.remove('active');
        button.textContent = '☰';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter subscription handler
function handleNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('.newsletter-input').value;
    alert(`Thank you for subscribing to our newsletter with email: ${email}`);
    event.target.reset();
}

// Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    
    alert(`Thank you ${name}! We've received your request for ${service}. We'll contact you at ${phone} within 24 hours with your free quote.`);
    event.target.reset();
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => { 
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Intersection Observer for animations and counters
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Start counter animation if this is a stats section
            if (entry.target.closest('.stats') && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                setTimeout(() => animateCounters(), 500);
            }
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Initialize background slideshow
    document.documentElement.style.setProperty('--current-bg', `url('${backgroundImages[0]}')`);
    
    // Update hero background to use CSS variable
    const style = document.createElement('style');
    style.textContent = `
        .hero::before {
            background-image: var(--current-bg, url('${backgroundImages[0]}'));
        }
    `;
    document.head.appendChild(style);
    
    // Start slideshow
    setInterval(changeBackgroundImage, 10000); // Change every 10 seconds
    
    // Initialize video event listeners
    const videos = document.querySelectorAll('.gallery-item video');
    videos.forEach(video => {
        video.addEventListener('ended', function() {
            const galleryItem = this.parentElement;
            const button = galleryItem.querySelector('.play-button');
            const overlay = galleryItem.querySelector('.video-overlay');
            
            button.style.display = 'block';
            overlay.style.display = 'block';
            this.controls = false;
            this.currentTime = 0;
        });
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0,0,0,0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, var(--primary-black) 0%, var(--crimson) 100%)';
    }
});

