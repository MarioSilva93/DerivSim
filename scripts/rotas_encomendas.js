  
const nomes = ["Carlos", "Sofia", "Miguel", "Anna", "Luc", "João", "Emma", "Pierre", "Marta", "Hans"];
const moradas = [
  { rua: "Willikonerstrasse 40", cidade: "Oetwil am See", pais: "Suíça" },
  { rua: "Avenida da Liberdade 210", cidade: "Lisboa", pais: "Portugal" },
  { rua: "Rue de Rivoli 99", cidade: "Paris", pais: "França" },
  { rua: "Calle de Alcalá 45", cidade: "Madrid", pais: "Espanha" },
  { rua: "Karlstrasse 12", cidade: "Munique", pais: "Alemanha" },
  { rua: "Via Roma 88", cidade: "Milão", pais: "Itália" }
];

let encomendas = [];
let paletes = [];

function gerarEncomendas(qtd = 20) {
  encomendas = [];
  for (let i = 0; i < qtd; i++) {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const morada = moradas[Math.floor(Math.random() * moradas.length)];
    const peso = Math.floor(Math.random() * 25) + 1;
    encomendas.push({
      id: "e" + i,
      cliente: nome,
      rua: morada.rua,
      cidade: morada.cidade,
      pais: morada.pais,
      peso
    });
  }
  localStorage.setItem("encomendasPendentes", JSON.stringify(encomendas));
}

function renderEncomendas() {
  const lista = document.getElementById("encomendas-list");
  lista.innerHTML = "";
  encomendas.forEach((enc) => {
    if (!document.getElementById(enc.id)) {
      const li = document.createElement("li");
      li.className = "draggable";
      li.draggable = true;
      li.id = enc.id;
      li.innerHTML = `<strong>${enc.cliente}</strong><br>${enc.rua}, ${enc.cidade} (${enc.pais})<br><em>${enc.peso} kg</em>`;
      li.addEventListener("dragstart", dragStart);
      lista.appendChild(li);
    }
  });
}

function criarPalete() {
  const container = document.getElementById("paletes-container");
  const div = document.createElement("div");
  div.className = "palete droppable";
  div.dataset.palete = paletes.length;
  div.innerHTML = `<h4>Palete ${paletes.length + 1}</h4><ul></ul><p><strong>Total: <span>0</span> kg</strong></p>`;
  div.addEventListener("dragover", allowDrop);
  div.addEventListener("drop", drop);
  container.appendChild(div);
  paletes.push([]);
  guardarPaletes();
}

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  const item = document.getElementById(id);
  const paleteDiv = event.currentTarget;
  const ul = paleteDiv.querySelector("ul");
  const paleteIndex = parseInt(paleteDiv.dataset.palete);

  const enc = encomendas.find(e => e.id === id);
  const pesoAtual = paletes[paleteIndex].reduce((s, e) => s + e.peso, 0);

  if (pesoAtual + enc.peso > 100) {
    paleteDiv.classList.add("excesso");
    alert("Esta palete já atingiu o limite de 100 kg!");
    return;
  } else {
    paleteDiv.classList.remove("excesso");
  }

  if (!ul.contains(item)) {
    ul.appendChild(item);
    paletes[paleteIndex].push(enc);
    updatePeso(paleteDiv, paletes[paleteIndex]);
    guardarPaletes();
  }
}

function updatePeso(paleteDiv, lista) {
  const total = lista.reduce((soma, e) => soma + e.peso, 0);
  paleteDiv.querySelector("span").textContent = total;
  if (total > 100) {
    paleteDiv.classList.add("excesso");
  } else {
    paleteDiv.classList.remove("excesso");
  }
}

function guardarPaletes() {
  localStorage.setItem("paletesCriadas", JSON.stringify(paletes));
}

function restaurarPaletes() {
  const armazenadas = JSON.parse(localStorage.getItem("paletesCriadas")) || [];
  armazenadas.forEach((p, index) => {
    criarPalete(); // recria estrutura
    const ul = document.querySelector(`[data-palete="${index}"] ul`);
    p.forEach(enc => {
      const item = document.getElementById(enc.id);
      if (item) ul.appendChild(item);
    });
    paletes[index] = p;
    updatePeso(document.querySelector(`[data-palete="${index}"]`), p);
  });
}

window.onload = function () {
  encomendas = JSON.parse(localStorage.getItem("encomendasPendentes")) || [];
  if (encomendas.length === 0) {
    gerarEncomendas();
    localStorage.setItem("encomendasPendentes", JSON.stringify(encomendas));
  }
  renderEncomendas();
  restaurarPaletes();
};
