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
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 100);
    });
}

// Create additional floating elements dynamically
document.addEventListener('DOMContentLoaded', function () {
    const floatingContainer = document.querySelector('.floating-elements');
    if (!floatingContainer) return;
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        const size = Math.random() * 100 + 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;

        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.top = `${posY}%`;
        element.style.left = `${posX}%`;
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;

        floatingContainer.appendChild(element);
    }
});

// Section Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.image-wrapper, .content-wrapper, .section-header, .card');
    
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75
        );
    };
    
    elements.forEach((element) => {
        if (element && isInViewport(element)) {
            element.classList.add('animate');
        }
    });
};

// Initialize animations
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', function () {
    const testimonials = document.querySelectorAll('.testimonial');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Show testimonial based on index
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active', 'prev', 'next');

            if (i === index) {
                testimonial.classList.add('active');
            } else if (i < index) {
                testimonial.classList.add('prev');
            } else if (i > index) {
                testimonial.classList.add('next');
            }
        });

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });
    }

    if (!testimonials.length || !indicators.length || !prevBtn || !nextBtn) return;

    // Next testimonial
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    // Previous testimonial
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }

    // Click on indicator
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            currentIndex = i;
            showTestimonial(currentIndex);
        });
    });

    // Button events
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);

    // Auto-rotate (optional)
    let autoRotate = setInterval(nextTestimonial, 5000);

    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });

        carousel.addEventListener('mouseleave', () => {
            autoRotate = setInterval(nextTestimonial, 5000);
        });
    }

    // Initialize
    showTestimonial(currentIndex);
});

// Button click effects
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.section-button, .card-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mainNav && mobileMenuBtn && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Update copyright year automatically
document.addEventListener('DOMContentLoaded', function () {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav && mobileMenuBtn && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});