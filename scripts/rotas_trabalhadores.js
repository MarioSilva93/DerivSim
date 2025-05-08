
function atualizarLista() {
  const container = document.getElementById("workerList");
  container.innerHTML = "";

  const trabalhadores = JSON.parse(IndexedDB.getItem("meusTrabalhadores")) || [];
  const veiculos = JSON.parse(IndexedDB.getItem("meusVeiculos")) || [];

  trabalhadores.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "worker-card";
    const veiculoAtual = veiculos.find(v => v.trabalhador === t.nome);

    let opcoes = "<option value=''>-- Nenhum --</option>";
    veiculos.forEach((v, idx) => {
      const selecionado = v.trabalhador === t.nome ? "selected" : "";
      if (!v.trabalhador || v.trabalhador === t.nome)
        opcoes += `<option value="${idx}" ${selecionado}>${v.model}</option>`;
    });

    div.innerHTML = `
      <h3>${t.nome}</h3>
      <p><strong>Carta:</strong> ${t.carta}</p>
      <label>Veículo:</label>
      <select onchange="vincular(${i}, this.value)">${opcoes}</select>
    `;
    container.appendChild(div);
  });
}

function vincular(tIndex, vIndex) {
  const trabalhadores = JSON.parse(IndexedDB.getItem("meusTrabalhadores")) || [];
  const veiculos = JSON.parse(IndexedDB.getItem("meusVeiculos")) || [];

  veiculos.forEach(v => {
    if (v.trabalhador === trabalhadores[tIndex].nome) {
      delete v.trabalhador;
    }
  });

  if (vIndex !== "") {
    veiculos[vIndex].trabalhador = trabalhadores[tIndex].nome;
  }

  IndexedDB.setItem("meusVeiculos", JSON.stringify(veiculos));
  atualizarLista();
}

atualizarLista();
