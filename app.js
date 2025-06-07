// Portfolio Website JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Enhanced smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20; // Added extra offset
                
                // Use smooth scrolling with better timing
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for hero buttons
    const heroButtons = document.querySelectorAll('.hero__buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });

    // Contact Form Handling with enhanced validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            // Enhanced validation with specific error messages
            const validation = validateFormWithMessages(formData);
            if (validation.isValid) {
                // Show success message
                showMessage('Thank you for your message! I will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            } else {
                showMessage(validation.message, 'error');
            }
        });
    }

    // Enhanced form validation function with specific messages
    function validateFormWithMessages(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name || data.name.length < 2) {
            return { isValid: false, message: 'Please enter a valid name (at least 2 characters).' };
        }
        
        if (!emailRegex.test(data.email)) {
            return { isValid: false, message: 'Please enter a valid email address.' };
        }
        
        if (!data.subject || data.subject.length < 3) {
            return { isValid: false, message: 'Please enter a subject (at least 3 characters).' };
        }
        
        if (!data.message || data.message.length < 10) {
            return { isValid: false, message: 'Please enter a message (at least 10 characters).' };
        }
        
        return { isValid: true, message: '' };
    }

    // Original validation function for backward compatibility
    function validateForm(data) {
        const validation = validateFormWithMessages(data);
        return validation.isValid;
    }

    // Enhanced message display function
    function showMessage(text, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message status status--${type}`;
        messageEl.textContent = text;
        messageEl.style.marginTop = '16px';
        messageEl.style.padding = '12px 16px';
        messageEl.style.borderRadius = '8px';
        messageEl.style.fontSize = '14px';
        messageEl.style.textAlign = 'center';
        messageEl.style.animation = 'fadeInUp 0.3s ease-out';

        // Insert message after form
        contactForm.parentNode.insertBefore(messageEl, contactForm.nextSibling);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    if (messageEl.parentNode) {
                        messageEl.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                // Add staggered animation delay for multiple elements
                const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .timeline__item, .skill__item, .contact__item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Add styles for active nav link and animations
    const style = document.createElement('style');
    style.textContent = `
        .nav__link.active {
            color: var(--color-primary);
        }
        .nav__link.active::after {
            width: 100%;
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);

    // Update active nav link on scroll with throttling
    function throttledUpdateActiveNavLink() {
        requestAnimationFrame(updateActiveNavLink);
    }

    window.addEventListener('scroll', throttledUpdateActiveNavLink);
    
    // Initial call to set active nav link
    updateActiveNavLink();

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--color-primary)';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Button click animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });

    // Add ripple effect styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            overflow: hidden;
            position: relative;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 600ms linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Enhanced lazy loading for better performance
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    // Process lazy loading here if needed
                    lazyObserver.unobserve(element);
                }
            });
        }, { threshold: 0.1 });

        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    }

    // Dark mode preference detection and handling
    function checkDarkMode() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            // Update header background for dark mode
            if (window.scrollY > 50) {
                header.style.background = 'rgba(38, 40, 40, 0.98)';
            } else {
                header.style.background = 'rgba(38, 40, 40, 0.95)';
            }
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
            // Update header background for light mode
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    }

    // Initial dark mode check
    checkDarkMode();

    // Listen for changes in color scheme preference
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkDarkMode);
    }

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Form input validation feedback
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear any error state when user starts typing
            this.classList.remove('error');
            const errorMsg = this.parentNode.querySelector('.field-error');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });

    function validateSingleField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'text':
                if (field.id === 'name' && value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                } else if (field.id === 'subject' && value.length < 3) {
                    isValid = false;
                    errorMessage = 'Subject must be at least 3 characters long';
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            default:
                if (field.tagName === 'TEXTAREA' && value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                }
        }

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error styling and message if invalid
        if (!isValid && value.length > 0) {
            field.classList.add('error');
            const errorEl = document.createElement('div');
            errorEl.className = 'field-error';
            errorEl.textContent = errorMessage;
            errorEl.style.color = 'var(--color-error)';
            errorEl.style.fontSize = 'var(--font-size-sm)';
            errorEl.style.marginTop = 'var(--space-4)';
            field.parentNode.appendChild(errorEl);
        } else {
            field.classList.remove('error');
        }
    }

    console.log('Portfolio website loaded successfully!');
});