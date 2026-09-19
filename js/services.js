// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Enhanced Scroll animations
document.addEventListener('DOMContentLoaded', function() {
    // Select all elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        'section h1, section h2, section h3, section h4, section h5, section h6, ' +
        'section p, section img, section .btn, ' +
        '.card, .facial-card, .nail-card, .about-content, .service-content, ' +
        '.nails-content, .facials-content'
    );

    // Add 'hidden' class to all elements initially
    animateElements.forEach(element => {
        element.classList.add('hidden');
    });

    // Configure the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                
                // Optional: Unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point slightly higher
    });

    // Observe all elements
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Enhanced Scroll animations (existing code - no changes needed)
document.addEventListener('DOMContentLoaded', function() {
    // Select all elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        'section h1, section h2, section h3, section h4, section h5, section h6, ' +
        'section p, section img, section .btn, ' +
        '.card, .facial-card, .nail-card, .about-content, .service-content, ' +
        '.nails-content, .facials-content, .video-container' // Added video-container
    );

    // ... rest of the existing JavaScript code remains the same
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});