/**
 * SOUMI MUKHERJEE | JEWELRY & LIFESTYLE ACCESSORIES DESIGN PORTFOLIO
 * High-Motion Interactive 3D WebGL Studio & Fluid Animation Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initSparkleCanvas();
  initThreeJewelryStudio();
  init3DCardTilt();
  initNavbarAndMenu();
  initThemeToggle();
  initCollectionTabs();
  initFeatureToggles();
  initSpreadViewer();
  initPieceModals();
  initContactCopy();
  initSmoothScroll();
});

/* ==========================================================================
   1. PRELOADER ANIMATION SEQUENCE (0% -> 100% -> Cursive Greeting -> Reveal)
   ========================================================================== */
function initPreloader() {
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
    return;
  }

  let currentPercent = 0;
  const targetPercent = 100;
  const totalDuration = 1100; // ms
  const intervalTime = 16;
  const increment = targetPercent / (totalDuration / intervalTime);
  const fullCircumference = 251.32; // 2 * PI * 40

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
        }, 600);
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

/* ==========================================================================
   2. SMOOTH CUSTOM CURSOR WITH LERP INTERPOLATION
   ========================================================================== */
function initCustomCursor() {
  const cursorDot = document.getElementById('customCursor');
  const cursorFollower = document.getElementById('cursorFollower');
  if (!cursorDot || !cursorFollower) return;

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.16;
    followerY += (mouseY - followerY) * 0.16;

    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const hoverTargets = document.querySelectorAll(
    'a, button, input, textarea, .piece-card, .sketch-card, .control-chip-btn, .tab-btn, .toggle-pill, .thumb-item, .studio-viewport-wrap'
  );

  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      cursorDot.classList.add('hovering');
      cursorFollower.classList.add('hovering');
    });
    target.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('hovering');
      cursorFollower.classList.remove('hovering');
    });
  });
}

/* ==========================================================================
   3. AMBIENT SPARKLE PARTICLES
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
  const sparkleCount = window.innerWidth < 768 ? 20 : 45;

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

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();

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
   4. REAL-TIME 3D JEWELRY STUDIO (THREE.JS WEBGL VIEWPORT)
   ========================================================================== */
