
function rendergestao() {
  const contratados = JSON.parse(IndexedDB.getItem("meusTrabalhadores")) || [];
  const listaCondutores = document.querySelector("#condutores ul");
  const listaArmazem = document.querySelector("#armazem ul");

  contratados.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.nome + " (" + p.carta + ")";
    if (p.carta === "B" || p.carta === "CE") {
      listaCondutores.appendChild(li);
    } else {
      listaArmazem.appendChild(li);
    }
  });

  const veiculos = JSON.parse(IndexedDB.getItem("meusVeiculos")) || [];
  const listaVeiculos = document.querySelector("#veiculos ul");
  veiculos.forEach(v => {
    const li = document.createElement("li");
    li.textContent = v.model + " - " + v.capacity;
    listaVeiculos.appendChild(li);
  });

  const saldo = IndexedDB.getItem("saldo") || 50000;
  const ganhos = IndexedDB.getItem("ganhos") || 0;
  const despesas = IndexedDB.getItem("despesas") || 0;

  document.getElementById("saldo").textContent = saldo;
  document.getElementById("ganhos").textContent = ganhos;
  document.getElementById("despesas").textContent = despesas;
}

rendergestao();
