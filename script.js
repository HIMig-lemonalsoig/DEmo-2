// ============ Header state + scroll spy (rAF-throttled for smoothness) ============
const header = document.getElementById('header');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
let ticking = false;

function onScroll() {
    const scrollY = window.scrollY;

    // Shrink/solidify the header once the user scrolls past the hero edge
    header.classList.toggle('scrolled', scrollY > 50);

    // Scroll spy: highlight the nav link for the section currently in view
    let current = '';
    const pos = scrollY + 120;
    sections.forEach(section => {
        if (pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight) {
            current = section.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
    }
}, { passive: true });

// ============ Mobile menu toggle ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close the mobile menu after tapping a link (the smooth scroll is handled in CSS)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============ Menu category tabs ============
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.cat;
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        menuCards.forEach(card => {
            const show = category === 'all' || card.dataset.cat === category;
            card.classList.toggle('hidden', !show);
        });
    });
});

// ============ Scroll-reveal animations (fade/slide in as sections enter view) ============
const revealEls = document.querySelectorAll(
    '.section-header, .about-images, .about-content, .menu-card, ' +
    '.review-card, .info-card, .map-wrapper, .hours-card, .form-card'
);

// Give items inside grids a cascading stagger so rows ripple in
document.querySelectorAll('.menu-grid, .reviews-grid, .location-info').forEach(grid => {
    Array.from(grid.children).forEach((child, i) => {
        child.style.transitionDelay = (i % 3) * 80 + 'ms';
    });
});

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target); // animate once, then stop watching
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
} else {
    // No observer support: just show everything
    revealEls.forEach(el => el.classList.add('in-view'));
}

// Set the correct nav highlight on initial load
onScroll();

// ============ Contact form (client-side demo handler) ============
function handleSubmit(form) {
    const note = document.getElementById('formNote');
    const name = form.name.value.trim();
    if (!name) {
        note.textContent = 'Please fill in all required fields.';
        note.classList.remove('success');
        return;
    }
    note.textContent = `Thanks, ${name.split(' ')[0]}! We'll be in touch shortly.`;
    note.classList.add('success');
    form.reset();
    setTimeout(() => {
        note.textContent = '';
        note.classList.remove('success');
    }, 6000);
}
