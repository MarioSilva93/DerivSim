
let db;

const veiculos = [
  { id: "v1", modelo: "Fiat Ducato", capacidade: 3500 },
  { id: "v2", modelo: "Mercedes Sprinter", capacidade: 3500 },
  { id: "v3", modelo: "Volvo FH", capacidade: 25000 },
  { id: "v4", modelo: "Scania R", capacidade: 25000 },
];

function openDB() {
  const request = indexedDB.open("DerivSimDB", 2); // versão aumentada para criar novo store

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("despachos")) {
      db.createObjectStore("despachos", { autoIncrement: true });
    }
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    renderVeiculos();
    carregarPaletes();
    document.getElementById("atribuir-btn").onclick = atribuirPaletes;
  };

  request.onerror = function (event) {
    console.error("Erro ao abrir IndexedDB", event);
  };
}

function renderVeiculos() {
  const lista = document.getElementById("lista-veiculos");
  lista.innerHTML = "";
  veiculos.forEach(v => {
    const li = document.createElement("li");
    li.innerHTML = `<input type="radio" name="veiculo" value="${v.id}"> ${v.modelo} (${v.capacidade} kg)`;
    lista.appendChild(li);
  });
}

function carregarPaletes() {
  const tx = db.transaction("paletes", "readonly");
  const store = tx.objectStore("paletes");
  const req = store.getAll();

  req.onsuccess = function () {
    const lista = req.result;
    const ul = document.getElementById("lista-paletes");
    ul.innerHTML = "";

    lista.forEach((palete, index) => {
      const total = palete.reduce((sum, e) => sum + e.peso, 0);
      const li = document.createElement("li");
      li.innerHTML = `
        <label><input type="checkbox" value="${index}"> Palete ${index + 1} - ${total} kg</label>
      `;
      ul.appendChild(li);
    });
  };
}

function atribuirPaletes() {
  const veiculo = document.querySelector("input[name='veiculo']:checked");
  if (!veiculo) {
    alert("Seleciona um veículo.");
    return;
  }

  const paletesSelecionadas = Array.from(document.querySelectorAll("#lista-paletes input[type='checkbox']:checked"))
    .map(cb => parseInt(cb.value));

  if (paletesSelecionadas.length === 0) {
    alert("Seleciona pelo menos uma palete.");
    return;
  }

  const txRead = db.transaction("paletes", "readonly");
  const storeRead = txRead.objectStore("paletes");
  const req = storeRead.getAll();

  req.onsuccess = function () {
    const allPaletes = req.result;
    const selecionadas = paletesSelecionadas.map(i => allPaletes[i]);

    const pesoTotal = selecionadas.flat().reduce((s, e) => s + e.peso, 0);

    const despacho = {
      veiculoId: veiculo.value,
      paletes: selecionadas,
      pesoTotal: pesoTotal,
      data: new Date().toISOString()
    };

    const txWrite = db.transaction("despachos", "readwrite");
    const storeDesp = txWrite.objectStore("despachos");
    storeDesp.add(despacho);

    txWrite.oncomplete = () => {
      alert("Paletes atribuídas com sucesso!");
    };
  };
}

window.onload = openDB;
