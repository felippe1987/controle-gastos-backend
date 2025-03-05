// Importando bibliotecas
const express = require("express");
const cors = require("cors");

// Configurando servidor
const app = express();
const port = 3001;

// Configurando middlewares
app.use(express.json());
app.use(cors());

// Banco de dados temporário já que n foi um item listado como obrigatorio
let pessoas = [];
let transacoes = [];

// Gerar ID sequencial único para pessoas e transações
const gerarId = (array) => array.length + 1;

// Cadastro de pessoas e suas transações iniciais
app.post("/pessoas", (req, res) => {
  const { nome, idade } = req.body;

  if (!nome || !idade) {
    return res.status(400).json({ error: "Nome e idade são obrigatórios." });
  }

  const novaPessoa = {
    id: gerarId(pessoas),
    nome,
    idade,
  };

  pessoas.push(novaPessoa);
  res.status(201).json(novaPessoa);
});

// Listar pessoas e suas transaçes
app.get("/pessoas", (req, res) => {
  res.json(pessoas);
});

// Deletar pessoa e suas transações associadas com ela
app.delete("/pessoas/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // Remove a pessoa do banco de dados simulando um delete
  pessoas = pessoas.filter((pessoa) => pessoa.id !== id);

  // Remove as transações da pessoa do banco de dados simulando um delete
  transacoes = transacoes.filter((transacao) => transacao.pessoaId !== id);

  res.status(204).send();
});

// Cadastro de transações associadas com pessoa
app.post("/transacoes", (req, res) => {
  const { descricao, valor, tipo, pessoaId } = req.body;

  // Validações simuladas para o cadastro de transações
  if (!descricao || !valor || !tipo || !pessoaId) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const pessoa = pessoas.find((p) => p.id === pessoaId);
  if (!pessoa) {
    return res.status(404).json({ error: "Pessoa não encontrada." });
  }

  if (pessoa.idade < 18 && tipo !== "despesa") {
    return res
      .status(400)
      .json({ error: "Menores de idade só podem ter despesas." });
  }

  const novaTransacao = {
    id: gerarId(transacoes),
    descricao,
    valor,
    tipo,
    pessoaId,
  };

  transacoes.push(novaTransacao);
  res.status(201).json(novaTransacao);
});

// Listar transações associadas com pessoa
app.get("/transacoes", (req, res) => {
  res.json(transacoes);
});

// Consulta de totais por pessoa
app.get("/totais", (req, res) => {
  const totais = pessoas.map((pessoa) => {
    const transacoesPessoa = transacoes.filter((t) => t.pessoaId === pessoa.id);

    const receitas = transacoesPessoa
      .filter((t) => t.tipo === "receita")
      .reduce((sum, t) => sum + t.valor, 0);

    const despesas = transacoesPessoa
      .filter((t) => t.tipo === "despesa")
      .reduce((sum, t) => sum + t.valor, 0);

    return {
      pessoaId: pessoa.id,
      nome: pessoa.nome,
      receitas,
      despesas,
      saldo: receitas - despesas,
    };
  });

  // Calculando totais
  const totalReceitas = totais.reduce((sum, t) => sum + t.receitas, 0);
  const totalDespesas = totais.reduce((sum, t) => sum + t.despesas, 0);
  const saldoLiquido = totalReceitas - totalDespesas;

  // Resposta
  res.json({
    totaisPorPessoa: totais,
    totalGeral: {
      totalReceitas,
      totalDespesas,
      saldoLiquido,
    },
  });
});

// Iniciar servidor e escutar na porta 3001
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Rota raiz para verificar se o servidor está funcionando
app.get("/", (req, res) => {
  res.json({
    message: "API funcionando!",
    endpoints: ["/pessoas", "/transacoes", "/totais"],
  });
});

//tentei seguir padrões de mercado com boas práticas de desenvolvimento de software, espero que gostem do resultado. Muito obrigado pela oportunidade!
