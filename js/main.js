/* ============ EMROSHYAL — Interactions (multi-page) ============ */

(function () {
  'use strict';

  var PHONE = '9215834176';
  var WA_BASE = 'https://wa.me/91' + PHONE + '?text=';
  var PAGE = document.body.getAttribute('data-page') || 'home';

  /* ---------------- Helpers ---------------- */
  function on(id, fn) {
    var el = document.getElementById(id);
    if (el && fn) fn(el);
    return el;
  }
  function slug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  /* ---------------- Service Data ---------------- */
  function svg(p) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="w-7 h-7" aria-hidden="true">' + p + '</svg>';
  }

  var ICONS = {
    aluminium:  svg('<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M9 4v16M15 4v16"/><path d="M9 8h.01M9 12h.01M9 16h.01M15 8h.01M15 12h.01M15 16h.01"/>'),
    upvc:       svg('<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 10h18M12 4v16"/>'),
    kitchen:    svg('<path d="M3 6a2 2 0 0 1 2-2h5v16H5a2 2 0 0 1-2-2V6Z"/><path d="M14 4h5a2 2 0 0 1 2 2v7h-7V4Z"/><path d="M14 17h7v1a2 2 0 0 1-2 2h-5v-3Z"/><path d="M6 9h3M6 12h3"/>'),
    wardrobe:   svg('<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18"/><path d="M7 16h.01M7 12h.01M7 8h.01"/>'),
    tv:         svg('<rect x="4" y="6" width="16" height="10" rx="1"/><path d="M9 3l3 3 3-3M8 20h8M12 16v4"/>'),
    bath:       svg('<rect x="6" y="3" width="12" height="9" rx="1"/><path d="M5 19h14M9 19l-2-5h10l-2 5M12 15.5v1"/>'),
    panelling:  svg('<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>'),
    flooring:   svg('<path d="M3 5.5h18V10H3zM3 10h18v4.5H3zM3 14.5h18V19H3z"/>'),
    theatre:    svg('<rect x="4" y="9" width="16" height="6" rx="1"/><path d="M8 3l3 6M16 3l-3 6"/><circle cx="7" cy="17" r="1.4"/><circle cx="17" cy="17" r="1.4"/>'),
    appliance:  svg('<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M7 8h10"/><path d="M9 20v2M15 20v2"/><circle cx="12" cy="14" r="2"/>'),
    corian:     svg('<path d="M3 9h18v9H3zM3 9l2-3h14l2 3"/><path d="M9 18v3M15 18v3"/>'),
    ceiling:    svg('<path d="M4 4h16M4 4v3M20 4v3M4 9h16M8 13h8M12 13v4M9 17h6"/>'),
    drywall:    svg('<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 3v18M15 3v18"/><path d="M4 8h16M4 14h16"/>'),
    falseFloor: svg('<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 12h16M12 4v16"/>'),
    school:     svg('<path d="M3 8h18M4 8l1 10M20 8l-1 10"/><path d="M9 8V6h6v2"/><path d="M9 18v3M15 18v3"/>'),
    hospitality:svg('<path d="M4 13a2 2 0 0 1 4 0v1h8v-1a2 2 0 0 1 4 0v2.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 15.5V13Z"/><path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3"/><path d="M8 20v-2M16 20v-2"/>'),
    office:     svg('<path d="M4 8h16M3 8l3-4h12l3 4M8 8v12M16 8v12M8 12h8M8 16h8"/>'),
    acoustic:   svg('<rect x="4" y="8" width="10" height="8" rx="1"/><path d="M17 9a3.5 3.5 0 0 1 0 6M19.5 6.5a7 7 0 0 1 0 11"/>'),
    cubicle:    svg('<path d="M3 3v18M8 3v7M8 14v7M3 7h5M3 14h5"/><path d="M14 5h5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h5"/>'),
    insulation: svg('<path d="M4 7h16M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2M20 7v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7"/><path d="M7 11h10M7 15h10"/>'),
    slim:       svg('<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M10 4v16"/><path d="M6 8h1.5M6 11h1.5M6 14h1.5"/>')
  };

  var RESIDENTIAL = [
    { name: 'Aluminium System Doors & Windows', icon: 'aluminium',  desc: 'Precision-fabricated thermal & non-thermal sections, powder-coated finishes and toughened glass for your home.' },
    { name: 'uPVC Doors & Windows',             icon: 'upvc',       desc: 'Energy-efficient, dust-proof and sound-proof uPVC profiles with premium multi-point locking.' },
    { name: 'Modular Kitchens',                 icon: 'kitchen',    desc: 'Designer layouts with soft-close hardware, premium laminates and smart storage systems.' },
    { name: 'Wardrobes',                        icon: 'wardrobe',   desc: 'Custom sliding & hinged wardrobes with mirror options, organisers and mood lighting.' },
    { name: 'TV Consoles',                      icon: 'tv',         desc: 'Statement entertainment walls and consoles designed around your living room.' },
    { name: 'Bathroom Vanities',                icon: 'bath',       desc: 'Water-safe, elegant vanities and storage that elevate your daily routine.' },
    { name: 'Wall Panelling',                   icon: 'panelling',  desc: '3D panels, PU fluting, veneer and PVC panelling for texture-rich feature walls.' },
    { name: 'Flooring',                         icon: 'flooring',   desc: 'Laminate, vinyl, tile and wooden flooring installed with clean, precise detailing.' },
    { name: 'Home Theatres',                    icon: 'theatre',    desc: 'Acoustic-treated media rooms with cabling, false ceiling and immersive lighting.' },
    { name: 'Appliances',                       icon: 'appliance',  desc: 'Sourcing and installation of branded appliances that integrate seamlessly.' },
    { name: 'Corian Work',                      icon: 'corian',     desc: 'Seamless Corian countertops, basins and tabletops with invisible joins.' }
  ];

  var COMMERCIAL = [
    { name: 'Aluminium Facades & Shopfronts',    icon: 'aluminium',  desc: 'High-performance entrances, shopfronts and glazing systems for commercial facades.' },
    { name: 'uPVC Systems for Schools & Offices', icon: 'upvc',      desc: 'Insulated, low-maintenance uPVC systems built for schools, offices and hospitals.' },
    { name: 'False Ceilings',                   icon: 'ceiling',    desc: 'Gypsum, POP, metal and acoustic ceilings with integrated lighting and HVAC detailing.' },
    { name: 'Drywalls',                         icon: 'drywall',    desc: 'Fast, clean partition walls with thermal and acoustic performance options.' },
    { name: 'Heavy-Duty Commercial Flooring',   icon: 'flooring',   desc: 'High-traffic commercial flooring in tile, vinyl, laminate and engineered wood.' },
    { name: 'False Flooring',                   icon: 'falseFloor', desc: 'Raised access floors with cable management for IT rooms, banks and offices.' },
    { name: 'School Furniture',                 icon: 'school',     desc: 'Durable, ergonomic classroom and lab furniture engineered for daily use.' },
    { name: 'Hospitality Furniture',            icon: 'hospitality',desc: 'Furniture for hotels, cafes and restaurants — stylish, durable and code-compliant.' },
    { name: 'Office Furniture',                 icon: 'office',     desc: 'Workstations, cabins and conference set-ups that reflect your brand.' },
    { name: 'Acoustic Solutions',               icon: 'acoustic',   desc: 'Acoustic panels, baffles and room tuning for studios, boardrooms and auditoriums.' },
    { name: 'Washroom Cubicles',                icon: 'cubicle',    desc: 'Compact-laminate, HPL and glass cubicles with vandal-resistant hardware.' },
    { name: 'Insulation',                       icon: 'insulation', desc: 'Thermal and acoustic insulation for energy savings and comfort.' },
    { name: 'Slim Doors & Partitions',          icon: 'slim',       desc: 'Minimal-frame glass doors and partitions for a premium, open feel.' }
  ];

  var OPTION_MAP = [
    ['Aluminium', 'Aluminium System Doors & Windows'],
    ['uPVC', 'uPVC Doors & Windows'],
    ['Modular', 'Modular Kitchen'],
    ['Wardrobe', 'Wardrobe / Storage'],
    ['TV', 'TV Console / Wall Panelling'],
    ['Bath', 'Bathroom Vanity / Corian Work'],
    ['Wall Panelling', 'TV Console / Wall Panelling'],
    ['Flooring', 'Flooring / False Flooring'],
    ['Home Theatre', 'Home Theatre / Acoustic'],
    ['False Ceiling', 'False Ceiling / Drywall'],
    ['Drywall', 'False Ceiling / Drywall'],
    ['Slim', 'Washroom Cubicles / Partitions']
  ];

  function mapService(name) {
    if (!name) return 'Other / Not Sure';
    for (var i = 0; i < OPTION_MAP.length; i++) {
      if (name.indexOf(OPTION_MAP[i][0]) !== -1) return OPTION_MAP[i][1];
    }
    return 'Other / Not Sure';
  }

  /* ---------------- Service cards (home + services page) ---------------- */
  function isHomePage() {
    var b = document.body;
    return b && b.getAttribute('data-page') === 'home';
  }

  function card(item, cat, imageOnly) {
    var sid = cat + '-' + slug(item.name);
    var img = MEGA_IMG[item.name];
    var imgStyle = img ? 'background-image:url(\'' + img + '\')' : '';
    var details = imageOnly
      ? ''
      : '<p class="s-card-desc">' + item.desc + '</p>' +
        '<span class="s-link">Enquire Now' +
          '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4-4 4M3 12h18"/></svg>' +
        '</span>';
    return (
      '<a id="' + sid + '" href="contact.html?service=' + encodeURIComponent(item.name) + '" class="service-card reveal scroll-mt-40" data-name="' + item.name + '" aria-label="Enquire about ' + item.name + '">' +
        '<span class="s-card-img" style="' + imgStyle + '"></span>' +
        '<span class="s-card-overlay"></span>' +
        '<span class="s-card-body">' +
          '<span class="s-icon">' + ICONS[item.icon] + '</span>' +
          '<h3 class="s-card-title">' + item.name + '</h3>' +
          details +
        '</span>' +
      '</a>'
    );
  }

  /* ---------------- Service card images ---------------- */
  var MEGA_IMG = {};
  MEGA_IMG['Aluminium System Doors & Windows'] = 'https://images.pexels.com/photos/1566836/pexels-photo-1566836.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Aluminium Facades & Shopfronts']   = 'https://images.pexels.com/photos/258160/pexels-photo-258160.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['uPVC Doors & Windows']             = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['uPVC Systems for Schools & Offices'] = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Heavy-Duty Commercial Flooring']   = 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Modular Kitchens']                 = 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Wardrobes']                        = 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['TV Consoles']                      = 'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Bathroom Vanities']                = 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Wall Panelling']                   = 'https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Flooring']                         = 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Home Theatres']                    = 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Appliances']                       = 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Corian Work']                      = 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['False Ceilings']                   = 'https://images.pexels.com/photos/3409766/pexels-photo-3409766.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Drywalls']                         = 'https://images.pexels.com/photos/281260/pexels-photo-281260.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['False Flooring']                   = 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['School Furniture']                 = 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Hospitality Furniture']            = 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Office Furniture']                 = 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Acoustic Solutions']               = 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Washroom Cubicles']                = 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Insulation']                       = 'https://images.pexels.com/photos/3409766/pexels-photo-3409766.jpeg?auto=compress&cs=tinysrgb&w=800';
  MEGA_IMG['Slim Doors & Partitions']          = 'https://images.pexels.com/photos/5511131/pexels-photo-5511131.jpeg?auto=compress&cs=tinysrgb&w=800';

  var homeCards = isHomePage();
  on('panelResidential', function (p) { p.innerHTML = RESIDENTIAL.map(function (i) { return card(i, 'res', homeCards); }).join(''); });
  on('panelCommercial', function (p) { p.innerHTML = COMMERCIAL.map(function (i) { return card(i, 'com', homeCards); }).join(''); });

  var megaPanels = {
    megaResidential: { items: RESIDENTIAL, label: 'Residential', cat: 'res' },
    megaCommercial: { items: COMMERCIAL, label: 'Commercial', cat: 'com' }
  };

  function buildMegaMenu(panelId) {
    var cfg = megaPanels[panelId];
    var panel = document.getElementById(panelId);
    if (!panel) return;

    var list = cfg.items.map(function (it) {
      return (
        '<a href="services.html#' + cfg.cat + '-' + slug(it.name) + '" class="mega-item" data-name="' + it.name + '" data-img="' + (MEGA_IMG[it.name] || '') + '" data-desc="' + it.desc + '">' +
          '<span>' + it.name + '</span>' +
          '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>' +
        '</a>'
      );
    }).join('');

    panel.innerHTML =
      '<div class="mega-wrap">' +
        '<div class="mega-col-list">' +
          '<p class="mega-eyebrow">' + cfg.label + '</p>' +
          '<h4 class="mega-heading">Explore ' + cfg.label + ' Solutions</h4>' +
          '<div class="mega-list">' + list + '</div>' +
          '<a href="services.html?cat=' + cfg.cat + '" class="mega-viewall">View all services' +
            '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4-4 4M3 12h18"/></svg>' +
          '</a>' +
        '</div>' +
        '<div class="mega-col-img">' +
          '<div class="mega-preview">' +
            '<img id="' + panelId + 'Img" class="mega-preview-img" src="" alt="' + cfg.items[0].name + '" loading="lazy" />' +
            '<div class="mega-preview-cap">' +
              '<p id="' + panelId + 'CapTitle"></p>' +
              '<span id="' + panelId + 'CapDesc"></span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="mega-col-cta">' +
          '<div class="mega-cta-left">' +
            '<p class="mega-eyebrow">Free Site Visit</p>' +
            '<h4 class="mega-heading">Plan your project</h4>' +
          '</div>' +
          '<div class="mega-cta-actions">' +
            '<a href="contact.html" class="mega-cta-btn">Get Free Quote</a>' +
            '<a href="tel:+919215834176" class="mega-cta-phone">+91 92158 34176</a>' +
            '<p class="mega-meta">Mon&ndash;Sat &middot; 9:30 AM &ndash; 7:00 PM<br />Phase 2, Industrial Area, Panchkula</p>' +
          '</div>' +
        '</div>' +
      '</div>';

    cfg.items.forEach(function (it) {
      var src = MEGA_IMG[it.name];
      if (src) { var pre = new Image(); pre.src = src; }
    });

    swapPreview(panelId, cfg.items[0]);
  }

  function swapPreview(panelId, item) {
    var img = document.getElementById(panelId + 'Img');
    var capTitle = document.getElementById(panelId + 'CapTitle');
    var capDesc = document.getElementById(panelId + 'CapDesc');
    if (!img) return;
    img.alt = item.name;
    var loader = new Image();
    loader.onload = function () {
      img.style.opacity = '0';
      img.src = loader.src;
      capTitle.textContent = item.name;
      capDesc.textContent = item.desc;
      setTimeout(function () { img.style.opacity = '1'; }, 60);
    };
    loader.src = item.img || MEGA_IMG[item.name];
  }

  function openMega(panelId) {
    var panel = document.getElementById(panelId);
    if (!panel) return;
    hideMega(panelId === 'megaResidential' ? 'megaCommercial' : 'megaResidential');
    setHeaderActive(panelId === 'megaResidential' ? 'res' : 'com');
    panel.classList.remove('hidden');
    void panel.offsetWidth;
    panel.classList.add('mega-open');
    syncSectionTabs(panelId === 'megaResidential' ? 'res' : 'com');
  }

  function hideMega(panelId) {
    var panel = document.getElementById(panelId);
    if (!panel) return;
    panel.classList.remove('mega-open');
    panel.classList.add('hidden');
  }

  function closeAllMega() {
    hideMega('megaResidential');
    hideMega('megaCommercial');
    var pr = document.getElementById('megaResidential');
    var pc = document.getElementById('megaCommercial');
    if (pr) pr.classList.remove('mega-pinned');
    if (pc) pc.classList.remove('mega-pinned');
  }

  function syncSectionTabs() {
    var pRes = document.getElementById('panelResidential');
    var pCom = document.getElementById('panelCommercial');
    if (pRes) pRes.classList.remove('hidden');
    if (pCom) pCom.classList.remove('hidden');
  }

  function resetHeaderState() {
    pinnedCat = null;
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    setHeaderActive(activeCat);
    setCategoryNavOpen(null);
    closeAllMega();
  }

  var openTimer = null;
  var closeTimer = null;
  var pinnedCat = null;
  var activeCat = 'res';

  function scheduleClose() {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      if (pinnedCat) return;
      closeAllMega();
      setHeaderActive(activeCat);
      setCategoryNavOpen(null);
    }, 260);
  }

  function scheduleOpen(panelId) {
    clearTimeout(closeTimer);
    clearTimeout(openTimer);
    if (pinnedCat) return;
    openTimer = setTimeout(function () { openMega(panelId); }, 80);
  }

  buildMegaMenu('megaResidential');
  buildMegaMenu('megaCommercial');

  var NAV_ICON_RES = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 6a2 2 0 0 1 2-2h5v16H5a2 2 0 0 1-2-2V6Z"/><path d="M14 4h5a2 2 0 0 1 2 2v7h-7V4Z"/></svg>';
  var NAV_ICON_COM = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M3 8l3-4h12l3 4M8 8v12M16 8v12M8 12h8M8 16h8"/></svg>';

  function buildCategoryNav() {
    function renderStrip(id, label, icon, cat, items) {
      var el = document.getElementById(id);
      if (!el) return;
      el.innerHTML =
        '<div class="max-w-7xl mx-auto px-4 sm:px-6">' +
          '<nav class="flex items-center gap-x-7 overflow-x-auto no-scrollbar py-3 text-[13px] font-bold uppercase tracking-wider text-ink/70 subtle-grad">' +
            '<span class="hidden lg:inline-flex items-center gap-2 text-brass-600 shrink-0">' + icon + label + '</span>' +
            items.map(function (it) {
              return '<a href="services.html#' + cat + '-' + slug(it.name) + '" class="whitespace-nowrap hover:text-brass-600 transition-colors nav-link">' + it.name + '</a>';
            }).join('') +
          '</nav>' +
        '</div>';
    }
    renderStrip('categoryNavRes', 'Residential', NAV_ICON_RES, 'res', RESIDENTIAL);
    renderStrip('categoryNavCom', 'Commercial', NAV_ICON_COM, 'com', COMMERCIAL);
  }
  buildCategoryNav();

  document.addEventListener('mouseover', function (e) {
    var item = e.target.closest('.mega-item');
    if (!item) return;
    var panel = item.closest('.mega-panel');
    if (!panel) return;
    swapPreview(panel.id, {
      name: item.getAttribute('data-name'),
      desc: item.getAttribute('data-desc'),
      img: item.getAttribute('data-img')
    });
  });

  window.addEventListener('scroll', function () {
    if (!pinnedCat && document.querySelector('.mega-panel.mega-open')) {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
      resetHeaderState();
    }
  }, { passive: true });

  /* ---------------- Header center toggle ---------------- */
  var headerRes = document.getElementById('headerTabResidential');
  var headerCom = document.getElementById('headerTabCommercial');

  function setHeaderActive(cat) {
    if (headerRes) headerRes.classList.toggle('active', cat === 'res');
    if (headerCom) headerCom.classList.toggle('active', cat === 'com');
  }

  /* ---------------- Header center toggle (hover = dropdown, click = pin dropdown) ---------------- */
  function toggleHeaderMega(cat) {
    var panelId = cat === 'res' ? 'megaResidential' : 'megaCommercial';
    var panel = document.getElementById(panelId);
    if (!panel) return;
    activeCat = cat;
    if (pinnedCat === cat) {
      resetHeaderState();
      return;
    }
    pinnedCat = cat;
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    openMega(panelId);
    panel.classList.add('mega-pinned');
    setHeaderActive(cat);
    setCategoryNavOpen(cat);
  }

  document.addEventListener('click', function (e) {
    if (!pinnedCat) return;
    var header = document.getElementById('siteHeader');
    var target = e.target;
    if (!header || !header.contains(target)) {
      resetHeaderState();
    }
  });

  function setCategoryNavOpen(cat) {
    var res = document.getElementById('categoryNavRes');
    var com = document.getElementById('categoryNavCom');
    if (res) res.classList.toggle('open', cat === 'res');
    if (com) com.classList.toggle('open', cat === 'com');
  }

  if (headerRes) {
    headerRes.addEventListener('mouseenter', function () { scheduleOpen('megaResidential'); });
    headerRes.addEventListener('mouseleave', scheduleClose);
    headerRes.addEventListener('focusin', function () { scheduleOpen('megaResidential'); });
    headerRes.addEventListener('focusout', scheduleClose);
    headerRes.addEventListener('click', function () { toggleHeaderMega('res'); });
  }
  if (headerCom) {
    headerCom.addEventListener('mouseenter', function () { scheduleOpen('megaCommercial'); });
    headerCom.addEventListener('mouseleave', scheduleClose);
    headerCom.addEventListener('focusin', function () { scheduleOpen('megaCommercial'); });
    headerCom.addEventListener('focusout', scheduleClose);
    headerCom.addEventListener('click', function () { toggleHeaderMega('com'); });
  }

  var megaResPanel = document.getElementById('megaResidential');
  var megaComPanel = document.getElementById('megaCommercial');
  if (megaResPanel) {
    megaResPanel.addEventListener('mouseenter', function () { clearTimeout(closeTimer); clearTimeout(openTimer); });
    megaResPanel.addEventListener('mouseleave', scheduleClose);
  }
  if (megaComPanel) {
    megaComPanel.addEventListener('mouseenter', function () { clearTimeout(closeTimer); clearTimeout(openTimer); });
    megaComPanel.addEventListener('mouseleave', scheduleClose);
  }

  /* ---------------- Hero image slider (first section of every page) ---------------- */
  function initHeroSlider(slider) {
    var slides = slider.querySelectorAll('.hero-slide');
    if (!slides.length) return;
    var wrap = slider.closest('section');
    if (!wrap) return;
    var active = 0;
    var timer = null;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var dotsWrap = wrap.querySelector('[data-hero-dots]');
    var dots = [];
    if (dotsWrap) {
      for (var i = 0; i < slides.length; i++) {
        (function (idx) {
          var d = document.createElement('button');
          d.className = idx === 0 ? 'hero-active' : '';
          d.setAttribute('aria-label', 'Go to slide ' + (idx + 1));
          d.addEventListener('click', function () { go(idx); restart(); });
          dotsWrap.appendChild(d);
          dots.push(d);
        })(i);
      }
    }

    function go(idx) {
      slides[active].classList.remove('hero-active');
      if (dots[active]) dots[active].classList.remove('hero-active');
      active = idx;
      slides[active].classList.add('hero-active');
      if (dots[active]) dots[active].classList.add('hero-active');
    }

    function next() { go((active + 1) % slides.length); }

    var prevBtn = wrap.querySelector('[data-hero-prev]');
    var nextBtn = wrap.querySelector('[data-hero-next]');
    if (prevBtn) prevBtn.addEventListener('click', function () { go((active - 1 + slides.length) % slides.length); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });

    function restart() {
      clearInterval(timer);
      if (reduced) return;
      timer = setInterval(next, 6000);
    }

    slides[0].classList.add('hero-active');
    restart();

    wrap.addEventListener('mouseenter', function () { clearInterval(timer); });
    wrap.addEventListener('mouseleave', restart);

    var startX = null;
    wrap.addEventListener('touchstart', function (e) {
      if (e.touches.length) startX = e.touches[0].clientX;
    }, { passive: true });
    wrap.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) next();
        else go((active - 1 + slides.length) % slides.length);
        restart();
      }
      startX = null;
    }, { passive: true });
  }

  document.querySelectorAll('[data-hero-slider]').forEach(function (s) { initHeroSlider(s); });

  /* ---------------- Services page: initial tab + deep-link ---------------- */
  if (PAGE === 'services') {
    var params = new URLSearchParams(window.location.search);
    var cat = params.get('cat');
    if (cat === 'com') { activeCat = 'com'; setHeaderActive('com'); syncSectionTabs('com'); }
    else if (cat === 'res') { activeCat = 'res'; setHeaderActive('res'); syncSectionTabs('res'); }

    var hash = window.location.hash;
    if (hash && hash.length > 1) {
      var sl = hash.slice(1);
      var target = document.getElementById(sl);
      if (target) {
        var hcat = sl.split('-')[0];
        if (hcat === 'com') { activeCat = 'com'; setHeaderActive('com'); syncSectionTabs('com'); }
        else if (hcat === 'res') { activeCat = 'res'; setHeaderActive('res'); syncSectionTabs('res'); }
        requestAnimationFrame(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.classList.add('flash-card');
          setTimeout(function () { target.classList.remove('flash-card'); }, 2200);
        });
      }
    }
  }

  /* ---------------- Mobile menu ---------------- */
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var iconOpen = document.getElementById('iconOpen');
  var iconClose = document.getElementById('iconClose');

  if (menuBtn && mobileMenu && iconOpen && iconClose) {
    menuBtn.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!open));
      iconOpen.classList.toggle('hidden', !open);
      iconClose.classList.toggle('hidden', open);
    });
    mobileMenu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        mobileMenu.classList.add('hidden');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- Header on scroll ---------------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('shadow-lg', window.scrollY > 30);
      header.classList.toggle('shadow-black/40', window.scrollY > 30);
    }, { passive: true });
  }

  /* ---------------- Reveal on scroll ---------------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ---------------- Counters ---------------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var start = null;

    function tick(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.counter').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ---------------- Testimonials slider ---------------- */
  var track = document.getElementById('quoteTrack');
  var dotsWrap = document.getElementById('quoteDots');
  if (track && dotsWrap && track.children.length > 0) {
    var slides = track.children;
    var current = 0;
    var timer = null;

    function updateSlider() {
      track.style.transform = 'translateX(-' + current * 100 + '%)';
      Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
        dot.classList.toggle('active', i === current);
      });
    }

    function restartAuto() {
      clearInterval(timer);
      timer = setInterval(function () {
        current = (current + 1) % slides.length;
        updateSlider();
      }, 6500);
    }

    for (var i = 0; i < slides.length; i++) {
      (function (idx) {
        var dot = document.createElement('button');
        dot.className = 'slider-dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (idx + 1));
        dot.addEventListener('click', function () { current = idx; updateSlider(); restartAuto(); });
        dotsWrap.appendChild(dot);
      })(i);
    }

    document.querySelectorAll('.slider-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        current = (current + parseInt(btn.getAttribute('data-dir'), 10) + slides.length) % slides.length;
        updateSlider();
        restartAuto();
      });
    });

    updateSlider();
    restartAuto();
    var sliderBox = track.closest('.overflow-hidden');
    if (sliderBox) {
      sliderBox.addEventListener('mouseenter', function () { clearInterval(timer); });
      sliderBox.addEventListener('mouseleave', restartAuto);
    }
  }

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var answer = item.querySelector('.faq-a');
      var isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach(function (open) {
        open.classList.remove('active');
        var a = open.querySelector('.faq-a');
        if (a) a.style.maxHeight = null;
        var q = open.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen && answer) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------------- Quick quote bar (hero, home) -> WhatsApp ---------------- */
  var quickForm = document.getElementById('quickQuoteForm');
  if (quickForm) {
    quickForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var service = document.getElementById('quickService').value;
      var phone = document.getElementById('quickPhone').value.trim();
      if (!phone) {
        document.getElementById('quickPhone').focus();
        return;
      }
      var text = 'Hi Emroshyal, I would like a free quote.\nService: ' + service + '\nPhone: ' + phone;
      window.open(WA_BASE + encodeURIComponent(text), '_blank');
      quickForm.reset();
    });
  }

  /* ---------------- Quote form -> WhatsApp ---------------- */
  on('quoteForm', function (form) {
    var formNote = document.getElementById('formNote');
    var serviceSelect = document.getElementById('fService');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('fName').value || '').trim();
      var phone = (document.getElementById('fPhone').value || '').trim();
      var service = serviceSelect ? serviceSelect.value : '';
      var sel = form.querySelector('input[name="ptype"]:checked');
      var ptype = sel ? sel.value : '';
      var message = (document.getElementById('fMsg').value || '').trim();

      if (!name || !phone) {
        formNote.textContent = 'Please enter your name and phone number so we can reach you.';
        formNote.classList.add('text-brass-600');
        return;
      }

      var text =
        'Hi Emroshyal, I would like a free quote.\n' +
        'Name: ' + name + '\n' +
        'Phone: ' + phone + '\n' +
        'Service: ' + service + '\n' +
        (ptype ? 'Type: ' + ptype + '\n' : '') +
        (message ? 'Details: ' + message + '\n' : '');

      window.open(WA_BASE + encodeURIComponent(text), '_blank');
      formNote.textContent = 'Opening WhatsApp… we will get back to you shortly. Thank you!';
      formNote.classList.remove('text-brass-600');
    });

    /* Contact page: preselect service passed via ?service= */
    if (PAGE === 'contact') {
      var sp = new URLSearchParams(window.location.search).get('service');
      if (sp && serviceSelect) {
        serviceSelect.value = mapService(sp);
        formNote.classList.remove('text-brass-600');
        formNote.textContent = 'Service pre-selected: ' + serviceSelect.value;
        setTimeout(function () {
          form.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
      }
    }
  });

  /* ---------------- Projects page: filter ---------------- */
  if (PAGE === 'projects') {
    var chips = Array.prototype.slice.call(document.querySelectorAll('.pf-chip'));
    var items = Array.prototype.slice.call(document.querySelectorAll('.pf-item'));
    if (chips.length) {
      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          chips.forEach(function (c) { c.classList.remove('active'); });
          chip.classList.add('active');
          var f = chip.getAttribute('data-filter');
          items.forEach(function (it) {
            var show = f === 'all' || it.getAttribute('data-cat') === f;
            it.classList.toggle('hidden', !show);
          });
        });
      });
    }
  }

  /* ---------------- Nav active state ---------------- */
  document.querySelectorAll('.nav-link').forEach(function (a) {
    if (a.getAttribute('data-nav') === PAGE) a.classList.add('text-brass');
  });

  /* ---------------- Footer year ---------------- */
  on('year', function (el) { el.textContent = new Date().getFullYear(); });
})();