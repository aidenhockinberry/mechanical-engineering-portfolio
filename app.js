/* ==========================================================================
   AIDEN HOCKINBERRY - MECHANICAL ENGINEERING PORTFOLIO SCRIPT (app.js)
   ========================================================================== */

function trackAnalytics(eventName, eventParams = {}) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventParams);
    }
  } catch (err) {
    // Fail silently so adblockers never interrupt user experience
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initEngineGallery();
  initCadViewers();
  initRocketStages();
  initConnect4Iterations();
  initFilters();
  initThemeToggle();
  initExportStudio();
  initSmoothScroll();
});

/* ==========================================================================
   1. PISTON ENGINE GALLERY GENERATOR (27 Variants from PDF)
   ========================================================================== */
const engineImages = [
  { file: 'p6_img1_521.png', name: 'Variant #01: Inline-4 Overhead Cam Block' },
  { file: 'p6_img2_522.png', name: 'Variant #02: V-8 High-Torque Multi-Cylinder' },
  { file: 'p6_img3_523.png', name: 'Variant #03: Radial 5-Cylinder Aero Configuration' },
  { file: 'p6_img4_524.png', name: 'Variant #04: Boxer Flat-4 Low Center-of-Gravity' },
  { file: 'p6_img5_525.png', name: 'Variant #05: Twin-Cam Cross-Plane Crankshaft' },
  { file: 'p6_img6_526.png', name: 'Variant #06: Compact High-RPM Inline-3' },
  { file: 'p6_img7_527.png', name: 'Variant #07: Heavy-Duty Industrial V-12' },
  { file: 'p6_img8_528.png', name: 'Variant #08: Modular Piston Manifold Assembly' },
  { file: 'p6_img9_529.png', name: 'Variant #09: Dual-Stroke Synchronized Valvetrain' },
  { file: 'p6_img10_530.png', name: 'Variant #10: Stepped Compression Chamber' },
  { file: 'p6_img11_531.png', name: 'Variant #11: 90-Degree Crosshead Piston Engine' },
  { file: 'p6_img12_532.png', name: 'Variant #12: Reinforced Structural Gantry Engine' },
  { file: 'p6_img13_533.png', name: 'Variant #13: Supercharged Plenum Intake Block' },
  { file: 'p6_img14_534.png', name: 'Variant #14: Opposed-Piston Two-Stroke Design' },
  { file: 'p6_img15_535.png', name: 'Variant #15: High-Displacement V-Twin Configuration' },
  { file: 'p6_img16_536.png', name: 'Variant #16: Multi-Stage Gear-Timed Crank' },
  { file: 'p6_img17_537.png', name: 'Variant #17: Low-Friction Lightweight Connecting Rods' },
  { file: 'p6_img18_538.png', name: 'Variant #18: Cantilever Bearing Support Engine' },
  { file: 'p6_img19_539.png', name: 'Variant #19: Precision Timing Belt Dual-Cam' },
  { file: 'p6_img20_540.png', name: 'Variant #20: Symmetrical Dual-Cylinder Boxer' },
  { file: 'p6_img21_541.png', name: 'Variant #21: High-Efficiency Scavenging Engine' },
  { file: 'p6_img22_542.png', name: 'Variant #22: Harmonic Balancer Integrated Block' },
  { file: 'p6_img23_543.png', name: 'Variant #23: Offset Wrist-Pin Low Side-Load Engine' },
  { file: 'p6_img24_544.png', name: 'Variant #24: High-Pressure Direct-Port Engine' },
  { file: 'p6_img25_545.png', name: 'Variant #25: Dual-Exhaust Tuned Header Block' },
  { file: 'p6_img26_546.png', name: 'Variant #26: Variable Stroke Ratio Prototype' },
  { file: 'p6_img27_547.png', name: 'Variant #27: Multi-Linkage Dynamic Piston Engine' }
];

function initEngineGallery() {
  const container = document.getElementById('engineGalleryGrid');
  if (!container) return;

  container.innerHTML = '';
  engineImages.forEach((eng, index) => {
    const item = document.createElement('div');
    item.className = 'engine-item';
    item.title = `${eng.name} - Click to inspect CAD`;
    item.innerHTML = `
      <img src="assets/images/${eng.file}?v=white" alt="${eng.name}" class="engine-thumb" loading="lazy">
      <span class="engine-number">#${String(index + 1).padStart(2, '0')}</span>
    `;
    item.addEventListener('click', () => {
      openLightbox(`assets/images/${eng.file}?v=white`, `Virtual Piston Engine Prototype: ${eng.name}. Designed & stress-tested in real-time physics engine for torque optimization, timing efficiency, and structural equilibrium.`);
    });
    container.appendChild(item);
  });
}

/* ==========================================================================
   2. MULTI-VIEW CAD SWITCHER (Automotive Chassis)
   ========================================================================== */
let activeCadSrc = 'assets/images/sm_car/sm_front_view.png';
let activeCadTitle = 'Mechanical Automotive Chassis - FRONT VIEW (Twin-wheel steering alignment & suspension geometry)';

function initCadViewers() {
  const btns = document.querySelectorAll('.cad-viewer-container .cad-view-btn');
  const img = document.getElementById('autoCadImg');

  const titles = {
    front: 'Mechanical Automotive Chassis - FRONT VIEW (Twin-wheel steering alignment & suspension geometry)',
    back: 'Mechanical Automotive Chassis - REAR VIEW (Rear axle power transfer & engine mounting)',
    side: 'Mechanical Automotive Chassis - SIDE VIEW (Central piston engine mounting & wheelbase geometry)',
    detail: 'Mechanical Automotive Chassis - SUSPENSION & UNIVERSAL JOINT (Drivetrain kinematics & angular deflection)',
    hub: 'Mechanical Automotive Chassis - WHEEL HUB & KNUCKLE ASSEMBLY (Dual-strut dampers & kingpin inclination)'
  };

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const src = btn.getAttribute('data-src');
      const view = btn.getAttribute('data-view');
      activeCadSrc = src;
      activeCadTitle = titles[view] || 'Automotive CAD View';

      if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = src;
          img.style.opacity = '1';
        }, 150);
      }
    });
  });
}

function openActiveCadLightbox() {
  openLightbox(activeCadSrc, activeCadTitle);
}

/* ==========================================================================
   2a. AUTOMOTIVE CHASSIS TAB SWITCHER (CAD vs All Photos)
   ========================================================================== */
