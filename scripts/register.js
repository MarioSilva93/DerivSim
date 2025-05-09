let db;

function openUserDB() {
  const request = indexedDB.open("DerivSimDB", 4); // Incrementar a versão para 4

  request.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains("utilizadores")) {
      db.createObjectStore("utilizadores", { keyPath: "username" });
    }
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    const btn = document.getElementById("registerBtn");
    if (btn) btn.onclick = registarConta;
  };

  request.onerror = function (event) {
    event.preventDefault();
    console.error("Erro ao abrir IndexedDB:", event);
    alert("Erro ao abrir a base de dados. Tenta novamente.");
  };
}

function registarConta() {
  const username = document.getElementById("username")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!username || !password) {
    alert("Preenche todos os campos.");
    return;
  }

  const tx = db.transaction("utilizadores", "readwrite");
  const store = tx.objectStore("utilizadores");

  const verifica = store.get(username);
  verifica.onsuccess = function () {
    if (verifica.result) {
      alert("Nome de utilizador já existe.");
    } else {
      store.add({ username, password });
      tx.oncomplete = () => {
        alert("Conta criada com sucesso!");
        window.location.href = "login.html";
      };
    }
  };

  verifica.onerror = function () {
    alert("Erro ao verificar o nome de utilizador.");
  };
}

window.onload = openUserDB;
