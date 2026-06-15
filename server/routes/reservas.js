const express = require('express');

const router = express.Router();

const reservas = require('../data/reservas');
const fila = require('../services/fila');
const grpcClient = require('../grpc/grpcClient');

const mutex =
    require('../services/mutex');

router.post('/', async (req, res) => {

    await mutex.runExclusive(
        async () => {

            const reserva =
                req.body;

            const vagaOcupada =
                reservas.find(
                    r =>
                        r.vaga === reserva.vaga
                );

            if (vagaOcupada) {

                return res.status(400).json({
                    sucesso: false,
                    mensagem:
                        'Esta vaga já está reservada.'
                });

            }

            grpcClient.ValidarReserva({

                nome:
                    reserva.nome,

                vaga:
                    reserva.vaga

            },

                (erro, respostaGrpc) => {

                    if (erro) {

                        return res.status(500).json({
                            sucesso: false
                        });

                    }

                    reservas.push(
                        reserva
                    );

                    fila.push(
                        reserva
                    );

                    res.json({

                        sucesso: true,

                        mensagem:
                            'Reserva criada',

                        grpc:
                            respostaGrpc.mensagem

                    });

                });

        }
    );

});

router.get('/', (req, res) => {

    res.json(reservas);

});

module.exports = router;