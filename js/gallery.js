// gallery.js - Enhanced version

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

    // Initialize gallery sections
    const gallerySections = {
        all: document.getElementById('all-section'),
        hair: document.getElementById('hair-section'),
        makeup: document.getElementById('makeup-section'),
        bridal: document.getElementById('bridal-section'),
        nails: document.getElementById('nails-section'),
        skincare: document.getElementById('skincare-section')
    };

    // Show all section by default
    if (gallerySections.all) {
        gallerySections.all.classList.add('active');
    }

    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Hide all sections
            Object.values(gallerySections).forEach(section => {
                if (section) {
                    section.classList.remove('active');
                }
            });
            
            // Show selected section
            if (filterValue === 'all') {
                if (gallerySections.all) {
                    gallerySections.all.classList.add('active');
                }
            } else {
                if (gallerySections[filterValue]) {
                    gallerySections[filterValue].classList.add('active');
                }
            }
            
            // Scroll to the section with offset for fixed header
            const targetSection = document.getElementById(`${filterValue}-section`);
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Populate all section with items from all categories
    if (gallerySections.all) {
        const allItems = [];
        Object.keys(gallerySections).forEach(key => {
            if (key !== 'all' && gallerySections[key]) {
                const items = gallerySections[key].querySelectorAll('.gallery-item');
                items.forEach(item => {
                    const clone = item.cloneNode(true);
                    allItems.push(clone);
                });
            }
        });

        // Shuffle and add items to all section
        shuffleArray(allItems);
        const allGrid = gallerySections.all.querySelector('.gallery-grid');
        if (allGrid) {
            allGrid.innerHTML = ''; // Clear existing items
            allItems.forEach(item => {
                allGrid.appendChild(item);
            });
        }
    }

    // Modal functionality
    const modal = document.getElementById('imageModal');
    if (modal) {
        const modalImg = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDescription');
        const closeBtn = document.querySelector('.close-btn');

        // Add click event to all view buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('view-btn') || e.target.closest('.view-btn')) {
                const btn = e.target.closest('.view-btn');
                const item = btn.closest('.gallery-item');
                const imgSrc = item.querySelector('img').src;
                const title = item.querySelector('h3').textContent;
                const desc = item.querySelector('p').textContent;
                
                if (modalImg) modalImg.src = imgSrc;
                if (modalTitle) modalTitle.textContent = title;
                if (modalDesc) modalDesc.textContent = desc;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Helper function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Book Now button functionality
    document.querySelectorAll('.card-btn, .cta-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('cta-btn') && this.getAttribute('href') === 'booking.html') {
                return; // Let the link handle it naturally
            }
            e.preventDefault();
            window.location.href = 'booking.html';
        });
    });

    // Animate gallery items on scroll
    const animateOnScroll = () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                rect.bottom >= 0
            );
        };
        
        galleryItems.forEach((item, index) => {
            if (item && isInViewport(item)) {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };

    // Initialize animations
    window.addEventListener('load', () => {
        // Set initial state for animation
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        animateOnScroll();
    });

    window.addEventListener('scroll', animateOnScroll);
});