// Advanced Portfolio JavaScript - Enhanced Interactive Features
class AdvancedPortfolioApp {
    constructor() {
        this.particles = [];
        this.cursorTrail = [];
        this.isTypingComplete = false;
        this.profileMessageTimeout = null;
        this.init();
    }

    init() {
        this.setupCustomCursor();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupParticleSystem();
        this.setupLazyLoading();
        this.setupScrollAnimations();
        this.setupMagneticButtons();
        this.setupTypingEffect();
        this.setupProfileHoverMessage();
        this.setupParallaxEffects();
        this.setupAdvancedInteractions();
    }

    // Enhanced Custom Cursor System
    setupCustomCursor() {
        const dot = document.querySelector('.cursor-dot');
        const ring = document.querySelector('.cursor-ring');
        
        if (!dot || !ring) return;

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;

        // Mouse movement tracking
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor animation
        const animateCursor = () => {
            // Dot follows mouse exactly
            dotX = mouseX;
            dotY = mouseY;
            
            // Ring follows with smooth delay
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
            ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag, .nav-link');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            document.body.classList.add('cursor-click');
        });

        document.addEventListener('mouseup', () => {
            document.body.classList.remove('cursor-click');
        });
    }

    // Simple Typing Effect for Main Greeting
    setupTypingEffect() {
        const greetingElement = document.getElementById('typingGreeting');
        
        if (!greetingElement) return;

        const fullText = "Hi, I'm Raju Ansary";
        greetingElement.textContent = ''; // Clear existing text
        let currentIndex = 0;

        const typeCharacter = () => {
            if (currentIndex < fullText.length) {
                greetingElement.textContent += fullText[currentIndex];
                currentIndex++;
                setTimeout(typeCharacter, 100); // Typing speed
            } else {
                this.isTypingComplete = true;
            }
        };

        // Start typing after a short delay
        setTimeout(typeCharacter, 1000);
    }

    // Profile Hover Message
    setupProfileHoverMessage() {
        const profileContainer = document.querySelector('.profile-container');
        const profileMessage = document.getElementById('profileMessage');
        
        if (!profileContainer || !profileMessage) return;

        const message = "Hey, it's so nice to see you here!";
        let isMessageVisible = false;
        let typingTimeout = null;

        const typeMessage = () => {
            profileMessage.innerHTML = '';
            let index = 0;

            const typeChar = () => {
                if (index < message.length) {
                    const char = message[index];
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.className = 'profile-message-char';
                    span.style.animationDelay = '0s';
                    
                    profileMessage.appendChild(span);
                    index++;
                    
                    typingTimeout = setTimeout(typeChar, 50);
                }
            };

            typeChar();
        };

        profileContainer.addEventListener('mouseenter', () => {
            if (!isMessageVisible) {
                isMessageVisible = true;
                profileMessage.classList.add('show');
                typeMessage();
            }
        });

        profileContainer.addEventListener('mouseleave', () => {
            if (isMessageVisible) {
                isMessageVisible = false;
                profileMessage.classList.remove('show');
                if (typingTimeout) {
                    clearTimeout(typingTimeout);
                }
                
                // Clear message after animation
                setTimeout(() => {
                    profileMessage.innerHTML = '';
                }, 300);
            }
        });
    }

    // Enhanced smooth scrolling with easing
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target, 100);
                }
            });
        });
    }

    smoothScrollTo(element, offset = 100) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        const startPosition = window.pageYOffset;
        const distance = offsetPosition - startPosition;
        const duration = 1000;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    // Active navigation highlighting
    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    
                    navLinks.forEach(link => {
                        link.classList.remove('nav-active');
                        if (link.getAttribute('href') === `#${activeId}`) {
                            link.classList.add('nav-active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // Particles.js configuration
    setupParticleSystem() {
        // Initialize particles.js
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 45,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#3b82f6"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#3b82f6",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });

        // Update particle count display
        const updateParticleCount = () => {
            const countElement = document.querySelector('.js-count-particles');
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
                countElement.innerText = window.pJSDom[0].pJS.particles.array.length;
            }
            requestAnimationFrame(updateParticleCount);
        };
        
        // Start the particle count update
        setTimeout(updateParticleCount, 1000);

        // Update particle colors based on theme
        this.updateParticleTheme();
    }

    // Update particle colors for dark/light mode
    updateParticleTheme() {
        setTimeout(() => {
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                const isDark = document.documentElement.classList.contains('dark');
                const particleColor = isDark ? "#60a5fa" : "#3b82f6";
                
                // Update particle colors
                window.pJSDom[0].pJS.particles.color.value = particleColor;
                window.pJSDom[0].pJS.particles.line_linked.color = particleColor;
                
                // Refresh particles
                if (window.pJSDom[0].pJS.fn.particlesRefresh) {
                    window.pJSDom[0].pJS.fn.particlesRefresh();
                }
            }
        }, 500);
    }

    // Lazy loading for images
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading-skeleton');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.classList.add('loading-skeleton');
            imageObserver.observe(img);
        });
    }

    // Enhanced scroll animations
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .stagger-item');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 100);
                    animationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    // Magnetic button effects
    setupMagneticButtons() {
        const magneticButtons = document.querySelectorAll('.magnetic-btn');
        
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Parallax effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Advanced interactions
    setupAdvancedInteractions() {
        // Project card tilt effect
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });

        // Skill tag hover effects
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'scale(1.1) translateY(-2px)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'scale(1) translateY(0)';
            });
        });
    }
}

// Alpine.js data functions
function portfolioApp() {
    return {
        darkMode: localStorage.getItem('darkMode') === 'true' || 
                 (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches),
        activeSection: 'home',
        
        init() {
            this.updateDarkMode();
            // Initialize advanced portfolio app and make it globally accessible
            window.portfolioApp = new AdvancedPortfolioApp();
        },
        
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            this.updateDarkMode();
            
            // Update particle colors when theme changes
            if (window.portfolioApp) {
                window.portfolioApp.updateParticleTheme();
            }
        },
        
        updateDarkMode() {
            if (this.darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            localStorage.setItem('darkMode', this.darkMode);
        }
    }
}

function contactForm() {
    return {
        form: {
            name: '',
            email: '',
            message: ''
        },
        isSubmitting: false,
        showSuccess: false,
        
        async submitForm() {
            this.isSubmitting = true;
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.isSubmitting = false;
            this.showSuccess = true;
            
            // Reset form
            this.form = { name: '', email: '', message: '' };
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                this.showSuccess = false;
            }, 5000);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Additional initialization if needed
    console.log('Advanced Portfolio Loaded Successfully! 🚀');
});