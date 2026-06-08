# Sistema de Reserva de Vagas

Projeto desenvolvido para a disciplina de Programação Concorrente e Distribuída.

O sistema permite que usuários realizem reservas de vagas por meio de uma interface web. As reservas são enviadas para um servidor Node.js, armazenadas temporariamente em memória e processadas por uma fila interna.

Após o processamento, os clientes conectados recebem atualizações em tempo real na página, sem necessidade de recarregamento.

## Tecnologias Utilizadas

* HTML
* CSS
* JavaScript
* Node.js
* Express
* Socket.IO

## Funcionalidades

* Cadastro de reservas.
* Consulta de reservas cadastradas.
* Comunicação entre cliente e servidor utilizando API REST.
* Processamento assíncrono através de fila interna.
* Atualização em tempo real utilizando Socket.IO.
* Armazenamento temporário dos dados em memória.

## Como Executar

Instale as dependências:

```bash
npm install
```

Execute o servidor:

```bash
node server/app.js
```

Acesse no navegador:

```text
http://localhost:3000
```

## Endpoints

### GET /reservas

Retorna todas as reservas cadastradas.

### POST /reservas

Cria uma nova reserva.

Exemplo:

```json
{
  "nome": "Isabel",
  "vaga": "1"
}
```

## Observação

Os dados são armazenados apenas em memória enquanto o servidor estiver em execução. Ao reiniciar a aplicação, as informações cadastradas são removidas.
