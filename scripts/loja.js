const vehicles = [
  {"type": "Van", "model": "Mercedes-Benz Sprinter", "maxSpeed": "120 km/h", "fuel": "80 L", "hp": "143 cv", "capacity": "3.5 toneladas", "price": "€42,000", "image": "../assets/images/sprinter.png"},
  {"type": "Van", "model": "Ford Transit", "maxSpeed": "120 km/h", "fuel": "75 L", "hp": "130 cv", "capacity": "3.5 toneladas", "price": "€38,000", "image": "../assets/images/transit.png"},
  {"type": "Van", "model": "Renault Master", "maxSpeed": "120 km/h", "fuel": "80 L", "hp": "135 cv", "capacity": "3.5 toneladas", "price": "€36,000", "image": "../assets/images/master.png"},
  {"type": "Van", "model": "Volkswagen Crafter", "maxSpeed": "120 km/h", "fuel": "75 L", "hp": "140 cv", "capacity": "3.5 toneladas", "price": "€39,000", "image": "../assets/images/crafter.png"},
  {"type": "Van", "model": "Fiat Ducato", "maxSpeed": "120 km/h", "fuel": "70 L", "hp": "120 cv", "capacity": "3.5 toneladas", "price": "€34,500", "image": "../assets/images/ducato.png"},
  {"type": "Truck", "model": "Scania R-Series", "maxSpeed": "80 km/h", "fuel": "600 L", "hp": "450 cv", "capacity": "25 toneladas", "price": "€95,000", "image": "../assets/images/scania.png"},
  {"type": "Truck", "model": "Volvo FH", "maxSpeed": "80 km/h", "fuel": "610 L", "hp": "500 cv", "capacity": "25 toneladas", "price": "€97,000", "image": "../assets/images/volvofh.png"},
  {"type": "Truck", "model": "Mercedes-Benz Actros", "maxSpeed": "80 km/h", "fuel": "580 L", "hp": "480 cv", "capacity": "25 toneladas", "price": "€92,000", "image": "../assets/images/actros.png"},
  {"type": "Truck", "model": "MAN TGX", "maxSpeed": "80 km/h", "fuel": "590 L", "hp": "470 cv", "capacity": "25 toneladas", "price": "€90,000", "image": "../assets/images/mantgx.png"},
  {"type": "Truck", "model": "DAF XF", "maxSpeed": "80 km/h", "fuel": "600 L", "hp": "460 cv", "capacity": "25 toneladas", "price": "€91,000", "image": "../assets/images/dafxf.png"},
];


function comprarVeiculo(v) {
  let lista = JSON.parse(localStorage.getItem("meusVeiculos")) || [];
  lista.push(v);
  localStorage.setItem("meusVeiculos", JSON.stringify(lista));
  alert("Veículo comprado: " + v.model);
}

function renderVehicles() {
  const container = document.getElementById("vehicleContainer");
  vehicles.forEach(v => {
    const card = document.createElement("div");
    card.className = "vehicle-card";
    card.innerHTML = `
      <img src="${v.image}" alt="${v.model}">
      <div class="vehicle-info">
        <h3>${v.model}</h3>
        <p><strong>Tipo:</strong> ${v.type}</p>
        <p><strong>Velocidade Máxima:</strong> ${v.maxSpeed}</p>
        <p><strong>Depósito:</strong> ${v.fuel}</p>
        <p><strong>Cavalos:</strong> ${v.hp}</p>
        <p><strong>Capacidade:</strong> ${v.capacity}</p>
        <p><strong>Preço:</strong> ${v.price}</p>
        <button onclick='comprarVeiculo(${JSON.stringify(v)})'>Comprar</button>
      </div>
    `;
    container.appendChild(card);
  });
}

renderVehicles();
