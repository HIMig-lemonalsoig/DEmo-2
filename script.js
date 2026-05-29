// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Menu category tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const menuCards = document.querySelectorAll('.menu-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.cat;
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        menuCards.forEach(card => {
            if (category === 'all' || card.dataset.cat === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Contact form (client-side demo handler)
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