function switchChassisTab(tabId, btnElement) {
  const panes = document.querySelectorAll('.chassis-tab-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  const target = document.getElementById(`chassis-tab-${tabId}`);
  if (target) {
    target.classList.add('active');
  }

  const buttons = document.querySelectorAll('.chassis-tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const defaultBtn = document.getElementById(`chassisTabBtn-${tabId}`);
    if (defaultBtn) defaultBtn.classList.add('active');
  }
}
window.switchChassisTab = switchChassisTab;

/* ==========================================================================
   2b. ESCAPEMENT & RATCHET SYSTEM TAB SWITCHER
   ========================================================================== */
function switchEscapementTab(tabId, btnElement) {
  // Hide all escapement tab panes
  const panes = document.querySelectorAll('.escapement-tab-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  // Show target tab pane
  const target = document.getElementById(`escapement-tab-${tabId}`);
  if (target) {
    target.classList.add('active');
  }

  // Update tab buttons
  const buttons = document.querySelectorAll('.escapement-tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const defaultBtn = document.getElementById(`escapementTabBtn-${tabId}`);
    if (defaultBtn) defaultBtn.classList.add('active');
  }

  // If switching away from 3D while in fullscreen, restore view
  if (tabId !== '3d') {
    const card = document.getElementById('escapementStlCard');
    if (card && card.classList.contains('fullscreen')) {
      toggleEscapementFullscreen();
    }
  }

  // If switching to 3D tab, initialize or resize
  if (tabId === '3d') {
    if (!escapement3D.initialized) {
      initEscapement3DViewer();
    } else {
      setTimeout(onEscapementResize, 50);
    }
    trackAnalytics('inspect_3d_stl_model', { model: 'cylinder_escapement' });
  }
}
window.switchEscapementTab = switchEscapementTab;

/* ==========================================================================
   2c. RUBIK'S CUBE SOLVER TAB SWITCHER
   ========================================================================== */
function switchRubiksTab(tabId, btnElement) {
  // Hide all rubiks tab panes
  const panes = document.querySelectorAll('.rubiks-tab-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  // Show target tab pane
  const target = document.getElementById(`rubiks-tab-${tabId}`);
  if (target) {
    target.classList.add('active');
  }

  // Update tab buttons
  const buttons = document.querySelectorAll('.rubiks-tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const defaultBtn = document.getElementById(`rubiksTabBtn-${tabId}`);
    if (defaultBtn) defaultBtn.classList.add('active');
  }
}
window.switchRubiksTab = switchRubiksTab;

/* ==========================================================================
   2d. BIOMIMETIC ROBOTICS & KINEMATICS TAB SWITCHER
   ========================================================================== */
function switchKinematicsTab(tabId, btnElement) {
  // Hide all kinematics tab panes
  const panes = document.querySelectorAll('.kinematics-tab-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  // Show target tab pane
  const target = document.getElementById(`kinematics-tab-${tabId}`);
  if (target) {
    target.classList.add('active');
  }

  // Update tab buttons
  const buttons = document.querySelectorAll('.kinematics-tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const defaultBtn = document.getElementById(`kinematicsTabBtn-${tabId}`);
    if (defaultBtn) defaultBtn.classList.add('active');
  }
}
window.switchKinematicsTab = switchKinematicsTab;

/* ==========================================================================
   2e. MOTORIZED HEXAPOD KINEMATIC WALKER TAB SWITCHER
   ========================================================================== */
function switchWalkerTab(tabId, btnElement) {
  // Hide all walker tab panes
  const panes = document.querySelectorAll('.walker-tab-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  // Show target tab pane
  const target = document.getElementById(`walker-tab-${tabId}`);
  if (target) {
    target.classList.add('active');
  }

  // Update tab buttons
  const buttons = document.querySelectorAll('.walker-tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const defaultBtn = document.getElementById(`walkerTabBtn-${tabId}`);
    if (defaultBtn) defaultBtn.classList.add('active');
  }
}
window.switchWalkerTab = switchWalkerTab;

/* ==========================================================================
   2f. WIND-POWERED KINEMATIC TRANSPORT (CRAWLER) TAB SWITCHER
   ========================================================================== */
function switchCrawlerTab(tabId, btnElement) {
  // Hide all crawler tab panes
  const panes = document.querySelectorAll('.crawler-tab-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  // Show target tab pane
  const target = document.getElementById(`crawler-tab-${tabId}`);
  if (target) {
    target.classList.add('active');
  }

  // Update tab buttons
  const buttons = document.querySelectorAll('.crawler-tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const defaultBtn = document.getElementById(`crawlerTabBtn-${tabId}`);
    if (defaultBtn) defaultBtn.classList.add('active');
  }
}
window.switchCrawlerTab = switchCrawlerTab;

/* ==========================================================================
   2g. KINEMATIC GENEVA MECHANISMS TAB SWITCHER
   ========================================================================== */
function switchGenevaTab(tabId, btnElement) {
  // Hide all geneva tab panes
  const panes = document.querySelectorAll('.geneva-tab-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  // Show target tab pane
  const target = document.getElementById(`geneva-tab-${tabId}`);
  if (target) {
    target.classList.add('active');
  }

  // Update tab buttons
  const buttons = document.querySelectorAll('.geneva-tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const defaultBtn = document.getElementById(`genevaTabBtn-${tabId}`);
    if (defaultBtn) defaultBtn.classList.add('active');
  }
}
window.switchGenevaTab = switchGenevaTab;

/* ==========================================================================
   2h. MONOLITHIC COMPLIANT YES/NO DECISION INDEXER TAB SWITCHER
   ========================================================================== */
function switchYesNoTab(tabId, btnElement) {
  // Hide all yesno tab panes
  const panes = document.querySelectorAll('.yesno-tab-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  // Show target tab pane
  const target = document.getElementById(`yesno-tab-${tabId}`);
  if (target) {
    target.classList.add('active');
  }

  // Update tab buttons
  const buttons = document.querySelectorAll('.yesno-tab-btn');
  buttons.forEach(b => b.classList.remove('active'));

  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const defaultBtn = document.getElementById(`yesnoTabBtn-${tabId}`);
    if (defaultBtn) defaultBtn.classList.add('active');
  }
}
window.switchYesNoTab = switchYesNoTab;


/* ==========================================================================
   3. SIMULATED ROCKET STAGES INTERACTIVE VIEWER (Mun Mission)
   ========================================================================== */
const stageData = {
  1: {
    title: 'Stage 1: High TWR Atmospheric Escape (Solid Rocket Boosters)',
    desc: 'High thrust-to-weight solid rocket boosters engineered to overcome aerodynamic drag in Kerbin’s thick sea-level atmosphere with maximum initial impulse.',
    img: 'assets/images/p8_img3_569.jpeg'
  },
  2: {
    title: 'Stage 2: Booster Core & Gravity Turn Ascent Profile',
    desc: 'Liquid-fueled core stage executing a continuous gravity turn starting at 70km altitude to trade vertical momentum for horizontal orbital insertion velocity.',
    img: 'assets/images/p8_img3_569.jpeg'
  },
  3: {
    title: 'Stage 3: Trans-Munar Injection (TMI) & Vacuum Isp Optimization',
    desc: 'High vacuum specific impulse (Isp) stage executing precise burn nodes for Hohmann transfer orbit insertion from low parking orbit to the Mun.',
    img: 'assets/images/p8_img6_573.png'
  },
  4: {
    title: 'Stage 4: Munar Descent & Ascent Stage (Lander Module)',
    desc: 'Low-gravity throttleable lander with wide-stance landing legs designed for surface stability, terrain impact dampening, and subsequent lunar ascent.',
    img: 'assets/images/p9_img1_578.jpeg'
  },
  5: {
    title: 'Stage 5: Command Module & Parachute Atmospheric Recovery',
    desc: 'Aerodynamic heat-shielded capsule configured with staged drogue and main recovery parachutes for safe splashdown return.',
    img: 'assets/images/p9_img2_579.png'
  }
};

let currentStageId = 1;

function initRocketStages() {
  const stageBtns = document.querySelectorAll('.stage-btn');
  const stageImg = document.getElementById('rocketStageImg');
  const titleEl = document.getElementById('stageDetailTitle');
  const descEl = document.getElementById('stageDetailDesc');

  stageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const stageId = btn.getAttribute('data-stage');
      currentStageId = stageId;
      const data = stageData[stageId];
      if (!data) return;

      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;
      if (stageImg) {
        stageImg.style.opacity = '0';
        setTimeout(() => {
          stageImg.src = data.img;
          stageImg.style.opacity = '1';
        }, 150);
      }
    });
  });
}

function openActiveStageLightbox() {
  const data = stageData[currentStageId];
  if (data) {
    openLightbox(data.img, data.title + ' — ' + data.desc);
  }
}

/* ==========================================================================
   4. POCKET CONNECT 4 SNAP-FIT 5-STAGE ITERATION CONTROLLER (PDF Page 14)
   ========================================================================== */
const connect4Stages = {
  1: {
    name: 'V1: Loose Friction-Fit Enclosure (Too Loose, No Snap)',
    desc: 'Initial baseline prototype attempted a basic slip-on friction enclosure around the token grid without dedicated mechanical interlocks.',
    statusClass: 'failure',
    statusText: '⚠️ Failure Mode: Zero Positive Retention',
    modelImg: 'assets/images/connect4_model_v1.png',
    circleImg: null,
    circleCaption: '',
    rootCause: 'Thermal shrinkage and layer tolerance stack-up in FDM printing caused unpredictable friction. Zero mechanical detent meant any minor vibration or inversion caused the case to slip off, spilling all 42 game tokens.',
    nextStep: 'Transition from passive friction fit to active mechanical latching by introducing an external snap hook tab to achieve positive locking.'
  },
  2: {
    name: 'V2: Case Hook Tab (Hook is Brittle & Keeps Breaking)',
    desc: 'Added an exterior cantilever hook catch protruding from the base to positively clip the top lid shut.',
    statusClass: 'failure',
    statusText: '⚠️ Failure Mode: Anisotropic Layer Delamination & Stress Fracture',
    modelImg: 'assets/images/connect4_model_v2.png',
    circleImg: 'assets/images/connect4_circle_v2.png',
    circleCaption: '<strong>Stress Concentration at 90° Root:</strong> Tensile bending loads perpendicular to FDM layer lines caused brittle inter-layer cleavage failure.',
    rootCause: 'In FDM additive manufacturing, tensile strength is weakest across the Z-axis layer lines. Combined with a sharp 90-degree corner root (high Kt stress concentration factor), bending the hook snapped it off along layer boundaries after minimal cycle counts.',
    nextStep: 'Re-engineer the latch into an internal dual-cantilever flexure ("pincher") with stress-relief root fillets and shielded flexure arms.'
  },
  3: {
    name: 'V3: Dual Pincher Case Gen 1 (Too Hard to Open)',
    desc: 'Transitioned to an internal dual-cantilever flexure mechanism with top squeeze tabs to protect the latch elements.',
    statusClass: 'failure',
    statusText: '⚠️ Failure Mode: Over-Stiff Beam (High Actuation Effort)',
    modelImg: 'assets/images/connect4_model_v3.png',
    circleImg: 'assets/images/connect4_circle_v3.png',
    circleCaption: '<strong>Internal Interference Latch:</strong> Steep undercut angle and short beam length generated excessive deflection resistance.',
    rootCause: 'Cantilever beam bending stiffness scales inversely with length cubed (k = 3EI / L³). The initial flexure arms were too short and thick (I = bh³ / 12), requiring thumb pinch forces far exceeding comfortable human grip limits.',
    nextStep: 'Extend the cantilever beam moment arm, reduce wall thickness, and integrate shallow lead-in wedge chamfers to lower actuation resistance.'
  },
  4: {
    name: 'V4: Pincher Case Gen 2 (Angle & Deflection Tuning)',
    desc: 'Optimized flexure arm length and added internal lead-in angle chamfers for smoother insertion and release.',
    statusClass: 'refinement',
    statusText: '🔄 Refinement: Tactile Angle & Deflection Calibration',
    modelImg: 'assets/images/connect4_model_v4.png',
    circleImg: 'assets/images/connect4_circle_v4.png',
    circleCaption: '<strong>Tapered Lead-In Chamfer:</strong> 45° entry ramp reduced insertion force, but single-sided pinch caused binding.',
    rootCause: 'While insertion force was reduced, the release undercut was prone to asymmetrical tilting when squeezed off-center, causing momentary mechanical binding.',
    nextStep: 'Calibrate the precise 0.22mm air gap clearance on Creality Ender 3 V3 KE and add symmetric release cutouts for smooth one-handed pinching.'
  },
  5: {
    name: 'V5: Final Compliant Cantilever Snap-Top Lid (Optimized Production Fit)',
    desc: 'Fully realized production-grade compliant mechanism featuring generous stress-relief fillets, calibrated 0.22mm air gap, and ergonomic pinch release.',
    statusClass: 'success',
    statusText: '✅ Production Success: 0.22mm Calibrated Air Gap Tolerance',
    modelImg: 'assets/images/connect4_model_v5.png',
    circleImg: 'assets/images/connect4_circle_v5.png',
    circleCaption: '<strong>Optimized Compliant Flexure:</strong> Balanced retention tooth with stress-relief fillet and 0.22mm FDM air gap tolerance.',
    rootCause: 'Achieved the optimal balance between positive retention force (0% accidental travel spillage) and smooth ergonomic thumb release with zero fatigue deformation over hundreds of cycles.',
    nextStep: 'Successfully validated on Creality Ender 3 V3 KE with PLA material; production file finalized.'
  }
};

let currentConnect4Stage = 1;

function initConnect4Iterations() {
  const stepBtns = document.querySelectorAll('.iteration-step-btn[data-stage]');
  if (!stepBtns.length) return;

  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const stage = parseInt(btn.getAttribute('data-stage'), 10);
      selectConnect4Stage(stage);
    });
  });
}

