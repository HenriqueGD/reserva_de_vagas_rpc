----------------------------------------------------

Qual recurso representa a região crítica:
A lista de reserva e a fila de processamento.

Qual problema poderia ocorrer:
Dois usuários poderiam tentar reservar a mesma vaga simultaneamente.

Qual solução foi utilizada (Mecanismo de Sincronização):
O Mutex.

Como o Mutex funciona:
Mutex permite que apenas uma operação
por vez acesse a região crítica.
Enquanto uma reserva está sendo processada,
as demais aguardam sua vez.

------------

Fluxo:
Reserva A
↓
Mutex libera acesso

Reserva B
↓
Espera sua vez

