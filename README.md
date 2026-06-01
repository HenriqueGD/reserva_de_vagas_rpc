# Sistema de Reserva de Vagas

Projeto simples para a disciplina de Programacao Concorrente e Distribuida.

O tema escolhido e um sistema web de reserva de vagas. Nesta primeira versao, o sistema demonstra a estrutura inicial do projeto e uma API REST com cadastro e consulta de reservas.

## Tecnologias

- HTML
- CSS
- JavaScript
- Node.js
- API REST com `GET` e `POST`

Nas proximas entregas, o projeto pode evoluir com fila de processamento, Socket.IO, gRPC e controle de concorrencia com mutex ou semaforo.

## Como executar

No terminal, dentro da pasta do projeto:

```bash
npm start
```

Depois acesse:

```text
http://localhost:3000
```

## Endpoints da API

### GET /mensagens

Consulta todas as reservas cadastradas temporariamente em memoria.

### POST /mensagens

Cadastra uma nova reserva.

Exemplo de JSON:

```json
{
  "nome": "Henrique",
  "vaga": "Vaga A01",
  "mensagem": "Solicito reserva para o periodo da manha."
}
```

## Observacao

Os dados ficam salvos apenas enquanto o servidor esta rodando. Ao reiniciar o servidor, as reservas voltam ao estado inicial.
