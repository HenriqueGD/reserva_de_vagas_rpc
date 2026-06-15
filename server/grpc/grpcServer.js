const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const packageDefinition =
    protoLoader.loadSync(
        path.join(__dirname, 'reserva.proto')
    );

const proto =
    grpc.loadPackageDefinition(
        packageDefinition
    );

function validarReserva(call, callback) {

    console.log(
        'Validação recebida via gRPC:',
        call.request
    );

    callback(null, {

        sucesso: true,
        mensagem:
            'Reserva validada via gRPC'

    });

}

const server =
    new grpc.Server();

server.addService(
    proto.ReservaService.service,
    {
        ValidarReserva:
            validarReserva
    }
);

server.bindAsync(
    '0.0.0.0:50051',
    grpc.ServerCredentials.createInsecure(),
    () => {

        console.log(
            'Servidor gRPC rodando na porta 50051'
        );

    }
);