function selectConnect4Stage(stageNum) {
  const data = connect4Stages[stageNum];
  if (!data) return;

  currentConnect4Stage = stageNum;

  // Update button active classes
  const stepBtns = document.querySelectorAll('.iteration-step-btn[data-stage]');
  stepBtns.forEach(btn => {
    const s = parseInt(btn.getAttribute('data-stage'), 10);
    btn.classList.toggle('active', s === stageNum);
  });

  // Update text elements
  const stageName = document.getElementById('connect4StageName');
  const stageDesc = document.getElementById('connect4StageDesc');
  const statusPill = document.getElementById('connect4StatusPill');
  const rootCause = document.getElementById('connect4RootCause');
  const nextStep = document.getElementById('connect4NextStep');

  if (stageName) stageName.textContent = data.name;
  if (stageDesc) stageDesc.textContent = data.desc;
  if (rootCause) rootCause.textContent = data.rootCause;
  if (nextStep) nextStep.textContent = data.nextStep;

  if (statusPill) {
    statusPill.className = `iteration-status-pill ${data.statusClass}`;
    statusPill.innerHTML = `<span>${data.statusText}</span>`;
  }

  // Update model image with smooth transition
  const modelImg = document.getElementById('connect4ModelImg');
  if (modelImg) {
    modelImg.style.opacity = '0';
    setTimeout(() => {
      modelImg.src = data.modelImg;
      modelImg.alt = data.name;
      modelImg.style.opacity = '1';
    }, 150);
  }

  // Update zoom circle inset
  const zoomRow = document.getElementById('connect4ZoomRow');
  const circleImg = document.getElementById('connect4CircleImg');
  const circleCaption = document.getElementById('connect4CircleCaption');

  if (zoomRow && circleImg && circleCaption) {
    if (data.circleImg) {
      zoomRow.style.display = 'grid';
      circleImg.src = data.circleImg;
      circleCaption.innerHTML = data.circleCaption;
    } else {
      zoomRow.style.display = 'none';
    }
  }
}

