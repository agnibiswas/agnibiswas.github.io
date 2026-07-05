/* =========================================================
   Agni Biswas — lens system
   Three directed narratives over the same career.
   Same "one idea" hook; different destination per visitor.
   Edit the copy freely — it's all here, in one place.
   ========================================================= */
(function () {
  'use strict';

  /* ----------------------------------------------------------
     LENS CONTENT
     Each lens reframes the SAME facts toward a different climax.
     Keys map to element IDs in index.html.
     ---------------------------------------------------------- */
  const LENSES = {
    robotics: {
      label: 'Robotics & Autonomy',
      accent: '#ff6a2b',            // ember — default
      roles: ['Autonomy Engineer', 'Systems Architect', 'Robotics Engineer', 'Controls & Autonomy'],
      heroSub:
        'I turn the physical world into signal, and signal into machines that decide for themselves. ' +
        'A decade across <strong>sensorics</strong>, <strong>embedded systems</strong> and <strong>autonomy</strong> — ' +
        'held together by one habit: solving the whole system, not one layer at a time.',
      pipeline: ['SENSE', 'MODEL', 'DECIDE', 'ACT'],
      pipelineCaption: '// the loop i\'ve spent a career building',
      arcTitle: 'If you connect the dots, it\u2019s one idea.',
      arcLede:
        'Every role looks like a jump on paper. It wasn\u2019t. Each step climbed one rung up the same ladder: ' +
        'from <em>measuring</em> the world, to <em>understanding</em> it, to letting machines <em>act</em> in it — safely, and on their own.',
      arc: [
        { h: 'Make the invisible measurable',
          w: 'Air-quality sensorics \u00b7 Bangalore &amp; Munich \u00b7 2013\u20132021',
          p: 'It started with air you couldn\u2019t see \u2014 multi-sensor platforms and fence-line monitors that turned pollution into real-time data. The lesson that stuck: an autonomous system is only as honest as the signal it\u2019s built on.' },
        { h: 'Own the device, end to end',
          w: 'Embedded systems &amp; firmware \u00b7 Hawa Dawa, Munich \u00b7 2018\u20132021',
          p: 'Sensors are nothing without the box around them. Schematic to multilayer PCB to firmware to field \u2014 owning every layer is where I learned to think in whole systems instead of handoffs. The habit that makes the autonomy stack hold together.' },
        { h: 'Go back to sharpen the theory',
          w: 'MSc, Mechatronics / Embedded Systems \u00b7 SDU, Denmark \u00b7 2021\u20132023',
          p: 'To build machines that reason, I needed the maths underneath them \u2014 control theory, real-time systems, and the simulation techniques that would become my daily tools.' },
        { h: 'Let the machine decide',
          w: 'Autonomy stacks \u00b7 Danfoss Power Solutions \u00b7 2023\u2013present',
          p: 'Now the loop closes. I architect autonomy for off-highway machines \u2014 perception, controls and safety as one system, from digital twin to production. The hard part was never making it work once. It\u2019s knowing the exact conditions under which it won\u2019t \u2014 and designing so it fails safe.',
          quote: '\u201cAutonomy is inherently a probability game. The challenge isn\u2019t making something work \u2014 it\u2019s figuring out the conditions under which the system falls apart.\u201d',
          cite: '\u2014 iVT Expo, Cologne' }
      ],
      climaxIndex: 3,
      buildTitle: 'Autonomy is four layers held to one contract.',
      buildLede:
        'An autonomous machine isn\u2019t one clever model \u2014 it\u2019s a stack where every layer has to trust the one below it. This is how I reason about the system. Hover a layer to see what lives there.',
      layers: {
        perception: { k: '// layer 01 — what the machine believes', t: 'Perception',
          d: 'Fusing sensors into a single, trustworthy world-model. My sensorics background pays off here \u2014 clean perception is a hardware problem as much as an algorithm one. Garbage signal in, confident wrong answer out.' },
        controls: { k: '// layer 02 — belief into motion', t: 'Controls',
          d: 'Translating intent into safe actuation on real hydraulics and drivetrains. Control theory meets the messy physics of off-highway machines \u2014 where a model that ignores load, latency or terrain gets someone hurt.' },
        safety: { k: '// layer 03 — the contract above all', t: 'Safety & Fail-safe',
          d: 'The layer that can veto every other. I design graceful degradation first, not last \u2014 autonomy is a probability game, and the real engineering is defining exactly how and when the system is allowed to fail.' },
        sim: { k: '// layer 04 — proven before real', t: 'Simulation / Digital Twin',
          d: 'Aligning virtual environments with real machine behaviour to test the thousand dangerous cases we never want on a real site. If the twin and the machine disagree, the twin is a lie \u2014 and I go find out why.' }
      },
      contactLede:
        'I\u2019m open to senior and architect roles in autonomy and robotics. If you\u2019re building machines that have to work \u2014 and fail safe \u2014 in the real world, let\u2019s talk.'
    },

    sensorics: {
      label: 'Sensorics',
      accent: '#35e0c0',            // signal teal
      roles: ['Sensor Systems Engineer', 'Sensorics & Perception', 'Signal-to-Trust Engineer', 'Sensor Fusion'],
      heroSub:
        'I turn the physical world into signal you can actually trust. ' +
        'A decade making <strong>the invisible measurable</strong> \u2014 from air-quality networks to sensor-perception under real machine physics \u2014 ' +
        'held together by one habit: a system is only as honest as the signal beneath it.',
      pipeline: ['SENSE', 'CALIBRATE', 'FUSE', 'TRUST'],
      pipelineCaption: '// signal is where every system succeeds or lies',
      arcTitle: 'It all comes back to the signal.',
      arcLede:
        'Every role looks like a jump on paper. It wasn\u2019t. Each step went deeper into one question: ' +
        'how do you take a messy physical measurement and make it <em>trustworthy</em> enough to act on?',
      arc: [
        { h: 'Make the invisible measurable',
          w: 'Air-quality sensorics \u00b7 TerraSense Labs, Bangalore \u00b7 2015\u20132017',
          p: 'It started with air you couldn\u2019t see. I led R&amp;D on multi-sensor platforms and the \u201cJellyfish\u201d fence-line monitor \u2014 sensor testing, calibration and benchmarking that fed the nationally-covered \u201cBreathe Bengaluru\u201d emissions study. First principle: a measurement you can\u2019t trust is worse than none.',
          quote: '\u201cA system is only as honest as the signal it\u2019s built on.\u201d',
          cite: '\u2014 the principle everything else is built on' },
        { h: 'Take the sensor to production',
          w: 'Embedded sensing hardware \u00b7 Hawa Dawa, Munich \u00b7 2018\u20132021',
          p: 'Calibration in a lab is easy; calibration at scale is the real problem. I built the embedded hardware, firmware and calibration tooling for large-scale real-time air-quality sensing \u2014 driving a ~40% cut in field failure rates across a fivefold fleet expansion. Signal integrity as a manufacturing discipline, not a bench trick.' },
        { h: 'Sharpen the theory under the signal',
          w: 'MSc, Mechatronics / Embedded Systems \u00b7 SDU, Denmark \u00b7 2021\u20132023',
          p: 'Estimation, filtering, real-time systems \u2014 the maths that turns raw sensor streams into state you can act on. In-company project: autonomous camera calibration (12/12). Thesis: real-time motor fault detection from sensor data.' },
        { h: 'Prove the signal under real physics',
          w: 'Sensor-in-the-loop validation \u00b7 Danfoss Power Solutions \u00b7 2023\u2013present',
          p: 'Now I close the loop on trust itself: physics-grade simulation that exposes how vibration, terrain and load corrupt perception <em>before</em> a machine ever hits a field. Sensor fusion and drift compensation validated against a digital twin \u2014 because if the twin and the sensor disagree, one of them is lying.' }
      ],
      climaxIndex: 0,
      buildTitle: 'Trustworthy signal is four problems, not one.',
      buildLede:
        'Clean perception isn\u2019t a model you download \u2014 it\u2019s a chain from raw transducer to a number you\u2019d stake a decision on. This is how I reason about signal. Hover a layer to see what lives there.',
      layers: {
        perception: { k: '// layer 01 — the raw transducer', t: 'Acquisition',
          d: 'The physics of the sensor itself \u2014 what it actually responds to, and what noise, drift and cross-sensitivity ride along. Most \u201calgorithm\u201d problems are acquisition problems in disguise.' },
        controls: { k: '// layer 02 — making it honest', t: 'Calibration & Compensation',
          d: 'Turning a raw reading into a trustworthy value: calibration, temperature/vibration compensation, drift correction. The unglamorous work that decides whether everything downstream is real.' },
        safety: { k: '// layer 03 — many sensors, one truth', t: 'Fusion & Estimation',
          d: 'EKF-grade fusion and state estimation that combines imperfect sources into one coherent belief \u2014 and knows how much to trust each one. A confident wrong estimate is the dangerous failure.' },
        sim: { k: '// layer 04 — proving trust before the field', t: 'Validation under Physics',
          d: 'Aligning sensor models with real machine behaviour in simulation, so vibration and terrain edge-cases surface in the twin \u2014 not on a live site. If the twin and the sensor disagree, I go find out why.' }
      },
      contactLede:
        'I\u2019m open to senior roles in sensorics, perception and sensor systems. If you\u2019re building something that lives or dies on signal quality, that\u2019s the problem I chase.'
    },

    embedded: {
      label: 'Embedded Systems',
      accent: '#ff8a54',            // ember-soft
      roles: ['Embedded Systems Engineer', 'Firmware & Mechatronics', 'Embedded & Sensorics', 'Systems / Firmware'],
      heroSub:
        'I take devices from schematic to shipped \u2014 silicon, firmware, and the physics in between. ' +
        'A decade owning <strong>the whole device</strong>, from multilayer PCB to production firmware to field reliability \u2014 ' +
        'held together by one habit: no handoffs, own every layer.',
      pipeline: ['SENSE', 'FIRMWARE', 'CONTROL', 'ACT'],
      pipelineCaption: '// silicon to field — the device, end to end',
      arcTitle: 'One idea: own the whole device.',
      arcLede:
        'Every role looks like a jump on paper. It wasn\u2019t. Each step deepened one discipline: ' +
        'taking a device from <em>schematic</em> to <em>firmware</em> to <em>the field</em> \u2014 and owning every layer in between.',
      arc: [
        { h: 'Firmware that moves things',
          w: 'Mobile automation &amp; AGVs \u00b7 iFuture Robotics, Bengaluru \u00b7 2017\u20132018',
          p: 'Redesigned embedded firmware and control software for autonomous sorters and AGV platforms \u2014 ~15% efficiency gain \u2014 and led distributed control-systems development (team of 4) over MQTT, C++ and Python. The products took 1st at SAP Startup Studio and Kickstart Zurich.' },
        { h: 'Own the device, silicon to sheet metal',
          w: 'Embedded hardware &amp; firmware \u00b7 Hawa Dawa, Munich \u00b7 2018\u20132021',
          p: 'Schematic, multilayer PCB (Eagle, with DFM), embedded firmware in C/C++, and the production/calibration tooling around it. Drove a fivefold increase in deployed devices and a ~40% cut in field failure rates over 3.5 years. This is the core: no layer handed off, every layer owned.',
          quote: '\u201cSensors are nothing without the box around them \u2014 own every layer, silicon to sheet metal.\u201d',
          cite: '\u2014 the through-line' },
        { h: 'Sharpen the systems theory',
          w: 'MSc, Mechatronics / Embedded Systems \u00b7 SDU, Denmark \u00b7 2021\u20132023',
          p: 'Real-time systems, control theory, and hardware-based AI acceleration (where I was a TA). Danish Government Scholarship. Thesis: intelligent real-time motor fault detection at Danfoss Power Electronics &amp; Drives (12/12).' },
        { h: 'Embedded meets autonomy at scale',
          w: 'Autonomy platforms \u00b7 Danfoss Power Solutions \u00b7 2023\u2013present',
          p: 'Embedded behaviour across four autonomy platforms \u2014 keeping real machine firmware and virtual validation in lockstep, wired into CI/CD on Azure via FMU/FMI. Including AI-assisted conversion of ROS2 drivers to MISRA-compliant embedded C for certifiable targets.' }
      ],
      climaxIndex: 1,
      buildTitle: 'Owning a device is four layers, no handoffs.',
      buildLede:
        'A shipped embedded product isn\u2019t firmware alone \u2014 it\u2019s the whole chain from copper to field reliability, and the seams are where devices die. This is how I reason about it. Hover a layer to see what lives there.',
      layers: {
        perception: { k: '// layer 01 — copper and components', t: 'Hardware & PCB',
          d: 'Schematic, multilayer PCB, and design-for-manufacturing from the start. The layer most firmware engineers treat as someone else\u2019s problem \u2014 and where I start, because the board decides what firmware can ever do.' },
        controls: { k: '// layer 02 — bringing the silicon to life', t: 'Firmware & Drivers',
          d: 'Bare-metal and RTOS firmware in C/C++, sensor bring-up, register-level drivers (I2C/SPI), and porting prototype code to certifiable, MISRA-compliant targets.' },
        safety: { k: '// layer 03 — real-time and safe', t: 'Control & Real-time',
          d: 'Deterministic control loops on real actuators \u2014 hydraulics, drivetrains, motors \u2014 where latency and jitter aren\u2019t abstractions. Control theory meeting the constraints of the actual chip it runs on.' },
        sim: { k: '// layer 04 — shipped and reliable', t: 'Production & Field',
          d: 'Calibration tooling, manufacturing scale-up, and field-failure reduction \u2014 the difference between a demo and a fleet. Where I\u2019ve driven ~40% failure-rate cuts across 5\u00d7 device growth.' }
      },
      contactLede:
        'I\u2019m open to senior roles in embedded systems, firmware and mechatronics. If you need someone who owns the device from copper to field, let\u2019s talk.'
    }
  };

  const ORDER = ['robotics', 'sensorics', 'embedded'];
  const DEFAULT = 'robotics';

  /* ---------- helpers ---------- */
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyLens(key) {
    const L = LENSES[key];
    if (!L) return;

    // accent tint
    document.documentElement.style.setProperty('--ember', L.accent);

    // hero subtitle
    const sub = $('heroSub');
    if (sub) sub.innerHTML = L.heroSub;

    // pipeline diagram labels
    L.pipeline.forEach((word, i) => {
      const t = document.querySelector('#pipeline .node[data-i="' + i + '"] text');
      if (t) t.textContent = word;
    });
    const cap = $('pipelineCaption');
    if (cap) cap.textContent = L.pipelineCaption;

    // arc title + lede
    if ($('arcTitle')) $('arcTitle').innerHTML = L.arcTitle;
    if ($('arcLede')) $('arcLede').innerHTML = L.arcLede;

    // arc steps
    L.arc.forEach((step, i) => {
      const n = i + 1;
      if ($('arcH' + n)) $('arcH' + n).innerHTML = step.h;
      if ($('arcW' + n)) $('arcW' + n).innerHTML = step.w;
      if ($('arcP' + n)) $('arcP' + n).innerHTML = step.p;
      // pull quote — only render on the climax step for this lens
      const q = $('arcQ' + n);
      if (q) {
        if (step.quote) {
          q.innerHTML = step.quote + '<cite>' + (step.cite || '') + '</cite>';
          q.hidden = false;
        } else {
          q.hidden = true;
          q.innerHTML = '';
        }
      }
      // highlight the climax step
      const li = $('arcStep' + n);
      if (li) li.classList.toggle('climax', i === L.climaxIndex);
    });

    // "how i build"
    if ($('buildTitle')) $('buildTitle').innerHTML = L.buildTitle;
    if ($('buildLede')) $('buildLede').innerHTML = L.buildLede;

    // architecture layer content — expose for script.js's interaction
    window.__LAYER_CONTENT__ = L.layers;
    // update the layer BUTTON labels too (names differ per lens)
    const layerKeys = ['perception', 'controls', 'safety', 'sim'];
    document.querySelectorAll('.arch-layer').forEach((btn) => {
      const c = L.layers[btn.dataset.layer];
      if (!c) return;
      const nameEl = btn.querySelector('.arch-layer-name');
      if (nameEl) nameEl.textContent = c.t;
    });
    // reset the arch detail panel to the intro for this lens
    const detail = $('archDetail');
    if (detail && !detail.dataset.touched) {
      // leave intro copy; only refresh if user hasn't interacted yet this session
    }

    // contact lede
    if ($('contactLede')) $('contactLede').innerHTML = L.contactLede;

    // switcher active state
    document.querySelectorAll('.lens-btn').forEach((b) =>
      b.classList.toggle('active', b.dataset.lens === key));

    // remember choice for the session (in-memory only; no storage APIs)
    window.__ACTIVE_LENS__ = key;
  }

  /* ---------- build the switcher ---------- */
  function buildSwitcher() {
    const mount = $('lensSwitch');
    if (!mount) return;
    mount.innerHTML =
      '<span class="lens-label mono">view as \u2192</span>' +
      ORDER.map((k) =>
        '<button class="lens-btn" data-lens="' + k + '" type="button">' +
        LENSES[k].label + '</button>'
      ).join('');
    mount.querySelectorAll('.lens-btn').forEach((b) => {
      b.addEventListener('click', () => applyLens(b.dataset.lens));
    });
  }

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    buildSwitcher();
    applyLens(DEFAULT);
  });
})();
