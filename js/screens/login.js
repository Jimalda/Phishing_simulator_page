/* ==========================================================================
   screens/login.js
   Profile picker - pick an existing name or add a new one. No passwords;
   this is a low-stakes local training tool.
   ========================================================================== */

function renderLogin(container, onLogin) {
  container.innerHTML = "";

  const wrap = document.createElement("div");
  wrap.className = "login-wrap";

  const box = document.createElement("div");
  box.className = "login-box";

  box.innerHTML = `
    <div class="eyebrow">Ignore The Bait</div>
    <h1 class="page-title">Security Awareness Training</h1>
    <p class="page-subtitle" style="margin: 8px auto 0;">
      Pick your name to continue, or add yourself to the class list.
    </p>
  `;

  const card = document.createElement("div");
  card.className = "card";

  const listTitle = document.createElement("div");
  listTitle.className = "card-title";
  listTitle.textContent = "Select your profile";
  card.appendChild(listTitle);

  const userList = document.createElement("ul");
  userList.className = "user-list";
  card.appendChild(userList);

  let selectedUser = null;

  function refreshUserList() {
    const users = Storage.listUsers();
    userList.innerHTML = "";
    if (users.length === 0) {
      const empty = document.createElement("li");
      empty.className = "user-list-empty";
      empty.textContent = "No profiles yet - add your name below.";
      userList.appendChild(empty);
      return;
    }
    users.forEach((u) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = u.name;
      btn.addEventListener("click", () => {
        selectedUser = u;
        [...userList.querySelectorAll("button")].forEach((b) =>
          b.classList.remove("selected")
        );
        btn.classList.add("selected");
      });
      btn.addEventListener("dblclick", () => onLogin(u));
      li.appendChild(btn);
      userList.appendChild(li);
    });
  }
  refreshUserList();

  const continueBtn = document.createElement("button");
  continueBtn.className = "btn btn-primary";
  continueBtn.textContent = "Continue";
  continueBtn.style.marginBottom = "4px";
  continueBtn.addEventListener("click", () => {
    if (!selectedUser) {
      alert("Please select a profile from the list, or add a new one below.");
      return;
    }
    onLogin(selectedUser);
  });
  card.appendChild(continueBtn);

  const hr = document.createElement("hr");
  hr.className = "divider";
  card.appendChild(hr);

  const addLabel = document.createElement("div");
  addLabel.className = "muted";
  addLabel.style.marginBottom = "8px";
  addLabel.style.fontSize = "13.5px";
  addLabel.textContent = "New here? Add your name:";
  card.appendChild(addLabel);

  const form = document.createElement("div");
  form.className = "inline-form";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "text-input";
  input.placeholder = "Your name";
  form.appendChild(input);

  const addBtn = document.createElement("button");
  addBtn.className = "btn btn-secondary";
  addBtn.textContent = "Add & Continue";
  form.appendChild(addBtn);

  function addAndLogin() {
    const name = input.value.trim();
    if (!name) {
      alert("Please enter a name.");
      return;
    }
    const user = Storage.getOrCreateUser(name);
    onLogin(user);
  }

  addBtn.addEventListener("click", addAndLogin);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addAndLogin();
  });

  card.appendChild(form);
  box.appendChild(card);
  wrap.appendChild(box);
  container.appendChild(wrap);
}
