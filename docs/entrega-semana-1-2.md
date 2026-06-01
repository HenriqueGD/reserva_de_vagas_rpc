# Entrega das Semanas 1 e 2

## Tema escolhido

Sistema de Reserva de Vagas.

O sistema permite que um usuario cadastre uma solicitacao de reserva informando nome, vaga desejada e uma mensagem. As reservas cadastradas podem ser consultadas pela tela inicial e tambem pela API REST.

## Arquitetura do sistema

O projeto usa uma arquitetura simples cliente-servidor:

- Cliente web: HTML, CSS e JavaScript na pasta `public`.
- Servidor: Node.js na pasta `src`.
- API REST: endpoints `GET /mensagens` e `POST /mensagens`.
- Armazenamento temporario: lista em memoria no servidor.

## Organizacao das pastas

```text
sistema_de_Reserva _de_Vagas/
  public/
    index.html
    styles.css
    app.js
  src/
    server.js
  docs/
    entrega-semana-1-2.md
  package.json
  README.md
```

## Fluxo geral do sistema

1. O usuario acessa a tela inicial em `http://localhost:3000`.
2. O navegador carrega os arquivos HTML, CSS e JavaScript.
3. O JavaScript consulta o servidor usando `GET /mensagens`.
4. O usuario preenche o formulario de reserva.
5. O JavaScript envia os dados usando `POST /mensagens`.
6. O servidor valida os dados, salva em memoria e retorna JSON.
7. A tela atualiza a lista de reservas cadastradas.

## Semana 1 - estrutura inicial

Itens atendidos:

- Tema escolhido: Sistema de Reserva de Vagas.
- Arquitetura definida: cliente web + servidor Node.js + API REST.
- Organizacao das pastas criada.
- Interface HTML inicial funcionando.
- Servidor iniciando corretamente.
- Comunicacao basica entre HTML e servidor por `fetch`.

## Semana 2 - API REST

Itens atendidos:

- `GET /mensagens` para consultar reservas.
- `POST /mensagens` para cadastrar reservas.
- Retorno de dados em JSON.
- Armazenamento temporario das mensagens em memoria.

## Como demonstrar

1. Rodar `npm start`.
2. Abrir `http://localhost:3000`.
3. Mostrar a tela inicial funcionando.
4. Cadastrar uma reserva pelo formulario.
5. Atualizar ou consultar a lista de reservas.
6. Acessar `http://localhost:3000/mensagens` para mostrar o retorno JSON.
