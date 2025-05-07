
function openRotasApp(appName) {
  const mainWindow = document.getElementById("window-gestaoderotas");
  if (mainWindow) mainWindow.style.display = "none";

  fetch(`../apps/rotas_${appName}.html`)
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById("windows-container");
      const wrapper = document.createElement("div");
      wrapper.className = "window-wrapper";
      wrapper.id = "window-rotas_" + appName;
      wrapper.innerHTML = html;
      container.appendChild(wrapper);

      const script = document.createElement("script");
      script.src = `../scripts/rotas_${appName}.js`;
      document.body.appendChild(script);
    });
}

function closeApp(id) {
  // Fecha qualquer janela com o ID fornecido
  const win = document.getElementById("window-" + id);
  if (win) win.remove();

  // Também tenta remover janelas tipo 'rotas_' (ex: window-rotas_veiculos)
  const subwin = document.getElementById("window-rotas_" + id);
  if (subwin) subwin.remove();

  // Mostra novamente a janela principal de rotas
  const rotas = document.getElementById("window-gestaoderotas");
  if (rotas) rotas.style.display = "block";
}

