/**
 * SOUMI MUKHERJEE — LUXURY JEWELRY & LIFESTYLE ACCESSORIES DESIGNER
 * Interactive logic crafted precisely to match the Ritam Roy portfolio experience
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. PRELOADER ANIMATION SEQUENCE (Exact Frame Match)
  // =========================================================================
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloaderCounter');
  const arcProgress = document.getElementById('preloaderArc');
  const spinnerWrap = document.getElementById('preloaderSpinnerWrap');
  const greetingEl = document.getElementById('preloaderGreeting');
  const body = document.body;

  if (window.location.search.includes('nopreloader')) {
    if (preloader) {
      preloader.style.display = 'none';
      preloader.classList.add('completed');
    }
    body.classList.remove('loading-state');
  } else {
    let currentPercent = 0;
    const targetPercent = 100;
    const totalDuration = 1000; // ms snappy counter matching Ritam Roy
    const intervalTime = 16;
    const increment = targetPercent / (totalDuration / intervalTime);
    const fullCircumference = 251.2; // 2 * PI * 40

    const countTimer = setInterval(() => {
      currentPercent += increment;
      if (currentPercent >= 100) {
        currentPercent = 100;
        clearInterval(countTimer);
        if (counterEl) counterEl.textContent = '100%';
        if (arcProgress) arcProgress.style.strokeDashoffset = '0';

        setTimeout(() => {
          if (counterEl) counterEl.classList.add('hide');
          if (spinnerWrap) spinnerWrap.classList.add('hide');
          if (greetingEl) greetingEl.classList.add('show');

          setTimeout(() => {
            if (preloader) preloader.classList.add('completed');
            body.classList.remove('loading-state');
            setTimeout(() => {
              if (preloader) preloader.style.display = 'none';
            }, 800);
          }, 550);
        }, 250);
      } else {
        const displayVal = Math.floor(currentPercent);
        if (counterEl) counterEl.textContent = `${displayVal}%`;
        if (arcProgress) {
          const offset = fullCircumference - (currentPercent / 100) * fullCircumference;
          arcProgress.style.strokeDashoffset = offset;
        }
      }
    }, intervalTime);
  }

  // =========================================================================
  // 2. SMOOTH CUSTOM CURSOR WITH LERP INTERPOLATION
  // =========================================================================
  const cursorDot = document.getElementById('customCursor');
  const cursorFollower = document.getElementById('cursorFollower');

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }
  });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.16;
    followerY += (mouseY - followerY) * 0.16;

    if (cursorFollower) {
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
    }

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const hoverTargets = document.querySelectorAll(
    'a, button, input, textarea, .project-card, .expertise-row, .tool-card, .portrait-card, .tech-chip, .thumb-item'
  );

  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      if (cursorDot) cursorDot.classList.add('hovering');
      if (cursorFollower) cursorFollower.classList.add('hovering');
    });
    target.addEventListener('mouseleave', () => {
      if (cursorDot) cursorDot.classList.remove('hovering');
      if (cursorFollower) cursorFollower.classList.remove('hovering');
    });
  });

  // =========================================================================
  // 3. FULLSCREEN HAMBURGER OVERLAY MENU
  // =========================================================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuLinks = document.querySelectorAll('.menu-link');

  function openMenu() {
    if (menuOverlay) menuOverlay.classList.add('open');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (menuOverlay) menuOverlay.classList.remove('open');
    body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // =========================================================================
  // 4. PHYSICAL JURY SPREAD READER (ALL 21 SPREADS)
  // =========================================================================
  const spreadImg = document.getElementById('spreadCurrentImg');
  const spreadCounter = document.getElementById('spreadCounter');
  const btnPrev = document.getElementById('btnPrevSpread');
  const btnNext = document.getElementById('btnNextSpread');
  const thumbRail = document.getElementById('spreadThumbRail');
  const btnFullscreen = document.getElementById('btnFullscreenSpread');

  if (spreadImg && thumbRail) {
    const totalPages = 21;
    let currentPage = 1;

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

    // Populate Thumbnails
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

      thumbRail.appendChild(thumb);
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
        if (spreadCounter) {
          spreadCounter.textContent = `SPREAD ${pad} / ${totalPages} • ${pageTitles[currentPage] || ''}`;
        }
        spreadImg.style.opacity = '1';
      }, 150);

      const allThumbs = thumbRail.querySelectorAll('.thumb-item');
      allThumbs.forEach((t) => {
        if (parseInt(t.dataset.page) === currentPage) {
          t.classList.add('active');
          t.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } else {
          t.classList.remove('active');
        }
      });
    }

    if (btnPrev) btnPrev.addEventListener('click', () => goToPage(currentPage - 1));
    if (btnNext) btnNext.addEventListener('click', () => goToPage(currentPage + 1));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
      if (e.key === 'ArrowRight') goToPage(currentPage + 1);
    });

    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', () => {
        const box = document.querySelector('.spread-viewer-box');
        if (!document.fullscreenElement) {
          box.requestFullscreen().catch((err) => console.log(err));
        } else {
          document.exitFullscreen();
        }
      });
    }
  }

  // =========================================================================
  // 5. CONTACT COPY & FORM SUBMISSION
  // =========================================================================
  document.querySelectorAll('.copy-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.dataset.copy;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'COPIED ✓';
        btn.style.color = '#C5A880';
        btn.style.borderColor = '#C5A880';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2200);
      });
    });
  });

  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'MESSAGE SENT SUCCESSFULLY ✓';
      submitBtn.style.background = '#C5A880';
      submitBtn.style.color = '#070707';

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.color = '';
        contactForm.reset();
      }, 4000);
    });
  }

  // =========================================================================
  // 6. SMOOTH SCROLLING FOR INTERNAL LINKS
  // =========================================================================
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

  // =========================================================================
  // 7. FLUID SCROLL REVEAL OBSERVER (MATCHING RITAM ROY)
  // =========================================================================
  const revealElements = document.querySelectorAll(
    '[data-reveal], .tools-section, .about-section, .expertise-section, .collections-section, .contact-section, .spread-reader-section, .tool-card, .project-card, .portrait-card'
  );

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

});
