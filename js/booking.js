// booking.js - Fixed version

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Menu Toggle
    // ======================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const header = document.getElementById('header');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
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

    // ======================
    // Create floating elements
    // ======================
    const floatingContainer = document.querySelector('.floating-elements');
    if (floatingContainer) {
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
    }

    // ======================
    // Section Animations
    // ======================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-header, .booking-step, .staff-card');
        
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
                rect.bottom >= 0
            );
        };
        
        elements.forEach((element) => {
            if (element && isInViewport(element)) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // ======================
    // Staff Selection
    // ======================
    const staffCards = document.querySelectorAll('.staff-card');
    staffCards.forEach(card => {
        card.addEventListener('click', function() {
            staffCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Get staff details
            const staffName = this.dataset.staff;
            const staffImage = this.querySelector('.staff-image').style.backgroundImage;
            const staffTitle = this.querySelector('.staff-details p:first-child').textContent;
            
            // Save to localStorage
            localStorage.setItem('selectedStaff', JSON.stringify({
                name: staffName,
                image: staffImage,
                title: staffTitle
            }));
        });
    });

    // ======================
    // Date Picker
    // ======================
    function initializeDatePicker() {
        const currentMonthEl = document.querySelector('.current-month');
        const daysGrid = document.querySelector('.days-grid');
        const prevMonthBtn = document.querySelector('.prev-month');
        const nextMonthBtn = document.querySelector('.next-month');
        
        if (!currentMonthEl || !daysGrid || !prevMonthBtn || !nextMonthBtn) return;
        
        let currentDate = new Date();
        
        // Check if there's a saved date
        const savedDate = localStorage.getItem('selectedDate');
        if (savedDate) {
            try {
                const parsedDate = JSON.parse(savedDate);
                if (parsedDate.dateString) {
                    const savedDateObj = new Date(parsedDate.dateString);
                    if (!isNaN(savedDateObj.getTime())) {
                        currentDate = savedDateObj;
                    }
                }
            } catch (e) {
                // Ignore parse error
            }
        }
        
        function renderCalendar() {
            const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            
            const firstDayIndex = firstDay.getDay();
            const lastDayIndex = lastDay.getDay();
            const nextDays = 7 - lastDayIndex - 1;
            
            const monthYear = `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate)} ${currentDate.getFullYear()}`;
            currentMonthEl.textContent = monthYear;
            
            daysGrid.innerHTML = '';
            
            // Previous month days
            for (let i = firstDayIndex; i > 0; i--) {
                const day = document.createElement('div');
                day.classList.add('day', 'disabled');
                day.textContent = prevLastDay.getDate() - i + 1;
                daysGrid.appendChild(day);
            }
            
            // Current month days
            for (let i = 1; i <= lastDay.getDate(); i++) {
                const day = document.createElement('div');
                day.classList.add('day');
                day.textContent = i;
                
                // Check if this day is selected
                const savedDate = localStorage.getItem('selectedDate');
                if (savedDate) {
                    try {
                        const parsedDate = JSON.parse(savedDate);
                        const dayNumber = parsedDate.day;
                        const savedMonthYear = parsedDate.monthYear;
                        
                        if (i === dayNumber && savedMonthYear === monthYear) {
                            day.classList.add('selected');
                        }
                    } catch (e) {
                        // Ignore parse error
                    }
                }
                
                day.addEventListener('click', function() {
                    document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    // Save selected date to localStorage
                    const selectedDate = {
                        day: parseInt(this.textContent),
                        monthYear: currentMonthEl.textContent,
                        dateString: new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(this.textContent)).toISOString()
                    };
                    localStorage.setItem('selectedDate', JSON.stringify(selectedDate));
                });
                
                daysGrid.appendChild(day);
            }
            
            // Next month days
            for (let i = 1; i <= nextDays; i++) {
                const day = document.createElement('div');
                day.classList.add('day', 'disabled');
                day.textContent = i;
                daysGrid.appendChild(day);
            }
        }
        
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        
        renderCalendar();
    }

    // ======================
    // Time Slots Selection
    // ======================
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            timeSlots.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
            localStorage.setItem('selectedTime', this.textContent.trim());
        });
    });

    // ======================
    // Load Saved Data
    // ======================
    function loadSavedData() {
        // Load selected staff
        const savedStaff = localStorage.getItem('selectedStaff');
        if (savedStaff) {
            try {
                const staffData = JSON.parse(savedStaff);
                staffCards.forEach(card => {
                    if (card.dataset.staff === staffData.name) {
                        card.classList.add('selected');
                    }
                });
            } catch (e) {
                // Ignore parse error
            }
        }
        
        // Load selected time
        const savedTime = localStorage.getItem('selectedTime');
        if (savedTime) {
            timeSlots.forEach(slot => {
                if (slot.textContent.trim() === savedTime) {
                    slot.classList.add('selected');
                }
            });
        }
    }

    // Initialize date picker and load saved data
    initializeDatePicker();
    loadSavedData();

    // ======================
    // Navigation Functions
    // ======================
    window.nextStep = function(currentStep) {
        document.getElementById(`step${currentStep}`).classList.add('hidden');
        document.getElementById(`step${currentStep + 1}`).classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.confirmBooking = function() {
        // Get selected staff
        const selectedStaff = document.querySelector('.staff-card.selected');
        if (!selectedStaff) {
            alert('Please select a stylist first!');
            document.getElementById('step1').classList.remove('hidden');
            document.getElementById('step3').classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Get selected date
        const selectedDate = document.querySelector('.day.selected');
        if (!selectedDate) {
            alert('Please select a date first!');
            document.getElementById('step2').classList.remove('hidden');
            document.getElementById('step3').classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // Get selected time
        const selectedTime = document.querySelector('.time-slot.selected');
        if (!selectedTime) {
            alert('Please select a time slot first!');
            return;
        }

        // Get staff details
        const staffName = selectedStaff.dataset.staff;
        const staffInfo = selectedStaff.querySelector('.staff-info h4').textContent;
        
        // Get date details
        const monthYear = document.querySelector('.current-month').textContent;
        const day = selectedDate.textContent;
        const formattedDate = `${day} ${monthYear}`;
        
        // Get time
        const time = selectedTime.textContent.trim();

        // Build URL parameters
        const params = new URLSearchParams({
            staff: staffInfo,
            date: formattedDate,
            time: time
        });

        // Redirect to confirmation page with parameters
        window.location.href = `booking-confirm.html?${params.toString()}`;
    };

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
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Update copyright year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = '';
            }
        });
    });
});