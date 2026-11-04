document.addEventListener('DOMContentLoaded', () => {
    /* =====================================================
       MOBILE NAVIGATION MENU
    ===================================================== */
    const menuButton = document.getElementById('menuButton');
    const navLinks = document.getElementById('navLinks');
    const navItems = navLinks ? navLinks.querySelectorAll('a') : [];
    const menuIcon = menuButton ? menuButton.querySelector('i') : null;

    if (menuButton && navLinks) {
        // Set initial ARIA state for accessibility
        menuButton.setAttribute('aria-expanded', 'false');

        // Helper function to close navigation menu
        function closeMenu() {
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                menuButton.setAttribute('aria-expanded', 'false');
                if (menuIcon) {
                    menuIcon.classList.remove('fa-xmark');
                    menuIcon.classList.add('fa-bars');
                }
            }
        }

            // Helper function to toggle navigation menu
            function toggleMenu() {
                const isOpen = navLinks.classList.toggle('show');
                menuButton.setAttribute('aria-expanded', String(isOpen));

                if (menuIcon) {
                    if (isOpen) {
                        menuIcon.classList.remove('fa-bars');
                        menuIcon.classList.add('fa-xmark');
                    } else {
                        menuIcon.classList.remove('fa-xmark');
                        menuIcon.classList.add('fa-bars');
                    }
                }
            }

            // Toggle menu on hamburger button click
            menuButton.addEventListener('click', (event) => {
                event.stopPropagation();
                toggleMenu();
            });

            // Close menu when any navigation link is clicked
            navItems.forEach((link) => {
                link.addEventListener('click', () => {
                    closeMenu();
                });
            });

            // Close menu when clicking outside of the navbar on mobile
            document.addEventListener('click', (event) => {
                if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
                    closeMenu();
                }
            });

            // Close menu if window is resized above mobile breakpoint (768px)
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    closeMenu();
                }
            });
        }


        /* =====================================================
           ADMISSION ENQUIRY FORM
        ===================================================== */
        const admissionForm = document.getElementById('admissionForm');
        const enquirySuccess = document.getElementById('enquirySuccess');
        const successDetails = document.getElementById('successDetails');
        const submitAnotherBtn = document.getElementById('submitAnotherBtn');

        if (admissionForm) {
            const studentNameInput = document.getElementById('studentName');
            const parentNameInput = document.getElementById('parentName');
            const phoneInput = document.getElementById('phoneNumber');
            const classSelect = document.getElementById('admissionClass');
            const messageInput = document.getElementById('enquiryMessage');

            const groupStudentName = document.getElementById('groupStudentName');
            const groupParentName = document.getElementById('groupParentName');
            const groupPhone = document.getElementById('groupPhone');
            const groupClass = document.getElementById('groupClass');

            const studentNameError = document.getElementById('studentNameError');
            const parentNameError = document.getElementById('parentNameError');
            const phoneError = document.getElementById('phoneError');
            const classError = document.getElementById('classError');

            // Validation helper functions
            function validateStudentName(value) {
                const trimmed = (value || '').trim();
                if (!trimmed) {
                    return { isValid: false, message: 'Student full name is required.' };
                }
                if (trimmed.length < 2) {
                    return { isValid: false, message: 'Student name must be at least 2 characters.' };
                }
                if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
                    return { isValid: false, message: 'Student name can only contain letters and spaces.' };
                }
                return { isValid: true, value: trimmed };
            }

                function validateParentName(value) {
                    const trimmed = (value || '').trim();
                    if (!trimmed) {
                        return { isValid: false, message: 'Parent or guardian name is required.' };
                    }
                    if (trimmed.length < 2) {
                        return { isValid: false, message: 'Parent name must be at least 2 characters.' };
                    }
                    if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
                        return { isValid: false, message: 'Parent name can only contain letters and spaces.' };
                    }
                    return { isValid: true, value: trimmed };
                }

                function validatePhone(value) {
                    const raw = (value || '').trim();
                    if (!raw) {
                        return { isValid: false, message: 'Phone number is required.' };
                    }

                    // Strip spaces, hyphens, dots, parentheses
                    let digits = raw.replace(/[\s\-\(\)\.]/g, '');

                    // Support optional country prefix (+91, 91, or leading 0)
                    if (digits.startsWith('+91')) {
                        digits = digits.slice(3);
                    } else if (digits.startsWith('91') && digits.length === 12) {
                        digits = digits.slice(2);
                    } else if (digits.startsWith('0') && digits.length === 11) {
                        digits = digits.slice(1);
                    }

                    // Must be purely digits
                    if (!/^\d+$/.test(digits)) {
                        return { isValid: false, message: 'Phone number should only contain numbers.' };
                    }

                    // Must be exactly 10 digits
                    if (digits.length !== 10) {
                        return { isValid: false, message: 'Please enter a valid 10-digit mobile number.' };
                    }

                    // Standard Indian mobile number prefix (6, 7, 8, 9)
                    if (!/^[6-9]/.test(digits)) {
                        return { isValid: false, message: 'Mobile number must start with 6, 7, 8, or 9.' };
                    }

                    return { isValid: true, value: digits, formatted: `+91 ${digits.slice(0, 5)} ${digits.slice(5)}` };
                }

                function validateClass(value) {
                    const trimmed = (value || '').trim();
                    if (!trimmed) {
                        return { isValid: false, message: 'Please select a class for admission.' };
                    }
                    return { isValid: true, value: trimmed };
                }

                function setFieldError(groupEl, errorEl, message) {
                    if (groupEl) groupEl.classList.add('has-error');
                    if (errorEl) errorEl.textContent = message;
                }

                function clearFieldError(groupEl, errorEl) {
                    if (groupEl) groupEl.classList.remove('has-error');
                    if (errorEl) errorEl.textContent = '';
                }

                // Real-time error clearing as user types
                if (studentNameInput) {
                    studentNameInput.addEventListener('input', () => {
                        if (groupStudentName && groupStudentName.classList.contains('has-error')) {
                            const res = validateStudentName(studentNameInput.value);
                            if (res.isValid) {
                                clearFieldError(groupStudentName, studentNameError);
                            }
                        }
                    });
                }

                    if (parentNameInput) {
                        parentNameInput.addEventListener('input', () => {
                            if (groupParentName && groupParentName.classList.contains('has-error')) {
                                const res = validateParentName(parentNameInput.value);
                                if (res.isValid) {
                                    clearFieldError(groupParentName, parentNameError);
                                }
                            }
                        });
                    }

                        if (phoneInput) {
                            phoneInput.addEventListener('input', () => {
                                if (groupPhone && groupPhone.classList.contains('has-error')) {
                                    const res = validatePhone(phoneInput.value);
                                    if (res.isValid) {
                                        clearFieldError(groupPhone, phoneError);
                                    }
                                }
                            });
                        }

                        if (classSelect) {
                            classSelect.addEventListener('change', () => {
                                if (groupClass && groupClass.classList.contains('has-error')) {
                                    const res = validateClass(classSelect.value);
                                    if (res.isValid) {
                                        clearFieldError(groupClass, classError);
                                    }
                                }
                            });
                        }

                        // Form submission handler
                        admissionForm.addEventListener('submit', (event) => {
                            event.preventDefault();

                            const studentVal = validateStudentName(studentNameInput ? studentNameInput.value : '');
                            const parentVal = validateParentName(parentNameInput ? parentNameInput.value : '');
                            const phoneVal = validatePhone(phoneInput ? phoneInput.value : '');
                            const classVal = validateClass(classSelect ? classSelect.value : '');

                            let firstInvalidField = null;

                            // Validate Student Name
                            if (!studentVal.isValid) {
                                setFieldError(groupStudentName, studentNameError, studentVal.message);
                                if (!firstInvalidField) firstInvalidField = studentNameInput;
                            } else {
                                clearFieldError(groupStudentName, studentNameError);
                            }

            // Validate Parent Name
            if (!parentVal.isValid) {
                            setFieldError(groupParentName, parentNameError, parentVal.message);
                            if (!firstInvalidField) firstInvalidField = parentNameInput;
                        } else {
                            clearFieldError(groupParentName, parentNameError);
                        }

                        // Validate Phone Number
                        if (!phoneVal.isValid) {
                            setFieldError(groupPhone, phoneError, phoneVal.message);
                            if (!firstInvalidField) firstInvalidField = phoneInput;
                        } else {
                            clearFieldError(groupPhone, phoneError);
                        }

                        // Validate Class
                        if (!classVal.isValid) {
                            setFieldError(groupClass, classError, classVal.message);
                            if (!firstInvalidField) firstInvalidField = classSelect;
                        } else {
                            clearFieldError(groupClass, classError);
                        }

                        // If any validation failed, focus first invalid input and abort
                        if (firstInvalidField) {
                            firstInvalidField.focus();
                            return;
                        }

                        // Collect submitted data
                        const submittedData = {
                            studentName: studentVal.value,
                            parentName: parentVal.value,
                            phoneNumber: phoneVal.value,
                            classApplyingFor: classVal.value,
                            message: (messageInput && messageInput.value.trim()) || 'None',
                            submittedAt: new Date().toISOString()
                        };

                        // Note: Client-side demonstration log (no backend DB claimed)
                        console.log('Admission Enquiry Submitted:', submittedData);

                        // Update success confirmation message
                        if (successDetails) {
                            successDetails.textContent = `Thank you, ${parentVal.value}! We have successfully received your admission enquiry for ${studentVal.value} seeking admission to ${classVal.value}. Our admissions office will contact you at ${phoneVal.formatted} shortly.`;
                        }

                        // Hide form and show success message
                        admissionForm.style.display = 'none';
                        if (enquirySuccess) {
                            enquirySuccess.style.display = 'flex';
                        }

                            // Smoothly scroll to the admissions section
                            const admissionsSection = document.getElementById('admissions');
                            if (admissionsSection) {
                                admissionsSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        });

                        // Reset and submit another enquiry
                        if (submitAnotherBtn) {
                            submitAnotherBtn.addEventListener('click', () => {
                                admissionForm.reset();

                                // Clear any lingering error styles
                                clearFieldError(groupStudentName, studentNameError);
                                clearFieldError(groupParentName, parentNameError);
                                clearFieldError(groupPhone, phoneError);
                                clearFieldError(groupClass, classError);

                                if (enquirySuccess) {
                                    enquirySuccess.style.display = 'none';
                                }
                                admissionForm.style.display = 'block';

                                if (studentNameInput) {
                                    studentNameInput.focus();
                                }
                            });
                        }
                    }


                    /* =====================================================
                       PHOTO GALLERY LIGHTBOX
                    ===================================================== */
                    const lightbox = document.getElementById('galleryLightbox');
                    const lightboxImage = document.getElementById('lightboxImage');
                    const lightboxCaption = document.getElementById('lightboxCaption');
                    const lightboxCounter = document.getElementById('lightboxCounter');
                    const lightboxClose = document.getElementById('lightboxClose');
                    const lightboxPrev = document.getElementById('lightboxPrev');
                    const lightboxNext = document.getElementById('lightboxNext');
                    const lightboxContainer = document.getElementById('lightboxContainer');

                    const galleryCards = Array.from(document.querySelectorAll('.gallery-grid .gallery-card'));

                    if (lightbox && lightboxImage && galleryCards.length > 0) {
                        // Collect image metadata from gallery cards
                        const galleryData = galleryCards.map((card) => {
                            const img = card.querySelector('img');
                            const captionSpan = card.querySelector('.gallery-card-caption span');
                            return {
                                src: img ? img.getAttribute('src') : '',
                                alt: img ? (img.getAttribute('alt') || 'School Gallery Photo') : 'School Gallery Photo',
                                caption: captionSpan ? captionSpan.textContent.trim() : (img ? img.getAttribute('alt') : 'A.S. Model Public School')
                            };
                        });

                        let currentImageIndex = 0;
                        let isTransitioning = false;

                        // Render image in lightbox with transition
                        function renderLightboxImage(index, animate = false) {
                            if (index < 0 || index >= galleryData.length) return;
                            currentImageIndex = index;
                            const item = galleryData[currentImageIndex];

                            if (animate) {
                                isTransitioning = true;
                                lightboxImage.classList.add('fade-out');
                                setTimeout(() => {
                                    lightboxImage.src = item.src;
                                    lightboxImage.alt = item.alt;
                                    if (lightboxCaption) lightboxCaption.textContent = item.caption;
                                    if (lightboxCounter) lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryData.length}`;
                                    lightboxImage.classList.remove('fade-out');
                                    isTransitioning = false;
                                }, 160);
                            } else {
                                lightboxImage.src = item.src;
                                lightboxImage.alt = item.alt;
                                if (lightboxCaption) lightboxCaption.textContent = item.caption;
                                if (lightboxCounter) lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryData.length}`;
                                lightboxImage.classList.remove('fade-out');
                            }
                        }

// Open Lightbox
function openLightbox(index) {
    renderLightboxImage(index, false);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    document.body.style.overflow = 'hidden';

            if (lightboxClose) {
                lightboxClose.focus();
            }
        }

        // Close Lightbox
        function closeLightbox() {
            if (!lightbox.classList.contains('active')) return;
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('lightbox-open');
            document.body.style.overflow = '';
        }

        // Navigate to Next Image
        function nextImage() {
            if (isTransitioning || galleryData.length <= 1) return;
            const nextIndex = (currentImageIndex + 1) % galleryData.length;
            renderLightboxImage(nextIndex, true);
        }

// Navigate to Previous Image
function prevImage() {
    if (isTransitioning || galleryData.length <= 1) return;
    const prevIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    renderLightboxImage(prevIndex, true);
}

// Attach click & keyboard listeners to each gallery card
galleryCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        openLightbox(index);
    });

    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openLightbox(index);
        }
    });
});

