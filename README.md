# Entrega Final

## Tema escolhido

Sistema de Reserva de Vagas.

O sistema permite que usuários realizem reservas de vagas de estacionamento informando nome e número da vaga. As reservas podem ser consultadas pela interface web e pela API REST.

Além disso, as reservas são enviadas para uma fila de processamento e, após serem processadas, os clientes conectados recebem atualizações em tempo real através do Socket.IO.

Também foi implementada comunicação entre serviços utilizando gRPC e controle de concorrência utilizando Mutex.

## Arquitetura do sistema

O projeto utiliza uma arquitetura cliente-servidor:

• Cliente Web: HTML, CSS e JavaScript.
• Servidor Principal: Node.js com Express.
• API REST para cadastro e consulta de reservas.
• Fila interna para processamento assíncrono.
• Socket.IO para comunicação em tempo real.
• Serviço gRPC para validação das reservas.
• Mutex para sincronização e controle de concorrência.
• Armazenamento temporário em memória.

## Organização das Pastas

reserva-estacionamento/

public/
│
├── index.html
├── style.css
└── script.js

server/
│
├── app.js
│
├── data/
│   └── reservas.js
│
├── routes/
│   └── reservas.js
│
├── services/
│   ├── fila.js
│   └── mutex.js
│
└── grpc/
    ├── reserva.proto
    ├── grpcServer.js
    └── grpcClient.js

package.json
README.md

## Fluxo Geral do Sistema

1. O usuário acessa a aplicação pelo navegador.
2. O cliente envia uma requisição para a API REST.
3. O servidor recebe a reserva.
4. A reserva é enviada para validação através do serviço gRPC.
5. A reserva é armazenada temporariamente em memória.
6. A reserva é adicionada à fila de processamento.
7. O Mutex protege o acesso aos recursos compartilhados.
8. Após alguns segundos, a fila processa a reserva.
9. O servidor envia uma atualização para todos os clientes conectados utilizando Socket.IO.
10. A interface é atualizada automaticamente sem necessidade de atualizar a página.

## Semana 1 - Estrutura Inicial

Itens atendidos:

• Tema definido.
• Arquitetura cliente-servidor definida.
• Organização das pastas criada.
• Interface HTML funcionando.
• Servidor Node.js funcionando.
• Comunicação básica entre cliente e servidor.

## Semana 2 - API REST

Itens atendidos:

• GET /reservas
• POST /reservas
• Retorno de dados em JSON.
• Armazenamento temporário em memória.

## Semana 3 - Comunicação Assíncrona e Socket.IO

Itens atendidos:

• Implementação de fila de processamento.
• Comunicação assíncrona.
• Simulação de mensageria através de fila interna.
• Atualização automática em tempo real utilizando Socket.IO.
• Processamento posterior das reservas sem bloquear o usuário.

## Semana 4 - gRPC e Controle de Concorrência

Itens atendidos:

• Implementação de comunicação entre serviços utilizando gRPC.
• Serviço responsável pela validação das reservas.
• Implementação de região crítica.
• Proteção da lista de reservas e da fila de processamento.
• Controle de concorrência utilizando Mutex.
• Prevenção de reservas simultâneas para a mesma vaga.

## Comunicação Cliente-Servidor

A comunicação entre o navegador e o servidor ocorre através da API REST.
O cliente envia requisições HTTP para o servidor e recebe respostas em formato JSON.

## Comunicação Síncrona

A comunicação síncrona ocorre quando o usuário realiza uma reserva.

Fluxo:

Cliente
↓
POST /reservas
↓
Servidor
↓
Resposta imediata

O cliente aguarda a resposta do servidor para saber se a reserva foi criada com sucesso ou se ocorreu algum erro.

## Comunicação Assíncrona

Após o cadastro da reserva, ela é enviada para uma fila de processamento.

Fluxo:

Reserva
↓
Fila
↓
Processamento posterior

O usuário não precisa aguardar o processamento completo para continuar utilizando o sistema.

## Mensageria

A mensageria foi simulada através de uma fila interna da aplicação.
Cada reserva cadastrada é adicionada à fila e processada posteriormente.
Essa abordagem permite demonstrar o conceito de troca de mensagens entre componentes do sistema.

## Socket.IO

O Socket.IO é utilizado para atualização em tempo real.
Quando uma reserva é processada, o servidor envia um evento para todos os clientes conectados.
A interface recebe a atualização automaticamente sem necessidade de atualizar a página.

## gRPC

O sistema utiliza gRPC para comunicação entre serviços.
Antes de uma reserva ser armazenada, o servidor principal realiza uma chamada para um serviço gRPC responsável pela validação da reserva.

Fluxo:

Servidor Principal
↓
Serviço gRPC
↓
Validação da Reserva
↓
Resposta

Essa implementação demonstra comunicação distribuída entre serviços.

## Região Crítica

A região crítica do sistema é composta pelos recursos compartilhados:

• Lista de reservas.
• Fila de processamento.

Esses recursos podem ser acessados simultaneamente por múltiplas requisições.

## Problema de Concorrência

Sem controle de concorrência, dois usuários poderiam tentar reservar a mesma vaga ao mesmo tempo.

Exemplo:

Usuário A → Reserva vaga 10
Usuário B → Reserva vaga 10

Sem sincronização:

A verifica a vaga
B verifica a vaga

A salva a reserva
B salva a reserva

Resultado:

Duas reservas para a mesma vaga.

## Solução Adotada

Foi utilizado um Mutex para sincronizar o acesso aos recursos compartilhados.
O Mutex garante que apenas uma requisição por vez possa acessar a região crítica.

Fluxo:

Requisição A
↓
Entra na região crítica

Requisição B
↓
Aguarda

Requisição A termina
↓
Mutex libera acesso

Requisição B continua

Dessa forma evita-se a condição de corrida e garante-se a integridade dos dados.

## Tecnologias Utilizadas

• HTML
• CSS
• JavaScript
• Node.js
• Express
• Socket.IO
• gRPC
• async-mutex

## Como Executar

1. Instalar as dependências:

npm install

2. Executar a aplicação:

npm start

ou

node server/app.js

3. Acessar:

http://localhost:3000

4. Criar uma nova reserva.

5. Mostrar a consulta das reservas cadastradas.

6. Demonstrar a reserva entrando na fila.

7. Aguardar o processamento da fila.

8. Mostrar a atualização automática da lista de reservas processadas sem atualizar a página.

9. Mostrar no terminal a validação realizada pelo serviço gRPC.

## Endpoints

GET /reservas

Retorna todas as reservas cadastradas.

POST /reservas

Cria uma nova reserva.

Exemplo:

{
  "nome": "Natasha",
  "vaga": "1"
}

## Requisitos Atendidos

✔ Comunicação cliente-servidor
✔ API REST
✔ Método GET
✔ Método POST
✔ Comunicação síncrona
✔ Comunicação assíncrona
✔ Mensageria
✔ Socket.IO
✔ gRPC
✔ Concorrência
✔ Região crítica
✔ Mutex
✔ Mecanismo de sincronização

## Observação
Os dados permanecem armazenados apenas em memória durante a execução do servidor.
Ao reiniciar a aplicação, as reservas são removidas, pois não há persistência em banco de dados.