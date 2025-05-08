function register() {
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;

  if (!username || !password) {
    alert("Preencha todos os campos.");
    return;
  }

  if (IndexedDB.getItem("user_" + username)) {
    alert("Este utilizador já existe.");
    return;
  }

  IndexedDB.setItem("user_" + username, password);
  alert("Conta criada com sucesso! Pode fazer login.");
  window.location.href = "login.html";
}