function openActiveConnect4ModelLightbox() {
  const data = connect4Stages[currentConnect4Stage];
  if (data) {
    openLightbox(data.modelImg, `Pocket Connect 4 CAD Model: ${data.name}. ${data.desc}`);
  }
}

function openActiveConnect4CircleLightbox() {
  const data = connect4Stages[currentConnect4Stage];
  if (data && data.circleImg) {
    openLightbox(data.circleImg, `Micro-Mechanism Detail: ${data.name}. ${data.circleCaption.replace(/<[^>]*>?/gm, '')}`);
  }
}

/* ==========================================================================
   6. ERA & DISCIPLINE FILTERING
   ========================================================================== */
function initFilters() {
  const eraTabs = document.querySelectorAll('.era-tab');
  const disciplineBtns = document.querySelectorAll('.discipline-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const eraSections = document.querySelectorAll('.era-section-group');

  let activeEra = 'all';
  let activeDiscipline = 'all';

  function applyFilters() {
    let visibleIndex = 0;
    projectCards.forEach(card => {
      const cardEra = card.getAttribute('data-era') || '';
      const cardDisc = card.getAttribute('data-discipline') || '';

      const matchesEra = activeEra === 'all' || cardEra.includes(activeEra);
      const matchesDisc = activeDiscipline === 'all' || cardDisc.includes(activeDiscipline);

      if (matchesEra && matchesDisc) {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        // Stagger layout: pictures and write-up flip every other visible section
        card.classList.toggle('card-reversed', visibleIndex % 2 === 1);
        visibleIndex++;
      } else {
        card.style.display = 'none';
        card.classList.remove('card-reversed');
      }
    });

    // Also toggle section visibility if filtered by era
    eraSections.forEach(sec => {
      const group = sec.getAttribute('data-era-group');
      if (activeEra === 'all' || activeEra === group) {
        sec.style.display = 'block';
      } else {
        sec.style.display = 'none';
      }
    });
  }

  eraTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      eraTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeEra = tab.getAttribute('data-era');
      applyFilters();
    });
  });

  disciplineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      disciplineBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDiscipline = btn.getAttribute('data-discipline');
      applyFilters();
    });
  });
}

/* ==========================================================================
   5. LIGHTBOX MODAL (Full Resolution CAD & Diagrams)
   ========================================================================== */
function openTableLightbox() {
  openDualLightbox(
    'assets/images/end_table_1.png',
    'assets/images/real_end_table_2.jpg',
    'Console End Table - 3D CAD vs Real-Life Reference',
    '<strong>Observational 3D CAD Modeling:</strong> Direct side-by-side comparison between the Autodesk Fusion 360 parametric CAD solid model and the real-world console table that inspired it. Recreated in Fusion 360 by observing the physical table\'s cross-braced frame, slatted lower shelf, and overall proportions.',
    {
      cadBadge: '📐 Autodesk Fusion 360',
      cadType: '3D Parametric CAD Solid Model',
      cadFooter: 'Modeled angled cross-braces, slatted shelf, and tabletop rebate',
      realBadge: '📷 Real-Life Reference',
      realType: 'Observed Object (real_end_table_2)',
      realFooter: 'Physical console table observed in real life and referenced for CAD modeling',
      activeItem: 'table'
    }
  );
}

function handleChairImgError(imgEl) {
  if (!imgEl) return;
  const candidates = [
    'assets/images/real_chair_1.jpg',
    'assets/images/real_chair.jpg',
    'assets/images/real_chair_1.png',
    'assets/images/real_chair.png',
    'assets/images/real_chair_1.jpeg',
    'assets/images/real_chair.jpeg'
  ];
  let currentIdx = parseInt(imgEl.dataset.tryIdx || '0', 10);
  currentIdx++;
  if (currentIdx < candidates.length) {
    imgEl.dataset.tryIdx = currentIdx.toString();
    imgEl.src = candidates[currentIdx];
  }
}

function openChairLightbox() {
  const chairImg = document.getElementById('fusionRealChairImg');
  const realSrc = (chairImg && chairImg.currentSrc) ? chairImg.currentSrc : 'assets/images/real_chair_1.jpg';
  openDualLightbox(
    'assets/images/gaming_chair_1.png',
    realSrc,
    'Ergonomic Gaming/Office Chair - 3D CAD vs Real-Life Reference',
    '<strong>Observational 3D CAD Modeling:</strong> Direct comparison between the Autodesk Fusion 360 multi-part ergonomic chair CAD model and the real-life chair observed in person. Recreated curved contours, lumbar curvature, armrests, and 5-wheel swivel base from visual observation.',
    {
      cadBadge: '📐 Autodesk Fusion 360',
      cadType: '3D Parametric CAD Solid Model',
      cadFooter: 'Multi-part seat assembly, contoured lumbar support & armrest details',
      realBadge: '📷 Real-Life Reference',
      realType: 'Observed Object (real_chair)',
      realFooter: 'Physical chair observed in real life and referenced for CAD modeling',
      activeItem: 'chair'
    }
  );
}

