/* ==========================================================================
   app.js
   Main application controller: sidebar nav + swappable content area.
   Starts on login, then reveals the sidebar once a user is chosen.
   ========================================================================== */

const NAV_ITEMS = [
  ["dashboard", "Dashboard"],
  ["lessons", "Lessons"],
  ["quiz", "Spot the Phish Quiz"],
  ["vishing", "Call Simulator"],
  ["progress", "Leaderboard"],
];

const SCREEN_RENDERERS = {
  dashboard: renderDashboard,
  lessons: renderLessons,
  quiz: renderQuiz,
  vishing: renderVishing,
  progress: renderProgress,
};

class App {
  constructor(root) {
    this.root = root;
    this.user = null;
    this.navButtons = {};
    this.contentArea = null;
    this.showLogin();
  }

  showLogin() {
    this.root.innerHTML = "";
    renderLogin(this.root, (user) => this.onLogin(user));
  }

  onLogin(user) {
    this.user = user;
    this.buildMainLayout();
    this.navigate("dashboard");
  }

  buildMainLayout() {
    this.root.innerHTML = "";

    const shell = document.createElement("div");
    shell.className = "app-shell";

    const sidebar = document.createElement("div");
    sidebar.className = "sidebar";

    const header = document.createElement("div");
    header.className = "sidebar-header";
    header.innerHTML = `
      <div class="sidebar-brand">\uD83C\uDFA3 Ignore The Bait<br><span class="tag">TRAINING</span></div>
      <div class="sidebar-user">Signed in as ${escapeHtml(this.user.name)}</div>
    `;
    sidebar.appendChild(header);

    const navList = document.createElement("ul");
    navList.className = "nav-list";
    this.navButtons = {};
    NAV_ITEMS.forEach(([key, label]) => {
      const li = document.createElement("li");
      li.className = "nav-item";
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.addEventListener("click", () => this.navigate(key));
      li.appendChild(btn);
      navList.appendChild(li);
      this.navButtons[key] = btn;
    });
    sidebar.appendChild(navList);

    const footer = document.createElement("div");
    footer.className = "sidebar-footer";
    const switchBtn = document.createElement("button");
    switchBtn.className = "btn btn-secondary btn-block";
    switchBtn.textContent = "Switch User";
    switchBtn.addEventListener("click", () => {
      this.user = null;
      this.showLogin();
    });
    footer.appendChild(switchBtn);
    sidebar.appendChild(footer);

    shell.appendChild(sidebar);

    this.contentArea = document.createElement("div");
    this.contentArea.className = "content-area";
    shell.appendChild(this.contentArea);

    this.root.appendChild(shell);
  }

  navigate(screenKey) {
    Object.entries(this.navButtons).forEach(([key, btn]) => {
      btn.classList.toggle("active", key === screenKey);
    });
    const renderer = SCREEN_RENDERERS[screenKey];
    renderer(this.contentArea, this.user, (k) => this.navigate(k));
  }
}
