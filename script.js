/* =============================================
   A Paul & Co — JavaScript
   ============================================= */

// -------- Navbar: scroll + active link --------
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNav();
});

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) {
            current = sec.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// -------- Mobile Hamburger Menu --------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

// Close menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

// -------- Scroll Reveal Animation --------
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Building is fixed — no scroll rotation
// -------- Contact Form Handler --------
function handleFormSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const success = document.getElementById('formSuccess');

    btn.disabled = true;
    btn.textContent = 'Sending...';

    // Send using EmailJS (you will need to replace SERVICE_ID and TEMPLATE_ID)
    emailjs.sendForm('service_2baj2vd', 'template_gflwyvd', e.target)
        .then(() => {
            btn.textContent = 'Message Sent ✓';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            success.classList.add('show');
            document.getElementById('contactForm').reset();

            setTimeout(() => {
                btn.disabled = false;
                btn.textContent = 'Send Message';
                btn.style.background = '';
                success.classList.remove('show');
            }, 4000);
        })
        .catch((error) => {
            console.error('Email failed to send:', error);
            btn.disabled = false;
            btn.textContent = 'Failed to Send. Try Again.';
            btn.style.background = '#ef4444';

            setTimeout(() => {
                btn.textContent = 'Send Message';
                btn.style.background = '';
            }, 4000);
        });
}

// -------- Smooth scroll for anchor links --------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// -------- On page load --------
window.addEventListener('DOMContentLoaded', () => {
    // Trigger navbar scrolled check immediately
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    updateActiveNav();
    filterProjects('architecture'); // default filter
});

// -------- Project Filtering --------
const projectTabs = document.querySelectorAll('.project-tab');
const projectCards = document.querySelectorAll('.project-card');

projectTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        projectTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        filterProjects(filter);
    });
});

function filterProjects(category) {
    projectCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
