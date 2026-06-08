# Entrega das Semanas 1, 2 e 3

## Tema escolhido

Sistema de Reserva de Vagas.

O sistema permite que usuários realizem reservas de vagas de estacionamento informando nome e número da vaga. As reservas podem ser consultadas pela interface web e pela API REST.

Além disso, as reservas são enviadas para uma fila de processamento e, após serem processadas, os clientes conectados recebem atualizações em tempo real através do Socket.IO.

## Arquitetura do sistema

O projeto utiliza uma arquitetura cliente-servidor:

* Cliente Web: HTML, CSS e JavaScript.
* Servidor: Node.js com Express.
* API REST para cadastro e consulta de reservas.
* Fila interna para processamento assíncrono.
* Socket.IO para comunicação em tempo real.
* Armazenamento temporário em memória.

## Organização das Pastas

```text
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
└── services/
    └── fila.js

package.json
README.md
```

## Fluxo Geral do Sistema

1. O usuário acessa a aplicação pelo navegador.
2. O cliente envia uma requisição para a API REST.
3. O servidor recebe a reserva.
4. A reserva é armazenada temporariamente em memória.
5. A reserva é adicionada à fila de processamento.
6. Após alguns segundos, a fila processa a reserva.
7. O servidor envia uma atualização para todos os clientes conectados utilizando Socket.IO.
8. A interface é atualizada automaticamente sem necessidade de atualizar a página.

## Semana 1 - Estrutura Inicial

Itens atendidos:

* Tema definido.
* Arquitetura cliente-servidor definida.
* Organização das pastas criada.
* Interface HTML funcionando.
* Servidor Node.js funcionando.
* Comunicação básica entre cliente e servidor.

## Semana 2 - API REST

Itens atendidos:

* GET /reservas
* POST /reservas
* Retorno de dados em JSON.
* Armazenamento temporário em memória.

## Semana 3 - Comunicação Assíncrona e Socket.IO

Itens atendidos:

* Implementação de fila de processamento.
* Comunicação assíncrona.
* Simulação de mensageria através de fila interna.
* Atualização automática em tempo real utilizando Socket.IO.
* Processamento posterior das reservas sem bloquear o usuário.

## Como Executar

1. Executar:

```bash
npm start
```

ou

```bash
node server/app.js
```

2. Acessar:

```text
http://localhost:3000
```

3. Criar uma nova reserva.

4. Mostrar a consulta das reservas cadastradas.

5. Demonstrar a reserva entrando na fila.

6. Aguardar o processamento da fila.

7. Mostrar a atualização automática da lista de reservas processadas sem atualizar a página.

## Endpoints

### GET /reservas

Retorna todas as reservas cadastradas.

### POST /reservas

Cria uma nova reserva.

Exemplo:

```json
{
  "nome": "Natasha",
  "vaga": "1"
}
```

## Observação

Os dados permanecem armazenados apenas em memória durante a execução do servidor. Ao reiniciar a aplicação, as reservas são removidas.
