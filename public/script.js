// SOCKET.IO

const socket = io();

socket.on('reservaProcessada', (reserva) => {

    const listaProcessadas =
        document.getElementById('processadas');

    listaProcessadas.innerHTML += `
        <li>
            PROCESSADA:
            ${reserva.nome}
            -
            Vaga ${reserva.vaga}
        </li>
    `;

});

// CRIAR RESERVA
async function criarReserva() {

    const nome =
        document.getElementById('nome').value;

    const vaga =
        document.getElementById('vaga').value;

    if (!nome || !vaga) {

        alert('Preencha todos os campos');

        return;

    }

    const resposta = await fetch('/reservas', {

        method: 'POST',

        headers: {
            'Content-Type':
                'application/json'
        },

        body: JSON.stringify({
            nome,
            vaga
        })

    });

    const dados =
        await resposta.json();

    if (!resposta.ok) {

        alert(dados.mensagem);

        return;

    }

    alert('Reserva criada!');

    document.getElementById('nome').value = '';

    document.getElementById('vaga').value = '';

}

// LISTAR RESERVAS

async function listarReservas() {

    const resposta =
        await fetch('/reservas');

    const reservas =
        await resposta.json();

    const lista =
        document.getElementById('lista');

    lista.innerHTML = '';

    reservas.forEach(reserva => {

        lista.innerHTML += `
            <li>
                ${reserva.nome}
                -
                ${reserva.vaga}
            </li>
        `;

    });

}