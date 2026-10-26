/* =========================================================
   Agni Biswas — portfolio interactions
   ========================================================= */
(function () {
  'use strict';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- nav state + scroll progress ---------- */
  const nav = document.getElementById('nav');
  const progress = document.getElementById('progress');
  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 24);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => {
      // reveal immediately if already in view on load; observe the rest for scroll
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('in');
      } else {
        io.observe(el);
      }
    });
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- active nav link (scroll spy) ---------- */
  const sections = ['story', 'experience', 'architecture', 'projects', 'contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const linkFor = {};
  document.querySelectorAll('.nav-links a').forEach((a) => {
    const id = a.getAttribute('href').replace('#', '');
    linkFor[id] = a;
  });
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const a = linkFor[e.target.id];
          if (!a) return;
          if (e.isIntersecting) {
            Object.values(linkFor).forEach((l) => l.classList.remove('active'));
            a.classList.add('active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- hero role rotator ---------- */
  const rotator = document.getElementById('roleRotator');
  if (rotator && !reduceMotion) {
    const roles = [
      'Systems Architect',
      'Autonomy Engineer',
      'Embedded & Sensorics',
      'Software Architect',
    ];
    let ri = 0,
      ci = 0,
      deleting = false;
    function tick() {
      const word = roles[ri];
      ci += deleting ? -1 : 1;
      rotator.firstChild
        ? (rotator.childNodes[0].nodeValue = word.slice(0, ci))
        : (rotator.textContent = word.slice(0, ci));
      let delay = deleting ? 45 : 90;
      if (!deleting && ci === word.length) {
        delay = 1900;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        delay = 350;
      }
      setTimeout(tick, delay);
    }
    // seed with a text node so the caret pseudo-element stays put
    rotator.textContent = '';
    rotator.appendChild(document.createTextNode(''));
    setTimeout(tick, 700);
  }

  /* ---------- animated pipeline (signal dots + lit nodes) ---------- */
  const svg = document.getElementById('pipeline');
  if (svg && !reduceMotion) {
    const NS = 'http://www.w3.org/2000/svg';
    const nodes = Array.from(svg.querySelectorAll('.node'));
    const flows = Array.from(svg.querySelectorAll('.flow'));
    // a travelling signal dot
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('r', '4');
    dot.setAttribute('class', 'signal');
    svg.appendChild(dot);

    let seg = 0; // which flow segment
    let t = 0; // 0..1 along segment
    let litIndex = 0;

    function light(i) {
      nodes.forEach((n, idx) => n.classList.toggle('lit', idx === i));
    }
    light(0);

    function frame() {
      if (svg.classList.contains('ignite')) {
        // the knock owns the diagram now
        dot.style.opacity = '0';
        return;
      }
      if (seg < flows.length) {
        const path = flows[seg];
        const len = path.getTotalLength();
        const p = path.getPointAtLength(t * len);
        dot.setAttribute('cx', p.x);
        dot.setAttribute('cy', p.y);
        dot.style.opacity = '1';
        t += 0.018;
        if (t >= 1) {
          t = 0;
          seg++;
          litIndex = Math.min(litIndex + 1, nodes.length - 1);
          light(litIndex);
        }
      } else {
        // brief pause at ACT, then reset the loop
        dot.style.opacity = '0';
        seg = 0;
        t = 0;
        litIndex = 0;
        light(0);
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- architecture layer interaction ---------- */
  const archDetail = document.getElementById('archDetail');
  const layers = document.querySelectorAll('.arch-layer');
  const content = {
    perception: {
      k: '// layer 01 — what the machine believes',
      t: 'Perception',
      d: 'Fusing sensors into a single, trustworthy world-model. This is where my sensorics background pays off — I know that clean perception is a hardware problem as much as an algorithm one. Garbage signal in, confident wrong answer out.',
    },
    controls: {
      k: '// layer 02 — belief into motion',
      t: 'Controls',
      d: 'Translating intent into safe, smooth actuation on real hydraulics and drivetrains. Control theory meets the messy physics of off-highway machines — where a model that ignores load, latency or terrain gets someone hurt.',
    },
    safety: {
      k: '// layer 03 — the contract above all',
      t: 'Safety & Fail-safe',
      d: 'The layer that can veto every other. I design the conditions for graceful degradation first, not last — because autonomy is a probability game, and the real engineering is defining exactly how and when the system is allowed to fail.',
    },
    sim: {
      k: '// layer 04 — proven before real',
      t: 'Simulation / Digital Twin',
      d: 'Aligning virtual environments with real machine behaviour so we can test the thousand dangerous cases we never want on a real site. My daily lever: if the twin and the machine disagree, the twin is a lie — and I go find out why.',
    },
  };
  layers.forEach((btn) => {
    const activate = () => {
      const key = btn.dataset.layer;
      const c = (window.__LAYER_CONTENT__ || content)[key];
      if (!c) return;
      if (archDetail) archDetail.dataset.touched = '1';
      layers.forEach((l) => l.classList.remove('active'));
      btn.classList.add('active');
      archDetail.innerHTML =
        '<p class="arch-detail-kicker mono">' + c.k + '</p>' +
        '<h3 class="arch-detail-title">' + c.t + '</h3>' +
        '<p class="arch-detail-text">' + c.d + '</p>';
      archDetail.classList.remove('swap');
      void archDetail.offsetWidth; // reflow to restart animation
      archDetail.classList.add('swap');
    };
    btn.addEventListener('mouseenter', activate);
    btn.addEventListener('focus', activate);
    btn.addEventListener('click', activate);
  });

  /* ---------- project card cursor glow ---------- */
  document.querySelectorAll('.proj-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', e.clientX - r.left + 'px');
      card.style.setProperty('--my', e.clientY - r.top + 'px');
    });
  });

  /* ---------- copy email ---------- */
  const copyBtn = document.getElementById('copyEmailBtn');
  if (copyBtn) {
    const original = copyBtn.textContent;
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.dataset.email;
      try {
        await navigator.clipboard.writeText(email);
      } catch (_) {
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
      }
      copyBtn.textContent = '✓ copied — ' + email;
      setTimeout(() => (copyBtn.textContent = original), 2200);
    });
  }
})();

