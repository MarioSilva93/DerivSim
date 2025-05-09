let db;
let encomendas = [];
let paletes = [];

const nomes = ["Carlos", "Sofia", "Miguel", "Anna", "Luc", "João", "Emma", "Pierre", "Marta", "Hans"];
const moradas = [
  { rua: "Willikonerstrasse 40", cidade: "Oetwil am See", pais: "Suíça" },
  { rua: "Avenida da Liberdade 210", cidade: "Lisboa", pais: "Portugal" },
  { rua: "Rue de Rivoli 99", cidade: "Paris", pais: "França" },
  { rua: "Calle de Alcalá 45", cidade: "Madrid", pais: "Espanha" },
  { rua: "Karlstrasse 12", cidade: "Munique", pais: "Alemanha" },
  { rua: "Via Roma 88", cidade: "Milão", pais: "Itália" }
];

function openDB() {
  const request = indexedDB.open("DerivSimDB", 4); // Atualize para a versão correta

  request.onupgradeneeded = function (event) {
    db = event.target.result;

    // Criar o object store "encomendas" se não existir
    if (!db.objectStoreNames.contains("encomendas")) {
      db.createObjectStore("encomendas", { keyPath: "id" });
    }

    // Criar o object store "paletes" se não existir
    if (!db.objectStoreNames.contains("paletes")) {
      db.createObjectStore("paletes", { autoIncrement: true });
    }
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("Banco de dados aberto com sucesso.");
    console.log("Versão do banco de dados:", db.version);
    console.log("Object stores:", db.objectStoreNames);

    carregarEncomendas();
    carregarPaletes();
  };

  request.onerror = function (event) {
    console.error("Erro ao abrir IndexedDB", event);
  };
}

function gerarEncomendas(qtd = 20) {
  const novaLista = [];
  for (let i = 0; i < qtd; i++) {
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const morada = moradas[Math.floor(Math.random() * moradas.length)];
    const peso = Math.floor(Math.random() * 25) + 1;
    novaLista.push({
      id: "e" + i,
      cliente: nome,
      rua: morada.rua,
      cidade: morada.cidade,
      pais: morada.pais,
      peso
    });
  }

  const tx = db.transaction("encomendas", "readwrite");
  const store = tx.objectStore("encomendas");
  novaLista.forEach(enc => store.put(enc));
  tx.oncomplete = () => {
    encomendas = novaLista;
    renderEncomendas();
  };
}

function carregarEncomendas() {
  const tx = db.transaction("encomendas", "readonly");
  const store = tx.objectStore("encomendas");
  const request = store.getAll();
  request.onsuccess = function () {
    encomendas = request.result;
    if (encomendas.length === 0) {
      gerarEncomendas();
    } else {
      renderEncomendas();
    }
  };
}

function renderEncomendas() {
  const lista = document.getElementById("encomendas-list");
  if (!lista) {
    console.error("Elemento #encomendas-list não encontrado no DOM!");
    return;
  }
  lista.innerHTML = "";
  encomendas.forEach(enc => {
    const li = document.createElement("li");
    li.className = "draggable";
    li.draggable = true;
    li.id = enc.id;
    li.innerHTML = `<strong>${enc.cliente}</strong><br>${enc.rua}, ${enc.cidade} (${enc.pais})<br><em>${enc.peso} kg</em>`;
    li.addEventListener("dragstart", dragStart);
    lista.appendChild(li);
  });
}

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function carregarPaletes() {
  console.log("Função carregarPaletes ainda não implementada.");
}

window.onload = openDB;
