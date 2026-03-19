// modules/sections.js
// Replaces the previous sections renderer. Populates intro, categories, pricing, and sidebar.
// Ensures the sidebar is light (overrides dark styles) and removes any "Lessons" nav item.
// Exposes category data on window.APP_CATEGORIES for other modules to use.

(function () {
  const $ = id => document.getElementById(id);

  // --- Category data (source of truth) ---
  const categories = [
    {
      id: 'websites',
      title: 'Websites',
      subtitle: 'Build pages, stores, dashboards, and custom sites',
      bullets: [
        'Personal sites and portfolios',
        'Business websites and landing pages',
        'E‑commerce and booking systems',
        'Interactive dashboards and admin panels',
        'Custom UI/UX, animations, and forms'
      ],
      workflow: 'Design → Structure (HTML/CSS) → Interactivity (JS) → Backend/API → Deploy & Monitor',
      income: '$300–$20,000+ per project depending on scope',
      link: 'lessons.html?category=websites'
    },
    {
      id: 'apps',
      title: 'Apps',
      subtitle: 'Web and mobile apps, tools, and utilities',
      bullets: [
        'Web apps and single‑page apps',
        'Mobile apps and progressive web apps',
        'Real‑time dashboards and chat systems',
        'Custom business tools and integrations',
        'Recurring revenue via maintenance and subscriptions'
      ],
      workflow: 'Idea → Wireframes → Frontend → Backend & Data → Testing → Release & Iterate',
      income: '$50–$150/hr; $3,000–$25,000+ per custom app',
      link: 'lessons.html?category=apps'
    },
    {
      id: 'microcontrollers',
      title: 'Microcontrollers',
      subtitle: 'Sensors, cameras, lights, robotics, and automation',
      bullets: [
        'Sensor systems (temperature, motion, light)',
        'Smart lights and home automation',
        'Motion‑activated cameras and monitoring',
        'Wearables and robotics basics',
        'Custom devices that connect to apps and dashboards'
      ],
      workflow: 'Prototype → Wiring & Firmware → Data collection → Connectivity → Integration with apps',
      income: '$500–$50,000+ per project depending on scale',
      link: 'lessons.html?category=microcontrollers'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity (Pen Testing & Ethical Hacking)',
      subtitle: 'Learn to secure systems and think like an ethical tester',
      bullets: [
        'Network fundamentals and threat models',
        'Vulnerability discovery and safe testing (ethical only)',
        'Secure coding and hardening apps',
        'Traffic analysis and incident response basics',
        'Building safer systems and audits'
      ],
      workflow: 'Recon → Test (safe, legal) → Report → Remediate → Harden & Monitor',
      income: '$75–$150/hr; $1,000–$10,000+ per audit; high full‑time salaries',
      link: 'lessons.html?category=cybersecurity'
    }
  ];

  // expose categories globally for other modules
  window.APP_CATEGORIES = categories;

  // --- Intro content ---
  const introHTML = `
    <div class="section-block">
      <h1 class="page-title">The Code</h1>
      <p class="page-subtitle">Four complete paths: Websites, Apps, Microcontrollers, Cybersecurity (Pen Testing & Ethical Hacking).</p>
      <p class="section-text">Each path teaches real workflows, real projects, and real income opportunities. You will get step‑by‑step lessons, project files, simulators, and direct guidance so nothing is left unclear.</p>
      <div class="bubble-row">
        <button class="bubble-button" data-action="explore-courses">Explore Courses</button>
        <button class="bubble-button" data-action="pricing">Pricing & Bundles</button>
        <a class="bubble-button" href="lessons.html" role="button">All Lessons</a>
      </div>
    </div>
  `;

  // --- Render category cards for main content ---
  function renderCategoryCards() {
    return categories.map(cat => `
      <article class="lesson-card section-block" id="cat-${cat.id}">
        <h3 class="lesson-title">${cat.title}</h3>
        <p class="lesson-meta">${cat.subtitle}</p>
        <ul class="lesson-outcomes">
          ${cat.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <p class="lesson-desc"><strong>Workflow:</strong> ${cat.workflow}</p>
        <p class="lesson-meta"><strong>Income potential:</strong> ${cat.income}</p>
        <div style="margin-top:10px;">
          <a class="lesson-button" href="${cat.link}">Start ${cat.title}</a>
          <button class="lesson-button" data-action="learn-more" data-cat="${cat.id}" style="margin-left:8px;">Learn More</button>
        </div>
      </article>
    `).join('');
  }

  // --- Pricing HTML and bundle calculator ---
  const pricingHTML = `
    <div class="section-block" id="pricing-block">
      <h3 class="section-title">Pricing</h3>
      <p class="section-text">One‑time fee per category. Choose a single path or bundle multiple categories for a discount.</p>
      <table style="width:100%;margin-top:8px;border-collapse:collapse;">
        <tr><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)"><strong>Single category</strong></td><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)">$150</td></tr>
        <tr><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)"><strong>Any 2 categories</strong></td><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)">$250</td></tr>
        <tr><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)"><strong>Any 3 categories</strong></td><td style="padding:6px;border-bottom:1px solid rgba(0,255,65,0.08)">$350</td></tr>
        <tr><td style="padding:6px;"><strong>All 4 categories</strong></td><td style="padding:6px;">$450</td></tr>
      </table>

      <div style="margin-top:12px;">
        <label style="display:block;margin-bottom:6px;">Select categories to estimate price:</label>
        <div class="tag-row" id="bundle-checkboxes">
          ${categories.map(c => `<label class="tag" style="cursor:pointer;"><input type="checkbox" class="bundle-checkbox" value="${c.id}" style="margin-right:6px;"> ${c.title}</label>`).join('')}
        </div>
        <div style="margin-top:10px;">Selected: <strong id="bundle-count">0</strong> — Price: <strong id="bundle-price">$0</strong></div>
        <div style="margin-top:10px;">
          <button id="bundle-continue" class="bubble-button" disabled>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  `;

  // --- Support / guidance block ---
  const supportHTML = `
    <div class="section-block">
      <h3 class="section-title">Guided learning</h3>
      <p class="section-text">You will be guided through every step of the code. Lessons include examples, simulators, troubleshooting notes, and direct explanations so you finish projects that work in the real world.</p>
      <p class="section-text">Microcontroller lessons show how to customize sensors, cameras, lights, relays, motors, and any device you can imagine. Cybersecurity is taught as ethical pen testing and defensive practices only.</p>
    </div>
  `;

  // --- Assemble lessons section HTML ---
  const lessonsHTML = `
    <div class="section-block">
      <h2 class="section-title">What you can build and learn</h2>
      <p class="section-text">Each category contains multiple projects, step‑by‑step workflows, and customization options so you can build exactly what you imagine — custom apps, websites, devices, and secure systems.</p>
      <div class="lesson-grid">
        ${renderCategoryCards()}
      </div>
      ${pricingHTML}
      ${supportHTML}
    </div>
  `;

  // --- Sidebar renderer (light, compact, no "Lessons" item) ---
  function renderSidebar() {
    const sidebar = $('sidebar');
    if (!sidebar) return;

    // Force light appearance via inline styles to override any dark CSS
    sidebar.style.background = 'linear-gradient(180deg,#f7f8fa 0%,#eef0f2 100%)';
    sidebar.style.color = '#0b0b0b';
    sidebar.style.borderRight = '1px solid rgba(0,255,65,0.12)';
    sidebar.style.boxShadow = 'inset 0 0 40px rgba(0,0,0,0.03)';

    // Build nav HTML: brand + category links + pricing CTA
    sidebar.innerHTML = `
      <div>
        <div class="sidebar-title" style="color:#0b0b0b;">The Code</div>
        <div class="sidebar-sub" style="color:#2b2b2b;">Websites · Apps · Microcontrollers · Cybersecurity</div>
      </div>
      <nav>
        <div class="sidebar-section-label">Categories</div>
        <div class="sidebar-menu">
          ${categories.map(c => `
            <a class="sidebar-link" href="${c.link}" data-cat="${c.id}" style="text-decoration:none;">
              <span style="color:#0b0b0b;"><strong>${c.title}</strong></span>
              <span style="font-size:11px;color:#2b2b2b;">${c.subtitle}</span>
            </a>
          `).join('')}
        </div>
      </nav>
      <div style="margin-top:auto;">
        <div class="sidebar-section-label">Quick</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <a class="sidebar-link" href="checkout.html" style="justify-content:center;">Pricing</a>
          <a class="sidebar-link" href="simulators.html" style="justify-content:center;">Simulators</a>
        </div>
      </div>
    `;
  }

  // --- Bundle calculator logic ---
  function setupBundleLogic() {
    const checkboxes = Array.from(document.querySelectorAll('.bundle-checkbox'));
    const countEl = $('bundle-count');
    const priceEl = $('bundle-price');
    const proceedBtn = $('bundle-continue');

    function computePrice(n) {
      if (n === 0) return 0;
      if (n === 1) return 150;
      if (n === 2) return 250;
      if (n === 3) return 350;
      if (n === 4) return 450;
      return 150 * n; // fallback
    }

    function update() {
      const selected = checkboxes.filter(cb => cb.checked).map(cb => cb.value);
      const n = selected.length;
      const price = computePrice(n);
      if (countEl) countEl.textContent = n;
      if (priceEl) priceEl.textContent = `$${price}`;
      if (proceedBtn) {
        proceedBtn.disabled = n === 0;
        proceedBtn.dataset.selected = selected.join(',');
      }
    }

    checkboxes.forEach(cb => cb.addEventListener('change', update));
    update();

    if (proceedBtn) {
      proceedBtn.addEventListener('click', () => {
        const selected = proceedBtn.dataset.selected || '';
        // Navigate to checkout placeholder with selected categories
        window.location.href = `checkout.html?categories=${encodeURIComponent(selected)}`;
      });
    }
  }

  // --- Click handlers for CTAs and Learn More ---
  function setupHandlers() {
    document.addEventListener('click', (e) => {
      const explore = e.target.closest('[data-action="explore-courses"]');
      if (explore) {
        window.location.href = 'lessons.html';
        return;
      }
      const pricing = e.target.closest('[data-action="pricing"]');
      if (pricing) {
        const pricingBlock = $('pricing-block');
        if (pricingBlock) pricingBlock.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      const learnMore = e.target.closest('[data-action="learn-more"]');
      if (learnMore) {
        const cat = learnMore.dataset.cat;
        window.location.href = `lessons.html?category=${encodeURIComponent(cat)}`;
        return;
      }
    });
  }

  // --- Inject content into DOM ---
  function inject() {
    const intro = $('intro-section');
    const lessons = $('lessons-section');
    const micro = $('microcontrollers-section');
    const gain = $('gain-section');
    const footer = $('footer');

    if (intro) intro.innerHTML = introHTML;
    if (lessons) lessons.innerHTML = lessonsHTML;
    if (micro) micro.innerHTML = ''; // reserved for future microcontroller demos
    if (gain) gain.innerHTML = ''; // reserved for growth / testimonials
    if (footer) footer.innerHTML = `<div class="footer"><span>© The Code — Matrix Interface</span></div>`;

    renderSidebar();
    setupBundleLogic();
    setupHandlers();
  }

  // Initialize when DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
