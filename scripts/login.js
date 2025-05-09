let db;

function openLoginDB() {
  const request = indexedDB.open("DerivSimDB", 4); // Incrementar a versão para garantir que o onupgradeneeded seja chamado

  request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // Criar o object store "utilizadores" se não existir
    if (!db.objectStoreNames.contains("utilizadores")) {
      db.createObjectStore("utilizadores", { keyPath: "username" });
    }
  };

  request.onsuccess = function (event) {
    db = event.target.result;
    console.log("IndexedDB aberto com sucesso.");
    document.getElementById("loginBtn").onclick = fazerLogin;
  };

  request.onerror = function (event) {
    console.error("Erro ao abrir IndexedDB:", event);
    alert("Erro ao abrir a base de dados. Tente novamente.");
  };
}

function fazerLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Preenche todos os campos.");
    return;
  }

  const tx = db.transaction("utilizadores", "readonly");
  const store = tx.objectStore("utilizadores");
  const req = store.get(username);

  req.onsuccess = function () {
    const utilizador = req.result;
    if (!utilizador) {
      alert("Utilizador não encontrado.");
    } else if (utilizador.password !== password) {
      alert("Palavra-passe incorreta.");
    } else {
      alert("Login com sucesso!");
      window.location.href = "desktop.html";
    }
  };

  req.onerror = function () {
    alert("Erro ao verificar o utilizador.");
  };
}

window.onload = openLoginDB;
