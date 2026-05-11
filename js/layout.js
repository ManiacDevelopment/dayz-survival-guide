const navItems = [
  { label: "Home", href: "index.html" },
  { label: "Beginner", href: "beginner.html" },
  { label: "Survival", href: "survival.html" },
  { label: "Illness", href: "illness.html" },
  { label: "Loot", href: "loot.html" },
  { label: "Base", href: "base-building.html" },
  { label: "Weapons", href: "weapons.html" },
  { label: "PvP", href: "pvp.html" },
  { label: "Vehicles", href: "vehicles.html" },
  { label: "Map", href: "map-guide.html" }
];

function getCurrentPage() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function renderNavbar() {
  const mount = document.getElementById("site-navbar");
  if (!mount) return;

  const currentPage = getCurrentPage();

  mount.innerHTML = `
    <header class="site-header">
      <div class="container navbar">
        <a class="brand" href="index.html" aria-label="DayZ Survival Guide home">
          <span class="brand-mark">☣</span>
          <span>
            DayZ Guide
            <small>Survival archive</small>
          </span>
        </a>

        <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false">
          Menu
        </button>

        <nav class="nav-links" aria-label="Main navigation">
          ${navItems.map(item => `
            <a href="${item.href}" class="${currentPage === item.href ? "active" : ""}">
              ${item.label}
            </a>
          `).join("")}
        </nav>
      </div>
    </header>
  `;

  const toggle = mount.querySelector(".nav-toggle");
  const links = mount.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  const year = new Date().getFullYear();

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <strong>DayZ Survival Guide</strong>
          <p>Gritty survival tips, loot routes, illness help and PvP knowledge.</p>
          <small>© ${year} DayZ Guide. Fan-made guide website.</small>
        </div>

        <div class="footer-links">
          <a href="beginner.html">Beginner</a>
          <a href="illness.html">Illness</a>
          <a href="loot.html">Loot</a>
          <a href="pvp.html">PvP</a>
          <a href="map-guide.html">Map</a>
        </div>
      </div>
    </footer>
  `;
}

renderNavbar();
renderFooter();
