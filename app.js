/**
 * SOUMI MUKHERJEE | JEWELRY & LIFESTYLE ACCESSORIES DESIGN PORTFOLIO
 * Dynamic Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initSparkleCanvas();
  initNavbar();
  initThemeToggle();
  initCollectionTabs();
  initFeatureToggles();
  initSpreadViewer();
  initPieceModals();
  initContactCopy();
  initSmoothScroll();
});

/* ==========================================================================
   1. AMBIENT SPARKLE PARTICLES CANVAS
   ========================================================================== */
function initSparkleCanvas() {
  const canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const sparkles = [];
  const sparkleCount = window.innerWidth < 768 ? 25 : 55;

  for (let i = 0; i < sparkleCount; i++) {
    sparkles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -(Math.random() * 0.45 + 0.15),
      opacity: Math.random() * 0.7 + 0.2,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      color: Math.random() > 0.4 ? '#d4af37' : '#f3e5ab'
    });
  }

  function renderSparkles() {
    ctx.clearRect(0, 0, width, height);

    sparkles.forEach((s) => {
      s.x += s.speedX;
      s.y += s.speedY;
      s.opacity += Math.sin(Date.now() * s.pulseSpeed) * 0.015;

      if (s.y < -10) s.y = height + 10;
      if (s.x < -10) s.x = width + 10;
      if (s.x > width + 10) s.x = -10;

      ctx.save();
      ctx.globalAlpha = Math.max(0.1, Math.min(1, s.opacity));
      ctx.fillStyle = s.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = s.color;

      // Draw diamond/cross sparkle shape
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();

      // Subtle 4-point cross highlight
      if (s.size > 1.8) {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(s.x - s.size * 2, s.y);
        ctx.lineTo(s.x + s.size * 2, s.y);
        ctx.moveTo(s.x, s.y - s.size * 2);
        ctx.lineTo(s.x, s.y + s.size * 2);
        ctx.stroke();
      }

      ctx.restore();
    });

    requestAnimationFrame(renderSparkles);
  }

  renderSparkles();
}

/* ==========================================================================
   2. NAVBAR & SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   3. THEME TOGGLE (Dark Luxury / Light Pearl)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('soumi_portfolio_theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    updateThemeIcon(true);
  }

  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('soumi_portfolio_theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
  });

  function updateThemeIcon(isLight) {
    themeBtn.innerHTML = isLight
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  }
}

/* ==========================================================================
   4. COLLECTION TABS
   ========================================================================== */
function initCollectionTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.collection-panel');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach((p) => {
        if (target === 'all' || p.id === target) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE FEATURE TOGGLES (VersaForma & Rajdwara Modularity)
   ========================================================================== */
