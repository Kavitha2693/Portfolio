// --- DATA FOR CASE STUDIES ---
const projectData = {
    whatsapp_redesign: {
        title: "WhatsApp: Smart Media Controls & Advanced Sorting",
        tags: ["UX Redesign", "Interaction Design", "Product Optimization"],
        image: "",
        overview: "This design case study focuses on optimizing media handling and organization within WhatsApp. Users frequently face storage bottlenecks and data consumption from automatic downloads, while also struggling to locate specific files in dense chat histories. This combined redesign introduces two core features: <strong>Granular Media Auto-Downloads</strong> and <strong>Advanced Shared Media Sorting</strong>, resolving both pain points within a native-feeling experience.",
        challenge: "<strong>1. Granular Media Auto-Downloads:</strong> Relocating global settings to a chat-specific level without adding noise to active feeds or causing configuration fatigue.<br><br><strong>2. Advanced Shared Media Sorting:</strong> Incorporating sorting/filtering inside the default 'Media, Links, and Docs' tabs without breaking standardized UI patterns or slowing down quick access.",
        solution: `
            <div class="solution-feature">
                <h4>Feature 1: Granular Media Auto-Download Panel</h4>
                <p>Introduced a 'Media auto-download' toggle option in the chat's top-right options dropdown. Clicking this opens a clear popup dialog checklist (Photos, Audio, Videos, Documents) allowing immediate custom downloading preferences at the thread level.</p>
                <div class="whatsapp-solution-gallery">
                    <div class="gallery-phone"><img src="assets/WhatsApp_FirstPage.png" alt="WhatsApp Splash Page"><span class="phone-label">1. Splash Screen</span></div>
                    <div class="gallery-phone"><img src="assets/WhatsApp_Home_Page.png" alt="WhatsApp Home Page"><span class="phone-label">2. Home Screen</span></div>
                    <div class="gallery-phone"><img src="assets/Chat_Page.png" alt="Chat Page"><span class="phone-label">3. Chat Screen</span></div>
                    <div class="gallery-phone"><img src="assets/Chat_Page_Options.png" alt="Chat Options"><span class="phone-label">4. Options Menu</span></div>
                    <div class="gallery-phone"><img src="assets/Chat_Page_Options_MediaAutoDownload.png" alt="Media Auto-Download"><span class="phone-label">5. Settings Popup</span></div>
                </div>
            </div>
            <br><br>
            <div class="solution-feature">
                <h4>Feature 2: Advanced Media Sorting & Filtering</h4>
                <p>Added a floating action filter layout within the Shared Media tab, enabling users to instantly sort shared files by Date, File Size, File Format, or Sender. This drastically reduces the time spent searching through past conversations.</p>
                <div class="whatsapp-solution-gallery">
                    <div class="gallery-phone"><img src="assets/WhatsApp_FirstPage.png" alt="WhatsApp Splash Page"><span class="phone-label">1. Splash Screen</span></div>
                    <div class="gallery-phone"><img src="assets/WhatsApp_Home_Page.png" alt="WhatsApp Home Page"><span class="phone-label">2. Home Screen</span></div>
                    <div class="gallery-phone"><img src="assets/Chat_Page.png" alt="Chat Page"><span class="phone-label">3. Chat Screen</span></div>
                    <div class="gallery-phone"><img src="assets/Chat_Page_Options.png" alt="Chat Options"><span class="phone-label">4. Options Menu</span></div>
                    <div class="gallery-phone"><img src="assets/Media,Links,Docs_Page.png" alt="Media Manager"><span class="phone-label">5. Shared Media</span></div>
                    <div class="gallery-phone"><img src="assets/Media,Links,Docs_Page_SortBy.png" alt="Sort Options"><span class="phone-label">6. Sort By Menu</span></div>
                    <div class="gallery-phone"><img src="assets/Media,Links,Docs_Page_SortBySelect.png" alt="Sorted Media"><span class="phone-label">7. Sorted Results</span></div>
                </div>
            </div>
        `
    }
};

// --- CUSTOM CURSOR ---
const cursor = document.getElementById('customCursor');
const follower = document.getElementById('customCursorFollower');

let posX = 0, posY = 0;
let mouseX = 0, mouseY = 0;

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Animate follower with a delay (lerp)
    function animateFollower() {
        posX += (mouseX - posX) * 0.15;
        posY += (mouseY - posY) * 0.15;
        
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover interactions for cursor scaling
    const interactiveElements = document.querySelectorAll('.interactive, a, button, .work-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovered-interactive');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovered-interactive');
        });
    });
}

// --- THEME SWITCHER ---
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';

document.documentElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
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

// --- CASE STUDY MODAL DIALOGS ---
const modal = document.getElementById('caseStudyModal');
const closeBtn = document.getElementById('modalCloseBtn');
const projectCards = document.querySelectorAll('.work-card');

// Modal Elements
const modalTitle = document.getElementById('modalTitle');
const modalTags = document.getElementById('modalTags');
const modalImg = document.getElementById('modalImg');
const modalOverview = document.getElementById('modalOverview');
const modalChallenge = document.getElementById('modalChallenge');
const modalSolution = document.getElementById('modalSolution');

function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    if (data.image) {
        modalImg.src = data.image;
        modalImg.alt = `${data.title} Cover Image`;
        modalImg.style.display = 'block';
    } else {
        modalImg.style.display = 'none';
    }
    modalOverview.innerHTML = data.overview;
    modalChallenge.innerHTML = data.challenge;
    modalSolution.innerHTML = data.solution;

    // Clear and build tags
    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'work-tag';
        span.textContent = tag;
        modalTags.appendChild(span);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scroll
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Resume scroll
}

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        openModal(projectId);
    });
});

if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close on background click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close on Escape press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// --- DUMMY FORM SUBMISSION ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! Kavitha will get back to you shortly.');
        contactForm.reset();
    });
}