/* ---------- knock ---------- */
// Run the loop backwards: click ACT, DECIDE, MODEL, SENSE in the hero diagram (feedback closes
// the loop). Typing "carl" anywhere outside a field also works. Both land on carl/.
(function () {
  var dest = 'carl/';
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.getElementById('pipeline');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gone = false;

  function ignite() {
    if (gone) return; gone = true;
    if (reduce || !svg) { location.href = dest; return; }
    svg.classList.add('ignite');
    var nodes = Array.prototype.slice.call(svg.querySelectorAll('.node'));
    nodes.forEach(function (n) { n.classList.remove('lit', 'tap'); });

    // feedback arc from ACT back up to SENSE, drawn on
    var arc = document.createElementNS(NS, 'path');
    arc.setAttribute('d', 'M250 399 C 326 399, 326 56, 250 56');
    arc.setAttribute('class', 'feedback');
    svg.insertBefore(arc, svg.firstChild);
    var len = arc.getTotalLength();
    arc.style.strokeDasharray = len;
    arc.style.strokeDashoffset = len;
    requestAnimationFrame(function () { arc.classList.add('draw'); });

    // nodes light bottom to top as the signal climbs the arc
    nodes.slice().reverse().forEach(function (n, k) {
      setTimeout(function () { n.classList.add('armed'); }, 250 + k * 170);
    });

    // caption types out
    var cap = document.getElementById('pipelineCaption');
    if (cap) {
      var msg = '// loop closed. carrier acquired.', c = 0;
      cap.textContent = '';
      cap.classList.add('acquired');
      (function type() {
        cap.textContent = msg.slice(0, ++c);
        if (c < msg.length) setTimeout(type, 28);
      })();
    }

    setTimeout(function () {
      var veil = document.createElement('div');
      veil.className = 'knock-veil';
      document.body.appendChild(veil);
      requestAnimationFrame(function () { veil.classList.add('on'); });
      setTimeout(function () { location.href = dest; }, 650);
    }, 1500);
  }

  if (svg) {
    var want = [3, 2, 1, 0], pos = 0, last = 0;
    Array.prototype.forEach.call(svg.querySelectorAll('.node'), function (n) {
      n.addEventListener('click', function () {
        var i = +n.getAttribute('data-i'), now = Date.now();
        if (now - last > 2500) pos = 0;          // too slow: start over
        last = now;
        // every node answers a tap the same way, so the sequence gives nothing away
        n.classList.remove('tap'); void n.getBBox(); n.classList.add('tap');
        pos = i === want[pos] ? pos + 1 : (i === want[0] ? 1 : 0);
        if (pos === want.length) ignite();
      });
    });
  }

  var buf = '';
  document.addEventListener('keydown', function (e) {
    var el = e.target;
    if (e.ctrlKey || e.metaKey || e.altKey || (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)))) return;
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-4);
    if (buf === 'carl') ignite();
  });
})();