function initThreeJewelryStudio() {
  const container = document.getElementById('studio-viewport-wrap');
  const canvas = document.getElementById('three-canvas');
  if (!container || !canvas || typeof THREE === 'undefined') return;

  // Scene setup
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 8.5);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xffeedd, 1.8);
  keyLight.position.set(5, 8, 6);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0x1dd391, 1.2, 50);
  fillLight.position.set(-6, -4, 4);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xd4af37, 2.0);
  rimLight.position.set(0, -5, -4);
  scene.add(rimLight);

  // Jewelry Gem Group
  const jewelGroup = new THREE.Group();
  scene.add(jewelGroup);

  // Preset Materials
  const gemMaterials = {
    emerald: new THREE.MeshPhysicalMaterial({
      color: 0x0c784b,
      emissive: 0x042416,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.88,
      ior: 2.2,
      thickness: 2.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      flatShading: true
    }),
    diamond: new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x111122,
      roughness: 0.02,
      metalness: 0.05,
      transmission: 0.95,
      ior: 2.42,
      thickness: 3.0,
      clearcoat: 1.0,
      flatShading: true
    }),
    ruby: new THREE.MeshPhysicalMaterial({
      color: 0xb5122b,
      emissive: 0x3d030c,
      roughness: 0.06,
      metalness: 0.1,
      transmission: 0.85,
      ior: 2.3,
      thickness: 2.5,
      clearcoat: 1.0,
      flatShading: true
    })
  };

  const goldCageMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.92,
    roughness: 0.18,
    wireframe: false
  });

  const wireCageMaterial = new THREE.MeshBasicMaterial({
    color: 0xf3e5ab,
    wireframe: true,
    transparent: true,
    opacity: 0.35
  });

  // Gem Geometries
  function createEmeraldGeometry() {
    // Faceted Octagonal / Cushion Box
    return new THREE.CylinderGeometry(2.1, 1.4, 2.8, 8, 3);
  }

  function createDiamondGeometry() {
    // Brilliant Diamond Double Cone
    return new THREE.OctahedronGeometry(2.2, 2);
  }

  function createCabochonGeometry() {
    // Sacred Lotus Crown Cabochon
    return new THREE.DodecahedronGeometry(2.1, 1);
  }

  let currentMesh = null;
  let currentWire = null;
  let currentCage = null;

  function buildJewel(cutType, matType) {
    if (currentMesh) jewelGroup.remove(currentMesh);
    if (currentWire) jewelGroup.remove(currentWire);
    if (currentCage) jewelGroup.remove(currentCage);

    let geom;
    if (cutType === 'diamond') geom = createDiamondGeometry();
    else if (cutType === 'cabochon') geom = createCabochonGeometry();
    else geom = createEmeraldGeometry();

    const mat = gemMaterials[matType] || gemMaterials.emerald;
    currentMesh = new THREE.Mesh(geom, mat);
    jewelGroup.add(currentMesh);

    // Subtle faceted wireframe accent
    currentWire = new THREE.Mesh(geom, wireCageMaterial);
    currentWire.scale.set(1.002, 1.002, 1.002);
    jewelGroup.add(currentWire);

    // 18K Gold Outer Setting Ring / Prongs
    const ringGeom = new THREE.TorusGeometry(2.4, 0.08, 16, 64);
    currentCage = new THREE.Mesh(ringGeom, goldCageMaterial);
    currentCage.rotation.x = Math.PI / 2;
    jewelGroup.add(currentCage);
  }

  // Initial build: Emerald Cut & Emerald Gem
  buildJewel('emerald', 'emerald');

  // Floating Diamond Dust Particle Constellation
  const dustCount = 80;
  const dustGeom = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);

  for (let i = 0; i < dustCount * 3; i += 3) {
    dustPos[i] = (Math.random() - 0.5) * 12;
    dustPos[i + 1] = (Math.random() - 0.5) * 12;
    dustPos[i + 2] = (Math.random() - 0.5) * 12;
  }
  dustGeom.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

  const dustMat = new THREE.PointsMaterial({
    color: 0xf3e5ab,
    size: 0.12,
    transparent: true,
    opacity: 0.6
  });
  const dustParticles = new THREE.Points(dustGeom, dustMat);
  scene.add(dustParticles);

  // Mouse Orbit Interaction
  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };
  let targetRotation = { x: 0.35, y: 0.5 };
  let mouseScreenX = 0;
  let mouseScreenY = 0;

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseScreenX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseScreenY = -(e.clientY / window.innerHeight) * 2 + 1;

    // Reposition key light based on cursor for real reflection play
    keyLight.position.x = mouseScreenX * 8 + 3;
    keyLight.position.y = mouseScreenY * 8 + 4;

    if (isDragging) {
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      targetRotation.y += deltaX * 0.01;
      targetRotation.x += deltaY * 0.01;
      prevMousePos = { x: e.clientX, y: e.clientY };
    }
  });

  // Touch support for mobile
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;
      targetRotation.y += deltaX * 0.01;
      targetRotation.x += deltaY * 0.01;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  });

  // Resize handler
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Scroll rotation reactive effect
  window.addEventListener('scroll', () => {
    targetRotation.y += 0.02;
  });

  // Render loop
  function animate() {
    requestAnimationFrame(animate);

    // Continuous subtle auto-rotation if not dragging
    if (!isDragging) {
      targetRotation.y += 0.005;
    }

    // Smooth lerp rotation
    jewelGroup.rotation.y += (targetRotation.y - jewelGroup.rotation.y) * 0.08;
    jewelGroup.rotation.x += (targetRotation.x - jewelGroup.rotation.x) * 0.08;

    // Subtle breathing float
    jewelGroup.position.y = Math.sin(Date.now() * 0.0018) * 0.22;

    // Rotate dust
    dustParticles.rotation.y += 0.001;

    renderer.render(scene, camera);
  }
  animate();

  // Studio UI Controls
  let activeCut = 'emerald';
  let activeMat = 'emerald';

  const cutBtns = document.querySelectorAll('[data-3d-cut]');
  const matBtns = document.querySelectorAll('[data-3d-mat]');

  cutBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      cutBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCut = btn.dataset['3dCut'];
      buildJewel(activeCut, activeMat);
    });
  });

  matBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      matBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeMat = btn.dataset['3dMat'];
      buildJewel(activeCut, activeMat);
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE 3D CARD TILT WITH SPECULAR GLARE
   ========================================================================== */
function init3DCardTilt() {
  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach((card) => {
    // Add specular glare element if not present
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Update glare position
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)`;
      glare.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      glare.style.opacity = '0';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* ==========================================================================
   6. NAVBAR & FULLSCREEN OVERLAY MENU
   ========================================================================== */
function initNavbarAndMenu() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuLinks = document.querySelectorAll('.menu-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

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

  function openMenu() {
    if (menuOverlay) {
      menuOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (menuOverlay) {
      menuOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/* ==========================================================================
   7. THEME TOGGLE
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
   8. COLLECTION TABS
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
   9. INTERACTIVE FEATURE TOGGLES
   ========================================================================== */
function initFeatureToggles() {
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
   10. FULLSCREEN JURY SPREAD VIEWER
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
    if (e.key === 'ArrowRight') goToPage(currentPage + 1);
  });

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
   11. PIECE DETAIL MODAL LIGHTBOX
   ========================================================================== */
function initPieceModals() {
  const modal = document.getElementById('piece-modal');
  const closeBtn = document.getElementById('modal-close-btn');

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

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
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
   12. CONTACT COPY & FORM SUBMISSION
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
      submitBtn.style.background = '#0e6b4c';
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
   13. SMOOTH SCROLLING
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