function openLightbox(src, caption) {
  // If user clicks on chair images, show chair dual comparison modal
  if (src && (src.includes('chair') || src.includes('gaming_chair'))) {
    return openChairLightbox();
  }
  // If user clicks on end table or real table image, show table dual comparison modal
  if (src && (src.includes('end_table') || src.includes('real_end_table'))) {
    return openTableLightbox();
  }

  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const video = document.getElementById('lightboxVideo');
  const dualContainer = document.getElementById('lightboxDualContainer');
  const dualControls = document.getElementById('dualViewControls');
  const itemSwitcher = document.getElementById('modalItemSwitcher');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');
  if (!modal || !img) return;

  modal.classList.remove('modal-dual-active');
  if (dualContainer) dualContainer.style.display = 'none';
  if (dualControls) dualControls.style.display = 'none';
  if (itemSwitcher) itemSwitcher.style.display = 'none';

  if (video) {
    video.pause();
    video.style.display = 'none';
    video.src = '';
  }
  img.style.display = 'block';
  img.src = src;
  if (titleEl) titleEl.textContent = 'High-Resolution Blueprint & Build';
  if (captionEl) captionEl.innerHTML = caption || 'High-Resolution CAD / Prototype Diagram';
  modal.classList.add('open');
  trackAnalytics('view_blueprint_lightbox', { image_src: src, caption: caption || '' });
}

function openDualLightbox(cadSrc, realSrc, title, caption, meta) {
  if (cadSrc === 'chair') return openChairLightbox();
  if (cadSrc === 'table') return openTableLightbox();
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const video = document.getElementById('lightboxVideo');
  const dualContainer = document.getElementById('lightboxDualContainer');
  const dualCadImg = document.getElementById('dualCadImg');
  const dualRealImg = document.getElementById('dualRealImg');
  const dualControls = document.getElementById('dualViewControls');
  const itemSwitcher = document.getElementById('modalItemSwitcher');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');
  if (!modal) return;

  if (video) {
    video.pause();
    video.style.display = 'none';
    video.src = '';
  }
  if (img) img.style.display = 'none';
  if (dualContainer) dualContainer.style.display = 'block';
  if (dualControls) dualControls.style.display = 'flex';
  if (itemSwitcher) itemSwitcher.style.display = 'flex';
  if (dualCadImg) dualCadImg.src = cadSrc || 'assets/images/end_table_1.png';
  if (dualRealImg) {
    dualRealImg.src = realSrc || 'assets/images/real_end_table_2.jpg';
    dualRealImg.onerror = function() {
      if (realSrc && realSrc.includes('chair')) {
        handleChairImgError(this);
      }
    };
  }

  // Update dynamic metadata badges
  if (meta) {
    const cadBadge = document.getElementById('dualCadBadge');
    const cadType = document.getElementById('dualCadType');
    const cadFooter = document.getElementById('dualCadFooter');
    const realBadge = document.getElementById('dualRealBadge');
    const realType = document.getElementById('dualRealType');
    const realFooter = document.getElementById('dualRealFooter');
    const switchTable = document.getElementById('modalSwitchTable');
    const switchChair = document.getElementById('modalSwitchChair');

    if (cadBadge && meta.cadBadge) cadBadge.textContent = meta.cadBadge;
    if (cadType && meta.cadType) cadType.textContent = meta.cadType;
    if (cadFooter && meta.cadFooter) cadFooter.textContent = meta.cadFooter;
    if (realBadge && meta.realBadge) realBadge.textContent = meta.realBadge;
    if (realType && meta.realType) realType.textContent = meta.realType;
    if (realFooter && meta.realFooter) realFooter.textContent = meta.realFooter;

    if (switchTable && switchChair) {
      if (meta.activeItem === 'chair') {
        switchChair.classList.add('active');
        switchTable.classList.remove('active');
      } else {
        switchTable.classList.add('active');
        switchChair.classList.remove('active');
      }
    }
  }

  modal.classList.add('modal-dual-active');

  setDualLightboxView('both');

  if (titleEl) titleEl.textContent = title || '3D CAD vs Real-Life Reference Comparison';
  if (captionEl) {
    captionEl.innerHTML = caption || '<strong>Observational 3D CAD Modeling:</strong> Direct side-by-side comparison between Autodesk Fusion 360 CAD model and real-life reference object.';
  }
  modal.classList.add('open');
  trackAnalytics('view_cad_comparison', { item: title || 'CAD vs Reference' });
}

function setDualLightboxView(mode) {
  const grid = document.getElementById('dualComparisonGrid');
  const cadPane = document.getElementById('dualCadPane');
  const realPane = document.getElementById('dualRealPane');
  const btnBoth = document.getElementById('dualBtnBoth');
  const btnCad = document.getElementById('dualBtnCad');
  const btnReal = document.getElementById('dualBtnReal');

  [btnBoth, btnCad, btnReal].forEach(btn => { if (btn) btn.classList.remove('active'); });

  if (mode === 'cad') {
    if (grid) grid.style.gridTemplateColumns = '1fr';
    if (cadPane) cadPane.style.display = 'flex';
    if (realPane) realPane.style.display = 'none';
    if (btnCad) btnCad.classList.add('active');
  } else if (mode === 'real') {
    if (grid) grid.style.gridTemplateColumns = '1fr';
    if (cadPane) cadPane.style.display = 'none';
    if (realPane) realPane.style.display = 'flex';
    if (btnReal) btnReal.classList.add('active');
  } else {
    // Both
    if (grid) grid.style.gridTemplateColumns = '';
    if (cadPane) cadPane.style.display = 'flex';
    if (realPane) realPane.style.display = 'flex';
    if (btnBoth) btnBoth.classList.add('active');
  }
}

