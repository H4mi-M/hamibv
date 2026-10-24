// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Scroll Header Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        // Ignore bare "#" placeholder links (querySelector('#') would throw)
        if (targetId.length <= 1) return;

        e.preventDefault();

        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }

        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax Scrolling Effect
// Hero backgrounds stay fixed (CSS background-attachment); hero content
// drifts down at a slower rate and fades as the page scrolls past it.
const parallaxContent = document.querySelector(
    '.hero .container, .about-hero .container, .services-hero .container'
);

if (parallaxContent && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let parallaxTicking = false;

    const updateParallax = () => {
        const scrolled = window.scrollY;
        parallaxContent.style.transform = `translateY(${scrolled * 0.35}px)`;
        parallaxContent.style.opacity = Math.max(1 - scrolled / 600, 0);
        parallaxTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!parallaxTicking) {
            parallaxTicking = true;
            requestAnimationFrame(updateParallax);
        }
    }, { passive: true });

    updateParallax();
}

// Initialize Animation on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });
});