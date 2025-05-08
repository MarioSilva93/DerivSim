console.log("Script rotas_encomendas.js carregado com sucesso!");

const nomes = ["Carlos", "Sofia", "Miguel", "Anna", "Luc", "João", "Emma", "Pierre", "Marta", "Hans"];
const peso = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const moradas = [
  { rua: "Willikonerstrasse 40", cidade: "Oetwil am See", pais: "Suíça" },
  { rua: "Avenida da Liberdade 210", cidade: "Lisboa", pais: "Portugal" },
  { rua: "Rue de Rivoli 99", cidade: "Paris", pais: "França" },
  { rua: "Calle de Alcalá 45", cidade: "Madrid", pais: "Espanha" },
  { rua: "Karlstrasse 12", cidade: "Munique", pais: "Alemanha" },
  { rua: "Via Roma 88", cidade: "Milão", pais: "Itália" }
];

console.log("Variável nomes:", nomes);

let encomendas = [];
let paletes = [];

function gerarEncomendas(qtd = 20) {
  console.log("Função gerarEncomendas chamada");
  encomendas = [];
  for (let i = 0; i < qtd; i++) {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const morada = moradas[Math.floor(Math.random() * moradas.length)];
    const peso = Math.floor(Math.random() * 25) + 1;

    console.log("Nome:", nome, "Morada:", morada, "Peso:", peso);

    const encomenda = {
      id: "e" + i,
      cliente: nome,
      rua: morada.rua,
      cidade: morada.cidade,
      pais: morada.pais,
      peso
    };

    console.log("Encomenda gerada:", encomenda);
    encomendas.push(encomenda);
  }

  console.log("Encomendas antes de salvar no IndexedDB:", encomendas);
  IndexedDB.setItem("encomendasPendentes", JSON.stringify(encomendas));
  console.log("Encomendas salvas no IndexedDB:", IndexedDB.getItem("encomendasPendentes"));
}

function renderEncomendas() {
  console.log("Função renderEncomendas chamada");
  const lista = document.getElementById("encomendas-list");
  if (!lista) {
    console.error("Elemento #encomendas-list não encontrado no DOM!");
    return;
  }

  // Limpar a lista antes de renderizar
  lista.innerHTML = "";
  console.log("Lista de encomendas limpa.");

  // Renderizar cada encomenda
  encomendas.forEach((enc) => {
    console.log("Renderizando encomenda:", enc);

    // Verificar se o item já existe no DOM
    if (!document.getElementById(enc.id)) {
      const li = document.createElement("li");
      li.className = "draggable";
      li.draggable = true;
      li.id = enc.id;
      li.innerHTML = `<strong>${enc.cliente}</strong><br>${enc.rua}, ${enc.cidade} (${enc.pais})<br><em>${enc.peso} kg</em>`;
      li.addEventListener("dragstart", dragStart);
      lista.appendChild(li);
      console.log("Encomenda adicionada ao DOM:", li);
    } else {
      console.log("Encomenda já existe no DOM:", enc.id);
    }
  });

  console.log("Renderização de encomendas concluída.");
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
  IndexedDB.setItem("paletesCriadas", JSON.stringify(paletes));
}

function restaurarPaletes() {
  const armazenadas = JSON.parse(IndexedDB.getItem("paletesCriadas")) || [];
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

// Exemplo de função openRotasApp no arquivo gestaoderotas.js
function openRotasApp(appName) {
  const appContainer = document.getElementById(`window-${appName}`);
  if (!appContainer) {
    // Carregar o HTML do aplicativo dinamicamente
    fetch(`apps/${appName}.html`)
      .then((response) => response.text())
      .then((html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        document.body.appendChild(div);
      });
  }
}

window.onload = function () {
  console.log("Iniciando aplicação...");

  // Verificar encomendas no IndexedDB
  encomendas = JSON.parse(IndexedDB.getItem("encomendasPendentes")) || [];
  console.log("Encomendas carregadas do IndexedDB:", encomendas);

  // Gerar encomendas se não houver nenhuma
  if (encomendas.length === 0) {
    console.log("Nenhuma encomenda encontrada. Gerando novas encomendas...");
    gerarEncomendas();
    console.log("Encomendas geradas:", encomendas);

    // Salvar no IndexedDB
    IndexedDB.setItem("encomendasPendentes", JSON.stringify(encomendas));
    console.log("Encomendas salvas no IndexedDB:", encomendas);

    // Renderizar encomendas
    renderEncomendas();
    console.log("Encomendas renderizadas após geração.");
  } else {
    console.log("Encomendas já carregadas do IndexedDB:", encomendas);

    // Renderizar encomendas
    renderEncomendas();
    console.log("Encomendas renderizadas após carregamento.");
  }

  // Restaurar paletes
  restaurarPaletes();
  console.log("Paletes restauradas.");
};
