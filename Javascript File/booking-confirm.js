/**
 * booking-confirm.js - Enhanced Booking Confirmation System
 * 
 * Features:
 * 1. Real-time booking expiration countdown
 * 2. Dynamic booking summary from URL params
 * 3. Form validation with instant feedback
 * 4. Session timeout handling
 * 5. Mobile menu functionality
 * 6. Booking confirmation with reference number
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. Mobile Menu Functionality
    // ======================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const header = document.getElementById('header');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
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
    // 2. Load Booking Data from URL
    // ======================
    function loadBookingDataFromUrl() {
        const params = new URLSearchParams(window.location.search);
        
        const staff = params.get('staff');
        const date = params.get('date');
        const time = params.get('time');
        
        console.log('Loading booking data:', { staff, date, time });
        
        // Update staff information
        if (staff) {
            const staffNameEl = document.querySelector('#confirm-staff h4');
            if (staffNameEl) {
                staffNameEl.textContent = staff;
            }
            
            // Update staff image based on name
            updateStaffImage(staff);
        }
        
        // Update date
        if (date) {
            const dateEl = document.getElementById('confirm-date');
            if (dateEl) {
                dateEl.textContent = date;
            }
        }
        
        // Update time
        if (time) {
            const timeEl = document.getElementById('confirm-time');
            if (timeEl) {
                timeEl.textContent = time;
            }
        }
    }

    function updateStaffImage(staffName) {
        const staffImage = document.querySelector('.staff-image');
        if (!staffImage) return;
        
        // Map staff names to images
        const staffImages = {
            'Sathika Ranathunga': 'images/Sathika.jpg',
            'Sanduni Savindi': 'images/sanduni.jpg',
            'Shetha Shashipraba': 'https://randomuser.me/api/portraits/women/33.jpg'
        };
        
        // Find matching staff image
        for (const [name, image] of Object.entries(staffImages)) {
            if (staffName.includes(name) || name.includes(staffName)) {
                staffImage.style.backgroundImage = `url('${image}')`;
                return;
            }
        }
        
        // Default image if no match
        staffImage.style.backgroundImage = "url('https://randomuser.me/api/portraits/women/33.jpg')";
    }

    // Load booking data on page load
    loadBookingDataFromUrl();

    // ======================
    // 3. Booking Configuration
    // ======================
    const config = {
        bookingExpiryMinutes: 15,
        warningMinutes: 2,
        autoRedirectDelay: 5000
    };

    // State
    let expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + config.bookingExpiryMinutes);
    let countdownInterval = null;
    let isFormSubmitting = false;

    // DOM Elements
    const countdownEl = document.getElementById('countdown');
    const contactForm = document.getElementById('booking-form');
    const confirmBtn = document.getElementById('request-appointment');
    const cancelBtn = document.getElementById('cancelBtn');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const termCheckboxes = document.querySelectorAll('.term-checkbox');
    const termsError = document.getElementById('termsError');

    // ======================
    // 4. Countdown Timer
    // ======================
    function updateCountdown() {
        const now = new Date();
        const diff = expiryTime - now;
        
        if (diff <= 0) {
            handleBookingExpired();
            return;
        }
        
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (countdownEl) {
            countdownEl.innerHTML = `
                <i class="far fa-clock"></i> 
                ${mins}m ${secs}s remaining
                ${mins <= config.warningMinutes ? 
                    '<span class="warning-text">(Hurry!)</span>' : ''}
            `;
        }
        
        if (mins === config.warningMinutes && secs === 0) {
            showSessionWarning();
        }
    }

    function handleBookingExpired() {
        clearInterval(countdownInterval);
        if (countdownEl) {
            countdownEl.innerHTML = '<span class="error-text">Booking expired!</span>';
        }
        disableForm();
    }

    function showSessionWarning() {
        const warning = document.createElement('div');
        warning.className = 'session-warning-overlay';
        warning.innerHTML = `
            <div class="session-warning">
                <h3><i class="fas fa-exclamation-triangle"></i> Time Almost Up!</h3>
                <p>Your booking will expire in ${config.warningMinutes} minutes.</p>
                <button class="warning-confirm">
                    Continue Booking
                </button>
            </div>
        `;
        
        document.body.appendChild(warning);
        
        warning.querySelector('.warning-confirm').addEventListener('click', () => {
            warning.remove();
        });
    }

    // Start countdown
    if (countdownEl) {
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    // ======================
    // 5. Form Handling
    // ======================
    
    // Initialize phone input
    const phoneInput = document.querySelector("#phone");
    if (phoneInput && typeof intlTelInput !== 'undefined') {
        window.intlTelInput(phoneInput, {
            initialCountry: "lk",
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
        });
    }

    // Real-time validation
    document.querySelectorAll('#booking-form input, #booking-form textarea').forEach(input => {
        input.addEventListener('input', () => validateField(input));
        input.addEventListener('blur', () => validateField(input));
    });

    function validateField(field) {
        field.classList.remove('error');
        
        if (field.required && !field.value.trim()) {
            field.classList.add('error');
            return false;
        }
        
        if (field.type === 'email' && field.value.trim() && !/^\S+@\S+\.\S+$/.test(field.value)) {
            field.classList.add('error');
            return false;
        }
        
        return true;
    }

    function areTermsAccepted() {
        return Array.from(termCheckboxes).every(checkbox => checkbox.checked);
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (isFormSubmitting) return;
            
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            let isValid = true;
            
            if (!name) {
                document.getElementById('name').classList.add('error');
                isValid = false;
            }
            
            if (!phone) {
                document.getElementById('phone').classList.add('error');
                isValid = false;
            }
            
            if (!areTermsAccepted()) {
                termsError.style.display = 'block';
                isValid = false;
            } else {
                termsError.style.display = 'none';
            }
            
            if (!isValid) {
                alert('Please fill in all required fields and accept the terms.');
                return;
            }
            
            submitBooking();
        });
    }

    function submitBooking() {
        isFormSubmitting = true;
        
        if (confirmBtn) {
            confirmBtn.disabled = true;
            confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        }
        
        // Get booking details from URL
        const params = new URLSearchParams(window.location.search);
        const bookingData = {
            staff: params.get('staff') || 'K.K.R Perera',
            date: params.get('date') || '15 November 2025',
            time: params.get('time') || '5:00 PM',
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Update confirmation message
        document.getElementById('final-date').textContent = bookingData.date;
        document.getElementById('final-time').textContent = bookingData.time;
        
        // Simulate API call
        setTimeout(() => {
            if (confirmationMessage) {
                confirmationMessage.classList.add('show');
            }
            
            confirmationMessage.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            if (confirmBtn) {
                confirmBtn.disabled = false;
                confirmBtn.innerHTML = '<span class="btn-text">Booking Confirmed!</span> <span class="btn-icon"><i class="fas fa-check"></i></span>';
            }
            
            sendWhatsAppMessages(bookingData);
            
            const bookingRef = generateBookingRef();
            showSuccessMessage(bookingRef);
            
            isFormSubmitting = false;
        }, 1500);
    }

    // Cancel button
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel this booking?')) {
                window.location.href = 'services.html';
            }
        });
    }

    // ======================
    // 6. WhatsApp Integration
    // ======================
    function sendWhatsAppMessages(bookingData) {
        const salonPhoneInput = document.getElementById('salon-phone');
        const salonPhone = salonPhoneInput ? salonPhoneInput.value.trim() : '+94762395034';
        
        const whatsappMessage = `*New Booking Confirmation - Salon Hadakari*%0A%0A` +
            `*Customer Name:* ${bookingData.name}%0A` +
            `*Appointment Date:* ${bookingData.date}%0A` +
            `*Appointment Time:* ${bookingData.time}%0A` +
            `*Stylist:* ${bookingData.staff}%0A` +
            `*Contact Number:* ${bookingData.phone}%0A` +
            `*Email:* ${bookingData.email || 'Not provided'}%0A` +
            `*Special Requests:* ${bookingData.message || 'None'}%0A%0A` +
            `Thank you for booking with Salon Hadakari!`;

        const cleanPhone = (phone) => phone.replace(/[^\d+]/g, '');
        const customerPhone = cleanPhone(bookingData.phone);
        const cleanSalonPhone = cleanPhone(salonPhone);

        window.open(`https://wa.me/${cleanSalonPhone}?text=${whatsappMessage}`, '_blank');
        
        setTimeout(() => {
            window.open(`https://wa.me/${customerPhone}?text=${whatsappMessage}`, '_blank');
        }, 500);
    }

    // ======================
    // 7. Utility Functions
    // ======================
    function generateBookingRef() {
        return 'BK-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }

    function disableForm() {
        document.querySelectorAll('#booking-form input, #booking-form textarea, #booking-form button').forEach(el => {
            el.disabled = true;
        });
    }

    function showSuccessMessage(bookingRef) {
        const successMsg = document.createElement('div');
        successMsg.className = 'booking-success';
        successMsg.innerHTML = `
            <p><i class="fas fa-check-circle" style="color: #4CAF50; font-size: 24px;"></i></p>
            <p>Booking confirmed!</p>
            <p><strong>Reference: ${bookingRef}</strong></p>
        `;
        
        if (confirmationMessage) {
            confirmationMessage.appendChild(successMsg);
        }
    }

    // ======================
    // 8. Term Checkbox Validation
    // ======================
    termCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (areTermsAccepted()) {
                termsError.style.display = 'none';
            }
        });
    });
});