const emails = [
  {
    subject: "Bem-vindo à TransLogisticSimulator!",
    sender: "chefe@TransLogistic.com",
    content: "Parabéns por iniciar a tua carreira como gestor de transportes. A tua primeira missão será receber e despachar as primeiras entregas locais."
  },
  {
    subject: "Nova entrega pendente",
    sender: "cliente1@mercado.com",
    content: "Preciso que uma encomenda urgente seja entregue até às 17h na zona industrial de Uster. Pode tratar disso?"
  },
  {
    subject: "Atualização do sistema",
    sender: "it@TransLogistic.com",
    content: "Foi implementada uma nova funcionalidade no painel de gestão de rotas. Não te esqueças de verificar!"
  }
];

const emailList = document.getElementById("emailList");
const emailContent = document.getElementById("emailContent");

emails.forEach((email, index) => {
  const item = document.createElement("div");
  item.className = "email-item";
  item.innerHTML = `<strong>${email.subject}</strong><br><small>${email.sender}</small>`;
  item.onclick = () => {
    emailContent.innerHTML = `<h3>${email.subject}</h3><p><em>${email.sender}</em></p><hr><p>${email.content}</p>`;
  };
  emailList.appendChild(item);
});
