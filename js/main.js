// ─── AOS Init ───
AOS.init({ once: true, offset: 60, duration: 700, easing: 'ease-out-cubic' });

// ─── Navbar Scroll ───
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// ─── Active Nav Link Highlight ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
  });
}, { passive: true });

// ─── Smooth Close Navbar on Mobile ───
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.getElementById('navbarNav');
    if (collapse.classList.contains('show')) {
      new bootstrap.Collapse(collapse).hide();
    }
  });
});

// ─── Resume Modal ───
const modal    = document.getElementById('resumeModal');
const iframe   = document.getElementById('resumeIframe');
let iframeLoaded = false;

function openResumeModal() {
  if (!iframeLoaded) {
    iframe.src = 'assets/resume.pdf';
    iframeLoaded = true;
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function closeResumeModalOutside(e) {
  if (e.target === modal) closeResumeModal();
}

// Keyboard close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) closeResumeModal();
});


// ─── Contact Form ───
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.btn-submit-form');
  const success = document.getElementById('formSuccess');
  const error = document.getElementById('formError');

  error.classList.add('d-none');
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';
  btn.disabled = true;

  fetch('https://formspree.io/f/xkolzpnw', {   
    method: 'POST',
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  })
    .then(response => {
      if (response.ok) {
        btn.innerHTML = '<i class="bi bi-check-lg me-2"></i>Sent!';
        btn.style.background = '#059669';
        success.classList.remove('d-none');
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(() => {
      btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Message';
      error.classList.remove('d-none');
    })
    .finally(() => {
      setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Message';
        btn.style.background = '';
        btn.disabled = false;
        success.classList.add('d-none');
      }, 4000);
    });
}

// ─── Subtle Cursor Glow on Hero (desktop only) ───
if (window.innerWidth > 1024) {
  const hero = document.getElementById('hero');
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hero.style.setProperty('--mx', `${x}px`);
    hero.style.setProperty('--my', `${y}px`);
  }, { passive: true });
}
