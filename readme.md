#Proposta
Um cliente através do seu login e senha,  deseja ser atendido em uma clínica para realizar alguns serviços, cada serviço tem um valor especifico (em R$) e uma quantidade de minutos a ser realizados e pode ser atendido por um profissional, esse profissional recebe uma comissão percentual pela realização do serviço.

Com essas informações você irá construir um fluxo de atendimento permitindo que sejam adicionados em um atendimento um ou mais serviços com seus respectivos valores com a informação dos valores individuais de cada serviço e o total a ser pago.  

Após os serviços adicionados o atendente poderá iniciar e depois finalizar o atendimento visualizando o tempo de duração do atendimento durante o atendimento e o tempo final não podendo ser maior do que a quantidade de minutos estabelecido no serviço ou a soma dos minutos total dos serviços adicionados.

Ao finalizar deverá exibir um resumo do atendimento com a duração total e o valor da comissão que o profissional irá receber pelo atendimento.

#Sistema
- [x]  Criar usuário
- [x]  Atualizar usuário (Se não for um admin pedir senha) - IMPLEMENTAÇÃO WEB (API já possui função)
- [x]  Desativar usuário - IMPLEMENTAÇÃO WEB (API já possui função)
- [x]  Buscar usuários 
  - [x] Administradores
  - [x] Representantes
  - [x] Clientes 

- [x]  Autenticar usuário
- [x]  Criar serviços
- [x]  Vincular serviços a um representante
- [x]  Desfazer vinculo de representante e serviço caso o representante seja excluido - IMPLEMENTAÇÃO WEB (API já possui função) 
- [x]  Buscar serviços do representante Y (representante)
- [x]  Buscar todos os serviços disponíveis e com um representante vinculado (cliente)
- [x]  Buscar todos os serviços (para admin)
- [x]  Criar atendimento (cliente)
- [x]  Vincular serviços ao atendimento (N:1)
- [x]  Buscar os atendimentos criados pelo cliente (para o representante)
- [x]  Buscar o status dos serviços adicionados ao atendimento
- [x]  Buscar os serviços pendentes de acordo com o cliente
- [x]  Alterar o status do serviço prestado ao cliente (iniciado, pausado) - Representante
- [x]  Monitorar o tempo de desenvolvimento
- [x]  Prévia do valor da comissão do atendimento completo de acordo com o cliente
- [x]  Visualizar serviços relacionados ao representante

#Comandos
##WEBPACK
→ Comando produção: npm run build
→ Comando ambiente de desenvolvimento: npm run start

##LOCALHOST
→ Comando localhost API:  npm run start
→ Comando localhost WEB: npm run dev

##MIGRATIONS
→ db:migrate
→ db:rollback
→ db:createMigration