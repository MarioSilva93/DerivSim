function abrirIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("JogoLogistica", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Criar o object store "paletes" se não existir
      if (!db.objectStoreNames.contains("paletes")) {
        db.createObjectStore("paletes", { keyPath: "id" });
      }

      // Criar outros object stores, se necessário
      if (!db.objectStoreNames.contains("encomendas")) {
        db.createObjectStore("encomendas", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("trabalhadores")) {
        db.createObjectStore("trabalhadores", { keyPath: "id" });
      }
    };

    request.onsuccess = function (event) {
      console.log("IndexedDB aberto com sucesso.");
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      console.error("Erro ao abrir IndexedDB:", event.target.error);
      reject(event.target.error);
    };
  });
}

function carregarDados(storeName) {
  return new Promise((resolve, reject) => {
    abrirIndexedDB().then((db) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = function () {
        console.log(`Dados carregados do store "${storeName}":`, request.result);
        resolve(request.result);
      };

      request.onerror = function (event) {
        console.error(`Erro ao carregar dados do store "${storeName}":`, event.target.error);
        reject(event.target.error);
      };
    });
  });
}