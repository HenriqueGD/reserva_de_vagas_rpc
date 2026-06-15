---------------------------------------------------------

O que é gRPC (Google Remote Procedure Call):
É uma tecnologia criada pela Google para permitir
que um sistema converse diretamente com outro sistema.

Fluxo Sem gRPC:
//
Navegador
   ↓
Servidor Principal

Fluxo com gRPC (O servidor principal pede informações para outro serviço):
//
Navegador
   ↓
Servidor Principal
   ↓
Servidor gRPC

-----------------------------------------------------------------

Quando um usuário cria uma reserva, o fluxo é:

Frontend
   ↓
POST /reservas
   ↓
Servidor Node.js
   ↓
gRPC
   ↓
Validação da reserva
   ↓
Retorna resposta
   ↓
Salva reserva

