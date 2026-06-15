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

const client =
    new proto.ReservaService(
        'localhost:50051',
        grpc.credentials.createInsecure()
    );

module.exports = client;