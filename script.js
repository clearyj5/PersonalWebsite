// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'var(--nav-background)';
    }
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle hamburger animation
    hamburger.classList.toggle('open');
    
    // Toggle menu
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('active');
    });
});

// Scroll indicator click handler
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
    });
});

// Enhanced scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate children elements
            if (entry.target.classList.contains('project-grid')) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    card.style.setProperty('--order', index);
                    card.classList.add('visible');
                });
            }
            
            if (entry.target.classList.contains('skills')) {
                const skills = entry.target.querySelectorAll('.skill');
                skills.forEach((skill, index) => {
                    skill.style.setProperty('--order', index);
                    skill.classList.add('visible');
                });
            }
        }
    });
}, observerOptions);

// Observe all sections and their animated children
document.querySelectorAll('section, .project-card, .skill, .projects-intro').forEach(element => {
    observer.observe(element);
});

// Hide scroll indicator when scrolling down
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        scrollIndicator.style.opacity = '0';
    } else if (currentScroll < 100) {
        scrollIndicator.style.opacity = '0.7';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

document.addEventListener('DOMContentLoaded', () => {
    // Initial load animations for hero section
    const heroElements = document.querySelectorAll('#home .hero-content > *');
    heroElements.forEach((el, index) => {
        el.classList.add('active');
        el.style.transitionDelay = `${index * 0.2}s`;
    });

    // Scroll animations for other sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Get all animatable elements in the section
            const elements = entry.target.querySelectorAll('.fade-up');
            
            if (entry.isIntersecting) {
                // Special handling for skills section with shorter delays
                if (entry.target.id === 'about') {
                    elements.forEach((el, index) => {
                        if (el.classList.contains('skill')) {
                            el.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
                        }
                    });
                }
                
                // Special handling for project cards
                if (entry.target.id === 'projects') {
                    elements.forEach((el, index) => {
                        if (el.classList.contains('project-card')) {
                            el.style.transitionDelay = `${0.2}s`; // All cards appear together
                        }
                    });
                }
                
                // Animate all elements
                elements.forEach(el => {
                    el.classList.add('active');
                });
            } else {
                // Fade out elements when scrolling away
                elements.forEach(el => {
                    el.style.transitionDelay = '0s';
                    el.classList.remove('active');
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-20% 0px'
    });

    // Observe all sections
    document.querySelectorAll('section:not(#home)').forEach(section => {
        observer.observe(section);
    });

    // Create separate observer for hero section
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const elements = entry.target.querySelectorAll('.hero-content > *');
            if (entry.isIntersecting) {
                elements.forEach((el, index) => {
                    el.style.transitionDelay = `${index * 0.2}s`;
                    el.classList.add('active');
                });
            } else {
                elements.forEach(el => {
                    el.style.transitionDelay = '0s';
                    el.classList.remove('active');
                });
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe hero section
    const heroSection = document.querySelector('#home');
    heroObserver.observe(heroSection);
}); 