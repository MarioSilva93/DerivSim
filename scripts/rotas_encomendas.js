let nomes = ["Alice", "Bob"];

let moradas = [
  { rua: "Willikonerstrasse 40", cidade: "Oetwil am See", pais: "Suíça" },
  { rua: "Avenida da Liberdade 210", cidade: "Lisboa", pais: "Portugal" },
  { rua: "Rue de Rivoli 99", cidade: "Paris", pais: "França" },
  { rua: "Calle de Alcalá 45", cidade: "Madrid", pais: "Espanha" },
  { rua: "Karlstrasse 12", cidade: "Munique", pais: "Alemanha" },
  { rua: "Via Roma 88", cidade: "Milão", pais: "Itália" }
];

let db;

/**
 * Opens a connection to the IndexedDB database "encomendasDB" and creates the "encomendas" object store if it doesn't exist.
 *
 * @function openDB
 * @returns {void}
 */
function openDB() {
  const request = indexedDB.open("encomendasDB", 1);

  request.onupgradeneeded = function (event) {
    // This function runs when the database is first created or when the version number changes.
    const db = event.target.result;
  
    // Check if the "encomendas" object store exists.
    if (!db.objectStoreNames.contains("encomendas")) {
      // Create the "encomendas" object store.
      const objectStore = db.createObjectStore("encomendas", {
        autoIncrement: true, // Example key generation option. Adjust as needed.
      });
      // Example indexes, modify as needed.
      objectStore.createIndex("nome", "nome", { unique: false });
      objectStore.createIndex("data", "data", { unique: false });
    }
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
  if (!lista) return;
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

// PALLETES

function criarPaleteVisual(paleteIndex, encomendasPalete) {
  const container = document.getElementById("paletes-container");
  const div = document.createElement("div");
  div.className = "palete";
  div.innerHTML = `<h4>Palete ${paleteIndex + 1}</h4><ul></ul><p><strong>Total: <span>0</span> kg</strong></p>`;
  const ul = div.querySelector("ul");

  let pesoTotal = 0;
  encomendasPalete.forEach(enc => {
    const item = document.getElementById(enc.id);
    if (item) ul.appendChild(item.cloneNode(true));
    pesoTotal += enc.peso;
  });

  div.querySelector("span").textContent = pesoTotal;
  if (pesoTotal > 100) div.classList.add("excesso");

  container.appendChild(div);
}

function carregarPaletes() {
  const tx = db.transaction("paletes", "readonly");
  const store = tx.objectStore("paletes");
  const request = store.getAll();
  request.onsuccess = function () {
    const lista = request.result;
    lista.forEach((palete, i) => criarPaleteVisual(i, palete));
  };
}

window.onload = openDB;