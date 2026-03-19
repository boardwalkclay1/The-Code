// modules/sections.js
// Populates intro, lessons, and pricing content for the index page.

(function () {
  // Utility: safe element getter
  const $ = id => document.getElementById(id);

  // Intro section content
  const introHTML = `
    <div class="intro-card">
      <h1>The Code — Learn to Build Real Things</h1>
      <p><strong>Four complete paths:</strong> Websites, Apps, Microcontrollers, Cybersecurity (pen testing &amp; ethical hacking).</p>
      <p>Each path teaches real workflows, real projects, and real income opportunities. You get step‑by‑step lessons, project files, simulators, and direct guidance so nothing is left unclear.</p>
      <div class="cta-row">
        <button class="cta" data-action="explore-courses">Explore Courses</button>
        <button class="cta ghost" data-action="pricing">See Pricing & Bundles</button>
      </div>
    </div>
  `;

  // Category templates
  const categories = [
    {
      id: 'websites',
      title: 'Websites',
      subtitle: 'Build the web: pages, stores, dashboards',
      bullets: [
        'Personal sites and portfolios',
        'Business websites and landing pages',
        'E‑commerce and booking systems',
        'Interactive dashboards and admin panels',
        'Custom UI/UX, animations, and forms'
      ],
      workflow: 'Design → Structure (HTML/CSS) → Interactivity (JS) → Backend/API → Deploy & Monitor',
      income: '$300–$20,000+ per project depending on scope'
    },
    {
      id: 'apps',
      title: 'Apps',
      subtitle: 'Web and mobile apps, tools, and utilities',
      bullets: [
        'Web apps and single‑page apps',
        'Mobile apps and PWAs',
        'Real‑time dashboards and chat systems',
        'Custom business tools and integrations',
        'Recurring revenue via maintenance and subscriptions'
      ],
      workflow: 'Idea → Wireframes → Frontend → Backend & Data → Testing → Release & Iterate',
      income: '$50–$150/hr; $3,000–$25,000+ per custom app'
    },
    {
      id: 'microcontrollers',
      title: 'Microcontrollers',
      subtitle: 'Sensors, lights, cameras, robotics, and automation',
      bullets: [
        'Sensor systems (temperature, motion, light)',
        'Smart lights and home automation',
        'Motion‑activated cameras and monitoring',
        'Wearables and robotics basics',
        'Custom devices that connect to apps and dashboards'
      ],
      workflow: 'Prototype → Wiring & Firmware → Data collection → Connectivity → Integration with apps',
      income: '$500–$50,000+ per project depending on scale'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity (Pen Testing & Ethical Hacking)',
      subtitle: 'Learn to secure systems and think like an attacker — ethically',
      bullets: [
        'Network fundamentals and threat models',
        'Vulnerability discovery and safe testing',
        'Secure coding and hardening apps',
        'Traffic analysis and incident response basics',
        'Building safer systems and audits'
      ],
      workflow: 'Recon → Test (safe, legal) → Report → Remediate → Harden & Monitor',
      income: '$75–$150/hr; $1,000–$10,000+ per audit; high full‑time salaries'
    }
  ];

  // Render category cards
  function renderCategories() {
    return categories.map(cat => `
      <article class="category-card" id="cat-${cat.id}">
        <h3>${cat.title}</h3>
        <p class="muted">${cat.subtitle}</p>
        <ul class="features">
          ${cat.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <p><strong>Workflow:</strong> ${cat.workflow}</p>
        <p><strong>Income potential:</strong> ${cat.income}</p>
        <div class="card-actions">
          <a class="link-btn" href="lessons.html?category=${cat.id}">Start ${cat.title}</a>
          <button class="link-btn ghost" data-action="learn-more" data-cat="${cat.id}">Learn More</button>
        </div>
      </article>
    `).join('');
  }

  // Pricing and bundles
  const pricingHTML = `
    <div class="pricing-card">
      <h3>Pricing</h3>
      <p>One‑time fee per category. Choose a single path or bundle multiple categories for a discount.</p>
      <table class="pricing-table">
        <tr><td><strong>Single category</strong></td><td>$150</td></tr>
        <tr><td><strong>Any 2 categories</strong></td><td>$250</td></tr>
        <tr><td><strong>Any 3 categories</strong></td><td>$350</td></tr>
        <tr><td><strong>All 4 categories</strong></td><td>$450</td></tr>
      </table>
      <p class="muted">Bundles are applied at checkout. Pricing is a one‑time access fee per category — no recurring charges.</p>

      <div class="bundle-builder">
        <label>Select categories to estimate price:</label>
        <div class="checkbox-row">
          ${categories.map(c => `<label><input type="checkbox" class="bundle-checkbox" value="${c.id}"> ${c.title}</label>`).join('')}
        </div>
        <div class="bundle-result">Selected: <span id="bundle-count">0</span> — Price: <strong id="bundle-price">$0</strong></div>
        <div class="bundle-actions">
          <button id="bundle-continue" class="cta" disabled>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  `;

  // Full lessons section assembly
  const lessonsHTML = `
    <div class="lessons-overview">
      <h2>What you can build and learn</h2>
      <p>Every category contains multiple projects, step‑by‑step workflows, and customization options so you can build exactly what you imagine — custom apps, websites, devices, and secure systems.</p>

      <div class="categories-grid">
        ${renderCategories()}
      </div>

      <hr>

      ${pricingHTML}

      <hr>

      <div class="support-card">
        <h3>Guided learning</h3>
        <p>I will be there every step of the way to guide you through the code, explain concepts clearly, and help you finish projects so they work in the real world. Lessons include examples, simulators, and troubleshooting notes so you never get stuck alone.</p>
        <p><strong>Choose a path that fits your interests:</strong> visuals → Websites; tools → Apps; physical devices → Microcontrollers; puzzles & systems → Cybersecurity.</p>
      </div>
    </div>
  `;

  // Inject into DOM
  function inject() {
    const intro = $('intro-section');
    const lessons = $('lessons-section');
    const footer = $('footer');

    if (intro) intro.innerHTML = introHTML;
    if (lessons) lessons.innerHTML = lessonsHTML;
    if (footer) footer.innerHTML = `<p class="muted">© The Code — Matrix Interface</p>`;
  }

  // Bundle calculator logic
  function setupBundleLogic() {
    const checkboxes = Array.from(document.querySelectorAll('.bundle-checkbox'));
    const countEl = $('bundle-count');
    const priceEl = $('bundle-price');
    const proceedBtn = $('bundle-continue');

    function update() {
      const selected = checkboxes.filter(cb => cb.checked).map(cb => cb.value);
      const n = selected.length;
      let price = 0;
      if (n === 0) price = 0;
      else if (n === 1) price = 150;
      else if (n === 2) price = 250;
      else if (n === 3) price = 350;
      else if (n === 4) price = 450;

      countEl.textContent = n;
      priceEl.textContent = `$${price}`;
      proceedBtn.disabled = n === 0;
      proceedBtn.dataset.selected = selected.join(',');
    }

    checkboxes.forEach(cb => cb.addEventListener('change', update));
    update();

    proceedBtn.addEventListener('click', () => {
      const selected = proceedBtn.dataset.selected || '';
      // For now, navigate to a checkout placeholder with selected categories in query string
      window.location.href = `checkout.html?categories=${encodeURIComponent(selected)}`;
    });
  }

  // Category "Learn More" handlers
  function setupCategoryHandlers() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="learn-more"]');
      if (!btn) return;
      const cat = btn.dataset.cat;
      // Open the category page or modal; use lessons list page with category filter
      window.location.href = `lessons.html?category=${encodeURIComponent(cat)}`;
    });

    document.addEventListener('click', (e) => {
      const cta = e.target.closest('[data-action="explore-courses"]');
      if (cta) {
        window.location.href = 'lessons.html';
      }
      const pricing = e.target.closest('[data-action="pricing"]');
      if (pricing) {
        window.location.hash = '#pricing';
        // scroll to pricing area
        const pricingCard = document.querySelector('.pricing-card');
        if (pricingCard) pricingCard.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Initialize when DOM is ready
  function init() {
    inject();
    setupBundleLogic();
    setupCategoryHandlers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
