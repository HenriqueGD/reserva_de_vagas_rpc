------------------------------------------------------

● ARQUITETURA DO SISTEMA ● 

O que é?
A arquitetura é a forma como os componentes do sistema se organizam e se comunicam.

┌───────────────┐
│   Frontend    │
│ HTML/CSS/JS   │
└───────┬───────┘
        │
        │ REST
        ▼
┌───────────────┐
│ Servidor Node │
│    Express    │
└───────┬───────┘
        │
        │ gRPC
        ▼
┌───────────────┐
│ Serviço gRPC  │
│  Validação    │
└───────────────┘

        │
        ▼

┌───────────────┐
│ Fila Interna  │
└───────┬───────┘
        │
        ▼

┌───────────────┐
│ Socket.IO     │
└───────────────┘

Resumo:
Sistema utiliza arquitetura cliente-servidor. 
Frontend foi desenvolvido em HTML, CSS e JavaScript.
O backend foi desenvolvido com Node.js e Express.
A comunicação entre frontend e backend ocorre através de uma API REST.
Implementação do gRPC para comunicação entre serviços, uma fila para processamento assíncrono e
Socket.IO para atualização em tempo real.

------------------------------------------------------

● DEMOSTRAÇÃO PRÁTICA ●

Mostrar
Abrir o sistema.
Criar uma reserva.
Mostrar que aparece em "Reservas Cadastradas".
Esperar alguns segundos.
Mostrar que aparece em "Reservas Processadas".
Mostrar o terminal.
Mostrar os logs do gRPC.

Resumo:
Ao cadastrar uma reserva, ela é enviada para o servidor
através da API REST. Em seguida passa por uma validação via gRPC,
é armazenada na fila e posteriormente processada. Quando o processamento termina,
o Socket.IO atualiza a tela automaticamente.

------------------------------------------------------

● EXPLICAÇÃO DA COMUNICAÇÃO SÍNCRONA ● 

O que é?
Na comunicação síncrona o cliente envia uma requisição e espera imediatamente pela resposta.

No Projeto (Quando o usuário clica em Reservar):
        Frontend
        ↓
        POST /reservas
        ↓
        Servidor
        ↓
        Resposta

Resumo:
A comunicação síncrona ocorre através da API REST. Quando o usuário cria uma reserva,
o frontend envia uma requisição POST para o servidor e aguarda a resposta para informar
se a reserva foi criada com sucesso ou não.

------------------------------------------------------

● EXPLICAÇÃO DA COMUNICAÇÃO ASSÍNCRONA ● 

O que é?
A comunicação assíncrona ocorre quando uma solicitação não é processada imediatamente. Ela entra em uma fila e será processada depois.

No projeto:
        Reserva criada
        ↓
        Fila
        ↓
        Espera 5 segundos
        ↓
        Processamento

Resumo: 
Após o cadastro da reserva, ela é colocada em uma fila interna.
O processamento não acontece imediatamente. A reserva aguarda sua vez e é processada posteriormente,
caracterizando uma comunicação assíncrona.

------------------------------------------------------

● USO DE Sockets (Socket.IO) ●

O que é?
Socket.IO permite comunicação em tempo real (sem precisar de Refresh/Atualizar a página)

No Projeto (Quando uma reserva é processada):
        Servidor
        ↓
        Socket.IO
        ↓
        Frontend

Resumo:
Foi utilizado Socket.IO para comunicação em tempo real.
Quando uma reserva é processada, o servidor envia um evento
para o navegador e a lista de reservas processadas é atualizada automaticamente
sem necessidade de atualizar a página.

------------------------------------------------------

● USO DE gRPC ●

O que é?
gRPC é uma tecnologia para comunicação entre serviços.

Normalmente:
        Servidor A
        ↓
        Servidor B

No projeto:
        POST /reservas
        ↓
        Servidor Principal
        ↓
        Serviço gRPC
        ↓
        Validação
        ↓
        Resposta
        
Resumo:
O serviço gRPC responsável pela validação das reservas. Antes de armazenar uma reserva,
o servidor principal envia os dados para o serviço gRPC, que realiza a validação e retorna uma resposta.
Dessa forma demonstramos a comunicação entre serviços.

------------------------------------------------------

● EXPLICAÇÃO SOBRE REGIÃO CRÍTICA ●

O que é?
Região crítica é um recurso compartilhado que pode ser acessado simultaneamente por várias requisições.

No projeto a região crítica é:
services/fila
routes/reservas

- Porque vários usuários podem tentar modificar essas estruturas ao mesmo tempo.

Resumo:
A região crítica do sistema é representada pela lista de reservas e pela fila de processamento.
Esses recursos são compartilhados por todas as requisições recebidas pelo servidor.

------------------------------------------------------

● SOLUÇÃO DE CONCORRÊCIA ADOTADA ●

Qual problema poderia acontecer?

Dois usuários tentam reservar a mesma vaga simultaneamente:
        Usuário A → vaga 10
        Usuário B → vaga 10

Sem controle:
        A verifica
        B verifica

        A salva
        B salva

Resultado:
duas reservas para a mesma vaga

-----

Solução utilizada:
O *Mutex* que permite que apenas uma operação por vez acesse a região crítica.
Enquanto uma reserva está sendo processada, as demais aguardam sua vez.

        Usuário A
        ↓
        Mutex libera acesso

        Usuário B
        ↓
        Aguarda

        Usuário A termina

        Usuário B continua

Resumo:
Para evitar problemas de concorrência utilizamos um Mutex.
O Mutex garante que apenas uma requisição por vez tenha acesso à região crítica.
Dessa forma evitamos condições de corrida e garantimos a integridade dos dados,
impedindo que duas reservas sejam registradas simultaneamente para a mesma vaga.

------------------------------------------------------

● RESUMO GERAL ●

Desenvolvemos um sistema web de reserva de vagas utilizando HTML, CSS, JavaScript, Node.js e Express.
Implementamos comunicação síncrona através da API REST, comunicação assíncrona utilizando
uma fila de processamento, atualização em tempo real com Socket.IO, comunicação entre serviços
usando gRPC e controle de concorrência através de Mutex. A região crítica do sistema é a lista
de reservas e a fila de processamento, protegidas para evitar condições de corrida e garantir a
consistência dos dados.