function setFusionDesignView(viewName) {
  const btnAll = document.getElementById('fusionTabAll');
  const btnTable = document.getElementById('fusionTabTable');
  const btnChair = document.getElementById('fusionTabChair');
  const blockTable = document.getElementById('fusionBlockTable');
  const blockChair = document.getElementById('fusionBlockChair');
  if (!blockTable || !blockChair) return;

  [btnAll, btnTable, btnChair].forEach(btn => { if (btn) btn.classList.remove('active'); });

  if (viewName === 'table') {
    blockTable.style.display = 'flex';
    blockChair.style.display = 'none';
    blockTable.classList.add('expanded');
    blockChair.classList.remove('expanded');
    if (btnTable) btnTable.classList.add('active');
  } else if (viewName === 'chair') {
    blockTable.style.display = 'none';
    blockChair.style.display = 'flex';
    blockChair.classList.add('expanded');
    blockTable.classList.remove('expanded');
    if (btnChair) btnChair.classList.add('active');
  } else {
    // All (Both)
    blockTable.style.display = 'flex';
    blockChair.style.display = 'flex';
    blockTable.classList.remove('expanded');
    blockChair.classList.remove('expanded');
    if (btnAll) btnAll.classList.add('active');
  }
}

function openVideoLightbox(videoSrc, caption) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const video = document.getElementById('lightboxVideo');
  const videoSource = document.getElementById('lightboxVideoSource');
  const videoContainer = document.getElementById('modalVideoContainer');
  const loadingIndicator = document.getElementById('videoLoadingIndicator');
  const directLink = document.getElementById('videoDirectLink');
  const dualContainer = document.getElementById('lightboxDualContainer');
  const dualControls = document.getElementById('dualViewControls');
  const itemSwitcher = document.getElementById('modalItemSwitcher');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');
  if (!modal || !video) return;

  // Reset layout & hide other views
  modal.classList.remove('modal-dual-active');
  if (dualContainer) dualContainer.style.display = 'none';
  if (dualControls) dualControls.style.display = 'none';
  if (itemSwitcher) itemSwitcher.style.display = 'none';
  if (img) img.style.display = 'none';

  // Normalize URL for web safety (handles spaces, parentheses, etc.)
  const cleanSrc = encodeURI(decodeURI(videoSrc));

  if (videoContainer) videoContainer.style.display = 'flex';
  video.style.display = 'block';

  // Configure direct download/stream link
  if (directLink) {
    directLink.href = cleanSrc;
  }

  // Show loading indicator while buffering
  if (loadingIndicator) loadingIndicator.style.display = 'flex';

  // Reset and load new source (calling video.load() is mandatory when changing src dynamically)
  video.pause();
  if (videoSource) {
    videoSource.src = cleanSrc;
    videoSource.type = 'video/mp4';
  }
  video.src = cleanSrc;
  video.load();

  // Browser Autoplay Policy: muted autoplay is permitted on 100% of modern browsers (Chrome, Safari, iOS, Edge)
  // Users can unmute at any moment via the native audio control
  video.muted = true;

  video.oncanplay = function() {
    if (loadingIndicator) loadingIndicator.style.display = 'none';
  };

  video.onplaying = function() {
    if (loadingIndicator) loadingIndicator.style.display = 'none';
  };

  video.onerror = function() {
    if (loadingIndicator) loadingIndicator.style.display = 'none';
    console.warn('Video failed to stream directly:', cleanSrc);
    if (captionEl) {
      captionEl.innerHTML = `<span style="color: #ef4444; font-weight: 600;">⚠️ Notice:</span> Stream blocked by browser or connection. <a href="${cleanSrc}" target="_blank" style="color: var(--cyan-primary); text-decoration: underline; font-weight: bold;">Click here to open raw video file</a>.`;
    }
  };

  if (titleEl) titleEl.textContent = '🎬 Live Prototype Testing Video';
  if (captionEl) captionEl.innerHTML = caption || 'Live Physical Prototype Testing Demonstration';
  modal.classList.add('open');
  trackAnalytics('watch_prototype_video', { video_src: cleanSrc, title: caption || '' });

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      if (loadingIndicator) loadingIndicator.style.display = 'none';
    }).catch(err => {
      console.log('Autoplay was prevented by browser policy:', err);
      if (loadingIndicator) loadingIndicator.style.display = 'none';
    });
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  const video = document.getElementById('lightboxVideo');
  const videoContainer = document.getElementById('modalVideoContainer');
  const loadingIndicator = document.getElementById('videoLoadingIndicator');
  const dualContainer = document.getElementById('lightboxDualContainer');
  const dualControls = document.getElementById('dualViewControls');
  const itemSwitcher = document.getElementById('modalItemSwitcher');
  if (video) {
    video.pause();
    video.removeAttribute('src');
    video.load();
    video.style.display = 'none';
  }
  if (loadingIndicator) loadingIndicator.style.display = 'none';
  if (videoContainer) videoContainer.style.display = 'none';
  if (modal) {
    modal.classList.remove('open');
    modal.classList.remove('modal-dual-active');
  }
  if (dualContainer) dualContainer.style.display = 'none';
  if (dualControls) dualControls.style.display = 'none';
  if (itemSwitcher) itemSwitcher.style.display = 'none';
}

// Global key handler (Esc closes modals)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeExportStudioModal();
    closeResumeModal();
  }
});

// Click outside modal body closes it
const lightboxModalEl = document.getElementById('lightboxModal');
if (lightboxModalEl) {
  lightboxModalEl.addEventListener('click', (e) => {
    if (e.target === lightboxModalEl) closeLightbox();
  });
}

const resumeModalEl = document.getElementById('resumeModal');
if (resumeModalEl) {
  resumeModalEl.addEventListener('click', (e) => {
    if (e.target === resumeModalEl) closeResumeModal();
  });
}


/* ==========================================================================
   7. THEME TOGGLE (Dark Blueprint / Clean Light)
   ========================================================================== */
function initThemeToggle() {
  const btn = document.getElementById('themeToggleBtn');
  const icon = document.getElementById('themeIcon');
  if (!btn) return;

  const savedTheme = localStorage.getItem('ah_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (icon) icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ah_theme', next);
    if (icon) icon.textContent = next === 'dark' ? '☀️' : '🌙';
    showToast(`Switched to ${next === 'dark' ? 'Precision Blueprint Dark' : 'Clean Studio Light'} mode.`);
    trackAnalytics('toggle_theme', { theme: next });
    if (typeof updateEscapementTheme === 'function') {
      updateEscapementTheme(next);
    }
  });
}

/* ==========================================================================
   8. CONTACT ACTIONS & TOAST MESSAGES
   ========================================================================== */
function copyContact(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`📋 Copied "${text}" to clipboard!`);
  }).catch(() => {
    showToast(`Copied: ${text}`);
  });
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  showToast(`🚀 Thank you, ${name}! Your inquiry has been forwarded to Aiden.`);
  e.target.reset();
}

function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>⚡</span> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   10. PRINTABLE PDF PORTFOLIO & QR CODE STUDIO
   ========================================================================== */
function initExportStudio() {
  const modal = document.getElementById('exportStudioModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeExportStudioModal();
    });
  }

  // Pre-generate QR codes on page load
  const baseUrlInput = document.getElementById('exportBaseUrl');
  const initialUrl = baseUrlInput ? baseUrlInput.value : 'https://aidenhockinberry.github.io/mechenical-engineering-portfolio/';
  updateQrCodes(initialUrl);
}

