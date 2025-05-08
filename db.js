function abrirIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("JogoLogistica", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Criar stores para diferentes tipos de dados
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