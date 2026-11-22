/* Kiếm Võng Giang Hồ — Ver. 1.0.11 Interactive Effects (Reduced-Motion Safe) */
(function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Subtle Golden Lantern Ember Canvas (Hero only, pauses when offscreen) */
  const canvas = document.getElementById('hero-embers');
  if (canvas && !reducedMotion) {
    const ctx = canvas.getContext('2d');
    const hero = canvas.closest('.hero');
    let w = 0, h = 0, running = true, raf = 0;
    const count = window.innerWidth < 768 ? 18 : 34;
    const motes = Array.from({ length: count }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.0 + (i % 4) * 0.65,
      vx: (Math.random() - 0.35) * 0.00018,
      vy: -(0.00022 + Math.random() * 0.00038),
      a: 0.22 + Math.random() * 0.55,
      p: Math.random() * Math.PI * 2,
    }));
    const resize = () => {
      if (!hero) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    if ('IntersectionObserver' in window && hero) {
      new IntersectionObserver((entries) => {
        running = entries[0].isIntersecting;
        if (running && !raf) tick();
      }, { threshold: 0.05 }).observe(hero);
    }
    const tick = () => {
      raf = 0;
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx + Math.sin(m.p) * 0.00008;
        m.y += m.vy;
        m.p += 0.018;
        if (m.y < -0.04) { m.y = 1.04; m.x = 0.25 + Math.random() * 0.75; }
        if (m.x < -0.04) m.x = 1.04;
        if (m.x > 1.04) m.x = -0.04;
        const alpha = m.a * (0.55 + 0.45 * Math.sin(m.p));
        const gx = m.x * w, gy = m.y * h;
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, m.r * 3.4);
        grad.addColorStop(0, `rgba(255, 224, 150, ${alpha.toFixed(3)})`);
        grad.addColorStop(0.5, `rgba(212, 165, 74, ${(alpha * 0.45).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(212, 165, 74, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(gx, gy, m.r * 3.4, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
  }

  /* 2. Editorial Reveal & HyperFrames light-sweep-pass on Scroll (Never hides content) */
  const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));
  const showEl = (el) => {
    if (el.classList.contains('is-visible')) return;
    el.classList.add('is-visible');
    if (!reducedMotion && el.classList.contains('hf-lit-card')) {
      let x = -25;
      el.classList.add('is-swept');
      const sweep = () => {
        x += 5;
        el.style.setProperty('--light-x', x.toFixed(1));
        if (x < 128) requestAnimationFrame(sweep);
        else setTimeout(() => el.classList.remove('is-swept'), 240);
      };
      requestAnimationFrame(sweep);
    }
  };
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        showEl(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 140px 0px' });
    revealEls.forEach((el) => io.observe(el));
    const revealVisibleNow = () => {
      const vh = window.innerHeight || 900;
      revealEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh + 160) showEl(el);
      });
    };
    window.addEventListener('scroll', revealVisibleNow, { passive: true });
    window.addEventListener('hashchange', () => revealEls.forEach(showEl));
    setTimeout(revealVisibleNow, 180);
  } else {
    revealEls.forEach(showEl);
  }

  /* 3. Interactive Category Filter Bar */
  const filterBtns = Array.from(document.querySelectorAll('[data-filter]'));
  const filterItems = Array.from(document.querySelectorAll('[data-cat]'));
  const applyFilter = (cat) => {
    filterBtns.forEach((b) => {
      const on = b.dataset.filter === cat;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    filterItems.forEach((item) => {
      const cats = (item.dataset.cat || '').split(/\s+/);
      const show = cat === 'all' || cats.includes(cat);
      item.hidden = !show;
      if (show) item.classList.add('is-visible');
    });
  };
  filterBtns.forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.filter)));

  /* 4. Accessible Full-Screen Image Lightbox (Click, Esc, Left/Right Arrows) */
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-cap');
  const lbCount = document.getElementById('lightbox-count');
  const triggers = Array.from(document.querySelectorAll('[data-lightbox-src]'));
  let curIdx = 0;
  let lastFocus = null;

  const renderLb = () => {
    const t = triggers[curIdx];
    if (!t || !lbImg) return;
    lbImg.src = t.dataset.lightboxSrc;
    lbImg.alt = t.dataset.lightboxCap || '';
    if (lbCap) lbCap.textContent = t.dataset.lightboxCap || '';
    if (lbCount) lbCount.textContent = `${curIdx + 1} / ${triggers.length}`;
  };
  const openLb = (idx) => {
    if (!lb) return;
    lastFocus = document.activeElement;
    curIdx = (idx + triggers.length) % triggers.length;
    renderLb();
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    const closeBtn = lb.querySelector('.lb-close');
    if (closeBtn) closeBtn.focus();
  };
  const closeLb = () => {
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  };
  triggers.forEach((el, idx) => el.addEventListener('click', () => openLb(idx)));
  if (lb) {
    lb.querySelector('.lb-close')?.addEventListener('click', closeLb);
    lb.querySelector('.lb-prev')?.addEventListener('click', () => openLb(curIdx - 1));
    lb.querySelector('.lb-next')?.addEventListener('click', () => openLb(curIdx + 1));
    lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') openLb(curIdx - 1);
      else if (e.key === 'ArrowRight') openLb(curIdx + 1);
    });
  }
})();
