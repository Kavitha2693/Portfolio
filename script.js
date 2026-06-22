// --- THEME INITIALIZATION ---
document.documentElement.setAttribute('data-theme', 'light');

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
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.02,
    rootMargin: "0px"
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

// --- CUSTOM CURSOR INTERACTIVE LOGIC ---
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.custom-cursor-follower');

let mouseX = 0, mouseY = 0; // Actual mouse position
let cursorX = 0, cursorY = 0; // Inner cursor position
let followerX = 0, followerY = 0; // Follower cursor position

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Move inner cursor instantly
    if (cursor) {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    }
});

// Animate follower cursor with smooth interpolation
function animateFollower() {
    // Lerp (Linear Interpolation) formula
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    
    if (follower) {
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
    }
    
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor Hover effects
const interactiveElements = document.querySelectorAll('a, button, .interactive, input, textarea, [role="button"]');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
    });
});

// Card hover view badge
const workCards = document.querySelectorAll('.work-card');
workCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-card-hover');
    });
    card.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-card-hover');
    });
});


// --- 3D PARALLAX CARD TILT & SPOTLIGHT GLOW ---
const tiltCards = document.querySelectorAll('.work-card, .sub-box, .service-card, .hero-ux-info-item, .persona-card, .opportunity-callout');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within element
        const y = e.clientY - rect.top;  // y position within element
        
        // Spotlight glow effect
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        // Parallax rotation calculations
        const width = rect.width;
        const height = rect.height;
        const centerX = rect.left + width / 2;
        const centerY = rect.top + height / 2;
        const mouseXOffset = e.clientX - centerX;
        const mouseYOffset = e.clientY - centerY;
        
        // Calculate rotation degrees (cap at max 8 degrees)
        const rotateX = -((mouseYOffset / height) * 12).toFixed(2);
        const rotateY = ((mouseXOffset / width) * 12).toFixed(2);
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'none'; // Instant transition for smooth tilt tracking
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
});


// --- INTERACTIVE BACKGROUND MESH CANVAS ANIMATION ---
const canvas = document.getElementById('mesh-canvas');
let ctx = null;
let blobs = [];
let colorPalette = [];

function initCanvasColors() {
    colorPalette = [
        'rgba(196, 181, 253, 0.4)', // Light Purple
        'rgba(191, 219, 254, 0.35)', // Light Blue
        'rgba(252, 189, 221, 0.3)'   // Light Pink
    ];
}

if (canvas) {
    ctx = canvas.getContext('2d');
    initCanvasColors();
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create animated color blobs
    blobs = [
        { x: canvas.width * 0.25, y: canvas.height * 0.25, vx: 0.35, vy: 0.25, baseRadius: Math.min(canvas.width, canvas.height) * 0.45 },
        { x: canvas.width * 0.75, y: canvas.height * 0.65, vx: -0.25, vy: -0.3, baseRadius: Math.min(canvas.width, canvas.height) * 0.5 },
        { x: canvas.width * 0.5, y: canvas.height * 0.5, vx: 0.15, vy: -0.2, baseRadius: Math.min(canvas.width, canvas.height) * 0.4 }
    ];
    
    function drawMesh() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw blobs
        blobs.forEach((blob, index) => {
            // Smooth movement
            blob.x += blob.vx;
            blob.y += blob.vy;
            
            // Bounce off edges
            if (blob.x < -blob.baseRadius * 0.2 || blob.x > canvas.width + blob.baseRadius * 0.2) blob.vx *= -1;
            if (blob.y < -blob.baseRadius * 0.2 || blob.y > canvas.height + blob.baseRadius * 0.2) blob.vy *= -1;
            
            // Mouse gravity attraction (subtle pull towards mouse)
            const dx = mouseX - blob.x;
            const dy = mouseY - blob.y;
            blob.x += dx * 0.002;
            blob.y += dy * 0.002;
            
            // Blob pulsing scale
            const scale = 1 + Math.sin(Date.now() * 0.0008 + index) * 0.05;
            const radius = blob.baseRadius * scale;
            
            // Gradient fill
            const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, radius);
            grad.addColorStop(0, colorPalette[index % colorPalette.length]);
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(blob.x, blob.y, radius, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(drawMesh);
    }
    
    drawMesh();
}
