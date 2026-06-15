const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

require('./grpc/grpcServer');

const reservasRoutes = require('./routes/reservas');
const fila = require('./services/fila');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.use(express.json());

app.use(express.static(
    path.join(__dirname, '../public')
));

app.use('/reservas', reservasRoutes);

app.get('/teste', (req, res) => {

    res.json({
        mensagem: 'Servidor funcionando'
    });

});

io.on('connection', (socket) => {

    console.log('Cliente conectado');

});

setInterval(() => {

    if (fila.length > 0) {

        const reserva = fila.shift();

        console.log(
            'Reserva processada:',
            reserva
        );

        io.emit(
            'reservaProcessada',
            reserva
        );

    }

}, 5000);

server.listen(3000, () => {

    console.log(
        'Servidor rodando na porta 3000'
    );

});