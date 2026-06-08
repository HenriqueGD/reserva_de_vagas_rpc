const express = require('express');

const router = express.Router();

const reservas = require('../data/reservas');
const fila = require('../services/fila');

router.post('/', (req, res) => {

    const reserva = req.body;

    const vagaOcupada = reservas.find(r =>
        r.vaga === reserva.vaga
    );

    if (vagaOcupada) {

        return res.status(400).json({
            sucesso: false,
            mensagem: 'Esta vaga já está reservada.'
        });

    }

    reservas.push(reserva);

    fila.push(reserva);

    res.json({
        sucesso: true,
        mensagem: 'Reserva criada'
    });

});

router.get('/', (req, res) => {

    res.json(reservas);

});

module.exports = router;