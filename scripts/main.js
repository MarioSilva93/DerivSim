function salvarDados(storeName, data) {
  abrirIndexedDB().then((db) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);

    data.forEach((item) => {
      store.put(item);
    });

    transaction.oncomplete = function () {
      console.log(`Dados salvos no store "${storeName}":`, data);
    };

    transaction.onerror = function (event) {
      console.error(`Erro ao salvar dados no store "${storeName}":`, event.target.error);
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

function excluirDados(storeName, id) {
  abrirIndexedDB().then((db) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = function () {
      console.log(`Item com ID "${id}" excluído do store "${storeName}".`);
    };

    request.onerror = function (event) {
      console.error(`Erro ao excluir item do store "${storeName}":`, event.target.error);
    };
  });
}

// Exemplo de uso
salvarDados("encomendas", [
  { id: "e1", cliente: "Carlos", rua: "Rua A", cidade: "Lisboa", pais: "Portugal", peso: 10 },
  { id: "e2", cliente: "Sofia", rua: "Rua B", cidade: "Porto", pais: "Portugal", peso: 15 },
]);

carregarDados("encomendas").then((encomendas) => {
  console.log("Encomendas carregadas:", encomendas);
});

excluirDados("encomendas", "e1");