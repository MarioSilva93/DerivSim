
const nomesHomem = ["João Silva", "Carlos Almeida", "Rui Mendes", "Tiago Lopes", "Pedro Matos"];
const nomesMulher = ["Maria Santos", "Ana Costa", "Beatriz Rocha", "Sofia Nunes", "Luciana Vieira"];

function gerarAleatorio() {
  const isMulher = Math.random() > 0.5;
  const nome = isMulher
    ? nomesMulher[Math.floor(Math.random() * nomesMulher.length)]
    : nomesHomem[Math.floor(Math.random() * nomesHomem.length)];
  const idade = Math.floor(Math.random() * 25) + 20;
  const altura = Math.floor(Math.random() * 30) + 160;
  const peso = Math.floor(Math.random() * 50) + 50;
  const carta = Math.random() > 0.5 ? "B" : "CE";
  const foto = isMulher ? "../assets/images/placeholder2.png" : "../assets/images/placeholder1.png";

  return { nome, idade, altura, peso, carta, foto };
}

function contratar(t) {
  let contratados = JSON.parse(indexedDB.getItem("meusTrabalhadores")) || [];
  contratados.push(t);
  indexedDB.setItem("meusTrabalhadores", JSON.stringify(contratados));
  alert(t.nome + " foi contratado com sucesso!");
}

function gerarTrabalhadores() {
  const container = document.getElementById("candidatesContainer");
  container.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const t = gerarAleatorio();
    const card = document.createElement("div");
    card.className = "worker-card";
    card.innerHTML = `
      <img src="${t.foto}" alt="${t.nome}">
      <div class="worker-info">
        <h3>${t.nome}</h3>
        <p><strong>Idade:</strong> ${t.idade} anos</p>
        <p><strong>Altura:</strong> ${t.altura} cm</p>
        <p><strong>Peso:</strong> ${t.peso} kg</p>
        <p><strong>Carta:</strong> ${t.carta}</p>
        <button onclick='contratar(${JSON.stringify(t)})'>Contratar</button>
      </div>
    `;
    container.appendChild(card);
  }
}

gerarTrabalhadores();