function openExportStudioModal() {
  const modal = document.getElementById('exportStudioModal');
  if (modal) {
    modal.classList.add('open');
    const baseUrlInput = document.getElementById('exportBaseUrl');
    const url = baseUrlInput ? baseUrlInput.value : 'https://aidenhockinberry.github.io/mechenical-engineering-portfolio/';
    updateQrCodes(url);
  }
}

function closeExportStudioModal() {
  const modal = document.getElementById('exportStudioModal');
  if (modal) modal.classList.remove('open');
}

/* ==========================================================================
   RESUME MODAL & ABOUT FILTER CONTROLS
   ========================================================================== */
function openResumeModal() {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.add('open');
  }
}

function closeResumeModal() {
  const modal = document.getElementById('resumeModal');
  if (modal) {
    modal.classList.remove('open');
  }
}

function filterAboutGrid(tabName) {
  const btns = document.querySelectorAll('.about-tab-btn');
  const cards = document.querySelectorAll('.about-bento-grid .about-card');

  btns.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-about-tab') === tabName);
  });

  cards.forEach(card => {
    const cats = (card.getAttribute('data-about-cat') || '').split(' ');
    if (tabName === 'all' || cats.includes(tabName)) {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    } else {
      card.style.display = 'none';
    }
  });
}

function togglePrintSheet(sheetId, isChecked) {
  const sheet = document.getElementById(sheetId);
  if (!sheet) return;
  
  if (isChecked) {
    sheet.classList.remove('hidden-for-print');
    sheet.style.display = 'flex';
  } else {
    sheet.classList.add('hidden-for-print');
    sheet.style.display = 'none';
  }
}

function triggerPrintPortfolio() {
  const baseUrlInput = document.getElementById('exportBaseUrl');
  const url = baseUrlInput ? baseUrlInput.value : 'https://aidenhockinberry.github.io/mechenical-engineering-portfolio/';
  updateQrCodes(url);
  showToast('📄 Preparing printable PDF portfolio layout...');
  trackAnalytics('export_portfolio_print');
  
  setTimeout(() => {
    window.print();
  }, 250);
}

