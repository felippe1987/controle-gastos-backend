
---

### **README.md para o Backend**

```markdown
# Backend do Sistema de Controle de Gastos

Este é o backend do **Sistema de Controle de Gastos**, desenvolvido em Node.js com Express. Ele fornece uma API para cadastrar pessoas, transações e consultar totais.

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- NPM ou Yarn

### Passos para Executar

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/controle-gastos.git
   cd controle-gastos/backend
   npm install
   node server.js

🛠 Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript.

Express: Framework para criação da API.

CORS: Middleware para permitir requisições entre domínios.


📂 Estrutura do Projeto
backend/
├── server.js            # Ponto de entrada do backend
├── package.json         # Dependências do backend

🌟 Rotas da API
Pessoas
POST /pessoas: Cadastra uma nova pessoa.

Corpo da requisição:

json
{
  "nome": "João Silva",
  "idade": 25
}
GET /pessoas: Lista todas as pessoas cadastradas.

DELETE /pessoas/:id : Exclui uma pessoa e suas transações.

Transações
POST /transacoes: Cadastra uma nova transação.

Corpo da requisição:

json
{
  "descricao": "Salário",
  "valor": 3000,
  "tipo": "receita",
  "pessoaId": 1
}
GET /transacoes: Lista todas as transações cadastradas.

Totais
GET /totais: Retorna os totais de receitas, despesas e saldos por pessoa e geral.

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