function initFeatureToggles() {
  // VersaForma Transformation
  const vfToggles = document.querySelectorAll('.vf-toggle-btn');
  const vfVisual = document.getElementById('vf-feature-img');
  const vfDesc = document.getElementById('vf-feature-desc');

  const vfModes = {
    necklace: {
      img: 'assets/showcase/versaforma_model_crop.webp',
      title: 'Full Royal Statement Necklace',
      desc: 'Complete regal Victorian composition with central drop pendant and geometric filigree links articulated to drape smoothly over the collarbone.'
    },
    maangtikka: {
      img: 'assets/showcase/versaforma_earrings_model_crop.webp',
      title: 'Maang Tikka Transformation',
      desc: 'Central ornamental pendant detaches cleanly from the necklace chain, connecting to an accompanying hair-chain fixture to become a statement forehead adornment.'
    },
    earrings: {
      img: 'assets/showcase/versaforma_earring_render_crop.webp',
      title: 'Modular Stud to Drop Articulation',
      desc: 'Three-tiered earrings: Wear as dainty minimalist top rectangular studs for daytime, or attach the middle scroll filigree and pear drop for evening opulence.'
    }
  };

  vfToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      vfToggles.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      if (vfModes[mode] && vfVisual && vfDesc) {
        vfVisual.style.opacity = '0';
        setTimeout(() => {
          vfVisual.src = vfModes[mode].img;
          vfDesc.innerHTML = `<strong>${vfModes[mode].title}</strong>: ${vfModes[mode].desc}`;
          vfVisual.style.opacity = '1';
        }, 200);
      }
    });
  });

  // Rajdwara Kalangi System
  const rjToggles = document.querySelectorAll('.rj-toggle-btn');
  const rjVisual = document.getElementById('rj-feature-img');
  const rjDesc = document.getElementById('rj-feature-desc');

  const rjModes = {
    kalangi: {
      img: 'assets/showcase/raj_tilak_kalangi_crop.webp',
      title: 'Complete Raj Tilak Kalangi System',
      desc: 'The master royal Rajput head adornment featuring a structured upward architectural flow, massive central emerald, and the integrated rail slot docking system.'
    },
    pravesh: {
      img: 'assets/showcase/pravesh_stambh_crop.webp',
      title: 'Pravesh Stambh Detachable Brooch',
      desc: 'Represents strength, gateway स्वागत (welcome), and palatial threshold. Detaches from the Kalangi to be worn independently on sherwani lapels.'
    },
    megh: {
      img: 'assets/showcase/megh_toran_crop.webp',
      title: 'Megh Toran Brooch',
      desc: 'Inspired by ceremonial toran gateways with suspended pear-shaped emerald drops adding fluid movement and grandeur.'
    },
    surya: {
      img: 'assets/showcase/surya_pol_crop.webp',
      title: 'Surya Pol Brooch',
      desc: 'Iconic sun-facing gateway symmetry with floral arabesque radiating motifs and sliding hook mechanism.'
    }
  };

  rjToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      rjToggles.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      if (rjModes[mode] && rjVisual && rjDesc) {
        rjVisual.style.opacity = '0';
        setTimeout(() => {
          rjVisual.src = rjModes[mode].img;
          rjDesc.innerHTML = `<strong>${rjModes[mode].title}</strong>: ${rjModes[mode].desc}`;
          rjVisual.style.opacity = '1';
        }, 200);
      }
    });
  });
}

/* ==========================================================================
   6. FULLSCREEN JURY SPREAD VIEWER / FLIPBOOK
   ========================================================================== */