function updateQrCodes(baseUrl) {
  if (!baseUrl || !baseUrl.trim()) {
    baseUrl = 'https://aidenhockinberry.github.io/mechenical-engineering-portfolio/';
  }
  baseUrl = baseUrl.trim();
  const cleanBase = (baseUrl.endsWith('/') || baseUrl.includes('#')) ? baseUrl : baseUrl + '/';

  const qrTargets = [
    { id: 'qr-cover', url: cleanBase },
    { id: 'qr-era1', url: cleanBase.replace(/#.*$/, '') + '#manufacturing-era' },
    { id: 'qr-era2', url: cleanBase.replace(/#.*$/, '') + '#virtual-era' },
    { id: 'qr-era3', url: cleanBase.replace(/#.*$/, '') + '#early-era' },
    { id: 'qr-skills', url: cleanBase.replace(/#.*$/, '') + '#skills' }
  ];

  qrTargets.forEach(target => {
    const container = document.getElementById(target.id);
    if (!container) return;

    container.innerHTML = '';

    // Render using QRCode.js if available
    let rendered = false;
    if (typeof QRCode !== 'undefined') {
      try {
        new QRCode(container, {
          text: target.url,
          width: 120,
          height: 120,
          colorDark: "#0f172a",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.M
        });
        rendered = true;
      } catch (err) {
        console.warn('QRCode.js rendering error, using fallback', err);
      }
    }

    // High-resolution API Fallback if QRCode.js isn't ready
    if (!rendered || !container.hasChildNodes()) {
      container.innerHTML = '';
      const img = document.createElement('img');
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=0&data=${encodeURIComponent(target.url)}`;
      img.alt = `QR Code for ${target.url}`;
      img.loading = 'lazy';
      container.appendChild(img);
    }
  });
}

/* ==========================================================================
   11. SMOOTH SCROLL & ACTIVE NAV SPY
   ========================================================================== */
function initSmoothScroll() {
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
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        link.classList.remove('active');
        if (href === `#${current}`) {
          link.classList.add('active');
        }
      }
    });
  });
}

/* ==========================================================================
   12. INTERACTIVE 3D CAD (.STL) VIEWER FOR GRAVITY-DRIVEN ESCAPEMENT
   Powered by Three.js & STLLoader
   ========================================================================== */
const escapement3D = {
  initialized: false,
  scene: null,
  camera: null,
  renderer: null,
  controls: null,
  mesh: null,
  initialCamPos: null,
  initialCamTarget: null,
  materials: {},
  currentMaterial: 'cyan',
  animId: null,
  container: null
};

function initEscapement3DViewer() {
  const mount = document.getElementById('escapement3dCanvas');
  const loadingOverlay = document.getElementById('stlLoadingOverlay');
  if (!mount || typeof THREE === 'undefined' || typeof THREE.STLLoader === 'undefined') return;

  if (escapement3D.initialized) {
    onEscapementResize();
    return;
  }

  escapement3D.container = mount;
  const width = mount.clientWidth || mount.offsetWidth || 600;
  const height = mount.clientHeight || mount.offsetHeight || 380;

  // Scene
  const scene = new THREE.Scene();
  escapement3D.scene = scene;
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  scene.background = new THREE.Color(isDark ? 0x060c18 : 0xf1f5f9);

  // Camera
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
  escapement3D.camera = camera;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  if (THREE.sRGBEncoding) {
    renderer.outputEncoding = THREE.sRGBEncoding;
  }
  mount.innerHTML = '';
  mount.appendChild(renderer.domElement);
  escapement3D.renderer = renderer;

  // OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.8;
  controls.enablePan = true;
  controls.screenSpacePanning = true;
  escapement3D.controls = controls;

  // Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 0.9);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x00f0ff, 0.85);
  keyLight.position.set(300, 450, 300);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
  fillLight.position.set(-300, -150, -300);
  scene.add(fillLight);

  const topRim = new THREE.DirectionalLight(0x38bdf8, 0.55);
  topRim.position.set(0, 500, 100);
  scene.add(topRim);

  // Materials definition
  escapement3D.materials = {
    cyan: new THREE.MeshPhysicalMaterial({
      color: 0x00d4f0,
      emissive: 0x001d2e,
      roughness: 0.22,
      metalness: 0.12,
      clearcoat: 0.7,
      clearcoatRoughness: 0.18
    }),
    metal: new THREE.MeshStandardMaterial({
      color: 0xdde4ec,
      metalness: 0.88,
      roughness: 0.25
    }),
    wireframe: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      roughness: 0.5
    })
  };

  // STL Loader
  const loader = new THREE.STLLoader();
  const stlUrl = 'assets/images/3dmodels/cylinder%20escapment.stl';

  loader.load(
    stlUrl,
    function (geometry) {
      geometry.computeVertexNormals();
      geometry.center();
      geometry.computeBoundingBox();

      const bbox = geometry.boundingBox;
      const size = new THREE.Vector3();
      bbox.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);

      // Create Mesh
      const mesh = new THREE.Mesh(geometry, escapement3D.materials.cyan);
      scene.add(mesh);
      escapement3D.mesh = mesh;

      // Radial Blueprint Ground Grid
      const gridRadius = maxDim * 0.9;
      const grid = new THREE.PolarGridHelper(
        gridRadius,
        16,
        8,
        64,
        isDark ? 0x00f0ff : 0x0284c7,
        isDark ? 0x1e293b : 0xcbd5e1
      );
      grid.position.y = -size.y / 2 - 2;
      scene.add(grid);

      // Camera Setup
      const fov = camera.fov * (Math.PI / 180);
      const camDist = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.5;
      camera.position.set(camDist * 0.75, camDist * 0.55, camDist * 1.05);
      camera.near = maxDim / 100;
      camera.far = maxDim * 20;
      camera.updateProjectionMatrix();

      controls.target.set(0, 0, 0);
      controls.maxDistance = maxDim * 4.5;
      controls.minDistance = maxDim * 0.25;
      controls.update();

      escapement3D.initialCamPos = camera.position.clone();
      escapement3D.initialCamTarget = controls.target.clone();

      // Hide loading spinner
      if (loadingOverlay) {
        loadingOverlay.classList.add('hidden');
      }

      escapement3D.initialized = true;
    },
    function (xhr) {
      // Progress
    },
    function (err) {
      console.error('Error loading STL model:', err);
      if (loadingOverlay) {
        loadingOverlay.innerHTML = `
          <div style="color: #ef4444; font-size: 0.85rem; font-family: var(--font-mono); text-align: center; padding: 1rem;">
            ⚠️ Unable to render 3D STL directly in WebGL.
            <div style="margin-top: 0.6rem;">
              <a href="${stlUrl}" download class="btn btn-primary" style="font-size: 0.75rem;">Download Raw .STL (493 KB)</a>
            </div>
          </div>
        `;
      }
    }
  );

  // Render Loop
  function animate() {
    escapement3D.animId = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // Double-click canvas to reset view
  container.addEventListener('dblclick', resetEscapementCamera);

  // Resize listener
  window.addEventListener('resize', onEscapementResize);
}

function onEscapementResize() {
  if (!escapement3D.renderer || !escapement3D.camera || !escapement3D.container) return;
  const width = escapement3D.container.clientWidth;
  const height = escapement3D.container.clientHeight;
  if (width === 0 || height === 0) return;
  escapement3D.camera.aspect = width / height;
  escapement3D.camera.updateProjectionMatrix();
  escapement3D.renderer.setSize(width, height);
}

function setEscapementMaterial(matName) {
  if (!escapement3D.mesh || !escapement3D.materials[matName]) return;
  escapement3D.mesh.material = escapement3D.materials[matName];
  escapement3D.currentMaterial = matName;

  ['stlMatCyan', 'stlMatMetal', 'stlMatWire'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove('active');
  });

  const activeBtn = document.getElementById(
    matName === 'cyan' ? 'stlMatCyan' : (matName === 'metal' ? 'stlMatMetal' : 'stlMatWire')
  );
  if (activeBtn) activeBtn.classList.add('active');
}

function toggleEscapementAutoRotate() {
  if (!escapement3D.controls) return;
  escapement3D.controls.autoRotate = !escapement3D.controls.autoRotate;
  const btn = document.getElementById('stlAutoRotateBtn');
  if (btn) {
    if (escapement3D.controls.autoRotate) {
      btn.classList.add('active');
      btn.innerHTML = '🔄 Spin';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '⏸ Paused';
    }
  }
}

function resetEscapementCamera() {
  if (!escapement3D.camera || !escapement3D.controls || !escapement3D.initialCamPos) return;
  escapement3D.camera.position.copy(escapement3D.initialCamPos);
  escapement3D.controls.target.copy(escapement3D.initialCamTarget);
  escapement3D.controls.update();
}

function toggleEscapementFullscreen() {
  const card = document.getElementById('escapementStlCard');
  const btn = document.getElementById('stlFullscreenBtn');
  if (!card) return;

  if (!escapement3D.placeholder) {
    escapement3D.placeholder = document.createElement('div');
    escapement3D.placeholder.id = 'escapementStlPlaceholder';
    escapement3D.placeholder.style.display = 'none';
  }

  const isEntering = !card.classList.contains('fullscreen');

  if (isEntering) {
    // Escapes parent container CSS bounds/transforms by mounting directly to <body>
    if (card.parentNode && card.parentNode !== document.body) {
      card.parentNode.insertBefore(escapement3D.placeholder, card);
    }
    document.body.appendChild(card);
    card.classList.add('fullscreen');
    document.body.classList.add('stl-modal-open');

    if (btn) {
      btn.innerHTML = '✕ Minimize';
      btn.classList.add('active');
      btn.title = 'Minimize back to project card (Esc)';
    }
  } else {
    // Restore card to its original position in the project card
    card.classList.remove('fullscreen');
    document.body.classList.remove('stl-modal-open');

    if (escapement3D.placeholder && escapement3D.placeholder.parentNode) {
      escapement3D.placeholder.parentNode.insertBefore(card, escapement3D.placeholder);
      if (escapement3D.placeholder.parentNode) {
        escapement3D.placeholder.parentNode.removeChild(escapement3D.placeholder);
      }
    }

    if (btn) {
      btn.innerHTML = '⛶ Expand';
      btn.classList.remove('active');
      btn.title = 'Expand to Fullscreen';
    }
  }

  setTimeout(onEscapementResize, 30);
  setTimeout(onEscapementResize, 150);
}

function updateEscapementTheme(theme) {
  if (!escapement3D.scene) return;
  const isDark = theme !== 'light';
  escapement3D.scene.background.set(isDark ? 0x060c18 : 0xf1f5f9);
}

// Global Exports
window.initEscapement3DViewer = initEscapement3DViewer;
window.setEscapementMaterial = setEscapementMaterial;
window.toggleEscapementAutoRotate = toggleEscapementAutoRotate;
window.resetEscapementCamera = resetEscapementCamera;
window.toggleEscapementFullscreen = toggleEscapementFullscreen;
window.updateEscapementTheme = updateEscapementTheme;

// Exit fullscreen on Esc key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const card = document.getElementById('escapementStlCard');
    if (card && card.classList.contains('fullscreen')) {
      toggleEscapementFullscreen();
    }
  }
});


