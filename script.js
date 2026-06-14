



// --- THEME SWITCHER ---
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// --- NAVBAR BACKGROUND BLUR & SHADOW ON SCROLL ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- SCROLL REVEAL ANIMATION (Intersection Observer) ---
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

reveals.forEach(el => revealObserver.observe(el));



// --- DUMMY FORM SUBMISSION ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! Kavitha will get back to you shortly.');
        contactForm.reset();
    });
}

// --- MOBILE MENU TOGGLE ---
const menuToggle = document.querySelector('.menu-toggle');
const navRight = document.querySelector('.nav-right');

if (menuToggle && navRight) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navRight.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = navRight.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when a link is clicked
    const navLinks = navRight.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navRight.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}
