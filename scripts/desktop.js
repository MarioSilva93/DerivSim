
function openApp(appName) {
  if (document.getElementById('window-' + appName)) return;

  fetch(`../apps/${appName}.html`)
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById("windows-container");
      const wrapper = document.createElement("div");
      wrapper.className = "window-wrapper";
      wrapper.id = "window-" + appName;
      wrapper.innerHTML = html;
      container.appendChild(wrapper);

      const script = document.createElement("script");
      script.src = `../scripts/${appName}.js`;
      document.body.appendChild(script);

      if (["loja","email","gestaodaempresa","trabalhadores","gestaoderotas"].includes(appName)) {
        document.querySelector(".corner-buttons").style.display = "none";
      }
    });
}

function closeApp(appName) {
  const win = document.getElementById("window-" + appName);
  if (win) win.remove();

  if (["loja"].includes(appName)) {
    document.querySelector(".corner-buttons").style.display = "flex";
  }
}

function saveGame() {
  alert("Progresso do jogo guardado!");
}

function logout() {
  const confirmar = confirm("Deseja mesmo sair?");
  if (confirmar) {
    window.location.href = "../index.html";
  }
}
