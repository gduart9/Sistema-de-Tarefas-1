async function criarTarefa(e) {
  e.preventDefault();

  await api.post("/api/Tarefa", {
    name: titulo,
    descricao: "Criada pelo frontend",
    status: 0,
    usuarioId: 1
  });

  setTitulo("");
  carregarTarefas();
}