// Close button click
if (lightboxClose) {
    lightboxClose.addEventListener('click', (event) => {
        event.stopPropagation();
        closeLightbox();
    });
}

// Previous button click
if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (event) => {
        event.stopPropagation();
        prevImage();
    });
}

// Next button click
if (lightboxNext) {
    lightboxNext.addEventListener('click', (event) => {
        event.stopPropagation();
        nextImage();
    });
}

// Click outside the image to close
lightbox.addEventListener('click', (event) => {
    if (
        event.target === lightbox ||
        event.target === lightboxContainer
    ) {
        closeLightbox();
    }
});

// Keyboard navigation (Escape, Left Arrow, Right Arrow)
document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('active')) return;

    if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
    } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        nextImage();
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prevImage();
    }
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchStartY = 0;

lightbox.addEventListener('touchstart', (event) => {
    if (event.touches && event.touches.length > 0) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }
}, { passive: true });

lightbox.addEventListener('touchend', (event) => {
    if (!lightbox.classList.contains('active')) return;
    if (event.changedTouches && event.changedTouches.length > 0) {
        const diffX = event.changedTouches[0].clientX - touchStartX;
        const diffY = event.changedTouches[0].clientY - touchStartY;

        // Check for horizontal swipe gesture with minimum distance threshold
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX < 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    }
}, { passive: true });
    }
});
