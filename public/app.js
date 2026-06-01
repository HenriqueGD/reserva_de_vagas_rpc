const form = document.querySelector("#form-reserva");
const listaReservas = document.querySelector("#lista-reservas");
const feedback = document.querySelector("#feedback");
const statusServidor = document.querySelector("#status");
const botaoAtualizar = document.querySelector("#btn-atualizar");

async function verificarServidor() {
  try {
    const resposta = await fetch("/status");
    const dados = await resposta.json();
    statusServidor.textContent = `${dados.sistema}: ${dados.status}`;
  } catch (error) {
    statusServidor.textContent = "Servidor indisponivel";
  }
}

async function carregarReservas() {
  listaReservas.innerHTML = "<p>Carregando reservas...</p>";

  try {
    const resposta = await fetch("/mensagens");
    const dados = await resposta.json();

    if (!dados.mensagens.length) {
      listaReservas.innerHTML = "<p>Nenhuma reserva cadastrada.</p>";
      return;
    }

    listaReservas.innerHTML = dados.mensagens
      .map(
        (reserva) => `
          <article class="item">
            <strong>${reserva.vaga} - ${reserva.nome}</strong>
            <p>${reserva.mensagem}</p>
            <small>Cadastrada em ${new Date(
              reserva.dataCriacao
            ).toLocaleString("pt-BR")}</small>
          </article>
        `
      )
      .join("");
  } catch (error) {
    listaReservas.innerHTML = "<p>Erro ao consultar reservas.</p>";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const reserva = {
    nome: formData.get("nome"),
    vaga: formData.get("vaga"),
    mensagem: formData.get("mensagem")
  };

  try {
    const resposta = await fetch("/mensagens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reserva)
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      feedback.textContent = dados.erro || "Nao foi possivel cadastrar.";
      return;
    }

    feedback.textContent = dados.mensagem;
    form.reset();
    carregarReservas();
  } catch (error) {
    feedback.textContent = "Erro de comunicacao com o servidor.";
  }
});

botaoAtualizar.addEventListener("click", carregarReservas);

verificarServidor();
carregarReservas();
