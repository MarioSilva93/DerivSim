
function atualizarEstado(veiculos) {
  const lista = document.getElementById("vehicleList");
  lista.innerHTML = "";
  veiculos.forEach((v, i) => {
    v.fuel = v.fuel ?? Math.floor(Math.random() * 100);
    v.maintenance = v.maintenance ?? Math.floor(Math.random() * 100);

    const item = document.createElement("div");
    item.className = "vehicle-card";
    item.innerHTML = `
      <h3>${v.model}</h3>
      <p><strong>Combustível:</strong> ${v.fuel}%</p>
      <p><strong>Manutenção:</strong> ${v.maintenance}%</p>
      <button onclick="agendar(${i})">Agendar Manutenção</button>
      <button onclick="abastecer(${i})">Pedir Abastecimento</button>
    `;
    lista.appendChild(item);
  });
  indexedDB.setItem("meusVeiculos", JSON.stringify(veiculos));
}

function agendar(index) {
  const veiculos = JSON.parse(indexedDB.getItem("meusVeiculos")) || [];
  veiculos[index].maintenance = 100;
  alert("Manutenção agendada para: " + veiculos[index].model);
  atualizarEstado(veiculos);
}

function abastecer(index) {
  const veiculos = JSON.parse(indexedDB.getItem("meusVeiculos")) || [];
  veiculos[index].fuel = 100;
  alert("Pedido de abastecimento enviado para: " + veiculos[index].model);
  atualizarEstado(veiculos);
}

const veiculos = JSON.parse(indexedDB.getItem("meusVeiculos")) || [];
atualizarEstado(veiculos);