function initSpreadViewer() {
  const spreadImg = document.getElementById('spread-current-img');
  const counterText = document.getElementById('spread-counter-text');
  const prevBtn = document.getElementById('spread-prev-btn');
  const nextBtn = document.getElementById('spread-next-btn');
  const thumbStrip = document.getElementById('spread-thumb-strip');
  const zoomBtn = document.getElementById('spread-zoom-btn');
  const fullscreenBtn = document.getElementById('spread-fullscreen-btn');

  if (!spreadImg) return;

  const totalPages = 21;
  let currentPage = 1;

  // Metadata titles for spreads
  const pageTitles = {
    1: 'Cover: Portfolio 2026',
    2: 'Designer Profile & Statement',
    3: 'Table of Contents (Collections 01-04)',
    4: 'VersaForma: Lead & Design Brief',
    5: 'VersaForma: Concept & Mood Board',
    6: 'VersaForma: Forms & Silhouette Exploration',
    7: 'VersaForma: Convertible Necklace & Ring Specs',
    8: 'VersaForma: Maang Tikka, Earrings & Slave Bracelet',
    9: 'Rajdwara: Lead & Architectural Brief',
    10: 'Rajdwara: Mood Board & Client Profile',
    11: 'Rajdwara: Forms, Silhouettes & Hand Sketches',
    12: 'Rajdwara: Kalangi & 3 Detachable Brooches',
    13: 'Rajdwara: Technical Specifications & Mechanism Drawings',
    14: 'Antarjyoti: Sacred Geometry & 7 Chakras Brief',
    15: 'Antarjyoti: Mood Board & Chakra Energy Nodes',
    16: 'Antarjyoti: Forms, Chakra Symbols & Hand Sketches',
    17: 'Antarjyoti: Technical CAD Projections & Dimensions',
    18: 'Antarjyoti: Sahasrasa & Padma Bangles Mudra Showcase',
    19: 'Antarjyoti: Comprehensive Gemstone & Sieve Specification Table',
    20: 'Collection Intermission',
    21: "Let's Connect & Jury Evaluation"
  };

  // Generate thumbnail strip
  for (let i = 1; i <= totalPages; i++) {
    const pad = i.toString().padStart(2, '0');
    const thumb = document.createElement('div');
    thumb.className = `thumb-item ${i === 1 ? 'active' : ''}`;
    thumb.dataset.page = i;
    thumb.title = `Page ${i}: ${pageTitles[i] || ''}`;
    thumb.innerHTML = `<img src="assets/pages_web/page_${pad}.webp" alt="Page ${i}" loading="lazy">`;

    thumb.addEventListener('click', () => {
      goToPage(i);
    });

    thumbStrip.appendChild(thumb);
  }

  function goToPage(page) {
    if (page < 1) page = totalPages;
    if (page > totalPages) page = 1;
    currentPage = page;

    const pad = currentPage.toString().padStart(2, '0');
    spreadImg.style.opacity = '0';

    setTimeout(() => {
      spreadImg.src = `assets/pages_web/page_${pad}.webp`;
      spreadImg.alt = `Spread ${currentPage}: ${pageTitles[currentPage] || ''}`;
      if (counterText) {
        counterText.textContent = `Spread ${currentPage} of ${totalPages} • ${pageTitles[currentPage] || ''}`;
      }
      spreadImg.style.opacity = '1';
    }, 150);

    // Update thumbnail highlights
    const allThumbs = thumbStrip.querySelectorAll('.thumb-item');
    allThumbs.forEach((t) => {
      if (parseInt(t.dataset.page) === currentPage) {
        t.classList.add('active');
        t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        t.classList.remove('active');
      }
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
    if (e.key === 'ArrowRight') goToPage(currentPage + 1);
  });

  // Zoom click on main spread
  if (zoomBtn) {
    zoomBtn.addEventListener('click', () => {
      const pad = currentPage.toString().padStart(2, '0');
      openModal({
        title: `Spread ${currentPage}: ${pageTitles[currentPage] || ''}`,
        category: 'Physical Jury Portfolio Spread',
        desc: 'High-resolution jury presentation spread from Soumi Mukherjee’s original design portfolio.',
        img: `assets/pages_web/page_${pad}.webp`,
        specs: [
          'Original Resolution: 10524 × 5262 px',
          'Format: 2-Page Landscape Spread',
          'NIFT Kolkata Final Jury Submission'
        ]
      });
    });
  }

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      const stage = document.querySelector('.spread-reader-box');
      if (!document.fullscreenElement) {
        stage.requestFullscreen().catch((err) => console.log(err));
      } else {
        document.exitFullscreen();
      }
    });
  }
}

/* ==========================================================================
   7. PIECE DETAIL MODAL LIGHTBOX
   ========================================================================== */
function initPieceModals() {
  const modal = document.getElementById('piece-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  // Attach click listener to all piece cards and sketch cards
  document.querySelectorAll('[data-inspect]').forEach((el) => {
    el.addEventListener('click', () => {
      try {
        const data = JSON.parse(el.dataset.inspect);
        openModal(data);
      } catch (err) {
        console.error('Error parsing piece data:', err);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal(data) {
  const modal = document.getElementById('piece-modal');
  if (!modal) return;

  document.getElementById('modal-category').textContent = data.category || 'Jewelry Piece';
  document.getElementById('modal-title').textContent = data.title || '';
  document.getElementById('modal-desc').textContent = data.desc || '';
  document.getElementById('modal-img').src = data.img || '';

  const specsList = document.getElementById('modal-specs-list');
  specsList.innerHTML = '';
  if (data.specs && data.specs.length > 0) {
    data.specs.forEach((s) => {
      const item = document.createElement('div');
      item.className = 'modal-spec-row';
      item.innerHTML = `<strong>•</strong> <span>${s}</span>`;
      specsList.appendChild(item);
    });
    specsList.style.display = 'flex';
  } else {
    specsList.style.display = 'none';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('piece-modal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================================================
   8. CONTACT COPY TO CLIPBOARD
   ========================================================================== */
function initContactCopy() {
  document.querySelectorAll('.copy-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.dataset.copy;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<span style="color: #1dd391;">✓ Copied!</span>`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2200);
      });
    });
  });

  const inquiryForm = document.getElementById('inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Message Sent Successfully!';
      submitBtn.style.background = '#0e5a40';
      submitBtn.style.color = '#fff';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        inquiryForm.reset();
      }, 3500);
    });
  }
}

/* ==========================================================================
   9. SMOOTH SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
