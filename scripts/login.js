function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const storedPassword = IndexedDB.getItem("user_" + username);
  if (storedPassword === password) {
    alert("Login bem-sucedido!");
    window.location.href = "desktop.html";
  } else {
    alert("Utilizador ou palavra-passe inválidos.");
  }
}
