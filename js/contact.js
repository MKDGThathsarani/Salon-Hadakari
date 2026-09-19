// contact.js - Enhanced version

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const header = document.getElementById('header');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mobileMenuBtn) {
            if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = '';
            }
        }
    });

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const contactCards = [
            document.getElementById('contact-card1'),
            document.getElementById('contact-card2'),
            document.getElementById('contact-card3')
        ];
        
        const mapContainer = document.getElementById('map-container');
        
        const isInViewport = (element) => {
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            return (
                rect.top <= windowHeight * 0.85 &&
                rect.bottom >= 0
            );
        };
        
        contactCards.forEach((card, index) => {
            if (card && isInViewport(card)) {
                setTimeout(() => {
                    card.classList.add('animated');
                }, index * 200);
            }
        });
        
        if (mapContainer && isInViewport(mapContainer)) {
            mapContainer.classList.add('animated');
        }
    };

    // Initialize animations
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon.`);
            
            // Reset the form
            this.reset();
        });
    }

    // Add placeholder functionality for form labels
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(element => {
        // Add placeholder to make label animation work
        if (element.tagName === 'SELECT') {
            // For select elements, we need to handle differently
            element.addEventListener('change', function() {
                if (this.value) {
                    this.setAttribute('data-filled', 'true');
                } else {
                    this.removeAttribute('data-filled');
                }
            });
        } else {
            element.setAttribute('placeholder', ' ');
            
            element.addEventListener('focus', function() {
                this.setAttribute('data-focused', 'true');
            });
            
            element.addEventListener('blur', function() {
                this.removeAttribute('data-focused');
            });
        }
    });

    // Get Directions button functionality
    const directionsBtn = document.querySelector('.map-cta .btn');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://maps.google.com?q=Rejinawaththa+junction,Kalutara', '_blank');
        });
    }

    // Book Now button in hero section
    const bookNowBtn = document.querySelector('.hero-buttons .btn:first-child');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'booking.html';
        });
    }

    // Call Now button
    const callNowBtn = document.querySelector('.hero-buttons .btn:last-child');
    if (callNowBtn) {
        callNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'tel:0774019277';
        });
    }
});