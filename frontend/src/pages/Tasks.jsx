import { useEffect, useState, useContext } from "react";
import { api } from "../services/api";
import "./Tasks.css";

import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [titulo, setTitulo] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [tituloEditado, setTituloEditado] = useState("");

  const [editadaId, setEditadaId] = useState(null);
  const [apagandoId, setApagandoId] = useState(null);
  const [novaId, setNovaId] = useState(null);

  const { signOut, user } = useContext(AuthContext);
  const navigate = useNavigate();

  async function carregarTarefas() {
    const response = await api.get("/Tarefa");
    setTasks(response.data);
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  function logout() {
    signOut();
    navigate("/");
  }

  async function criarTarefa() {
    if (!titulo.trim()) return;

    const response = await api.post("/Tarefa", {
      name: titulo,
      descricao: "Criada pelo frontend",
      status: 0,
      usuarioId: user.id
    });

    setNovaId(response.data.id);
    setTitulo("");
    carregarTarefas();

    setTimeout(() => setNovaId(null), 400);
  }

  function iniciarEdicao(task) {
    setEditandoId(task.id);
    setTituloEditado(task.name);
  }

  async function salvarEdicao(task) {
    if (!tituloEditado.trim()) return;

    await api.put(`/Tarefa/${task.id}`, {
      ...task,
      name: tituloEditado
    });

    setEditandoId(null);
    setTituloEditado("");
    setEditadaId(task.id);

    carregarTarefas();
    setTimeout(() => setEditadaId(null), 600);
  }

  async function alternarStatus(task) {
    await api.put(`/Tarefa/${task.id}`, {
      ...task,
      status: task.status === 0 ? 1 : 0
    });

    carregarTarefas();
  }

  function deletarTarefa(id) {
    setApagandoId(id);

    setTimeout(async () => {
      await api.delete(`/Tarefa/${id}`);
      setApagandoId(null);
      carregarTarefas();
    }, 300);
  }

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <span>
        Olá, {user?.name.charAt(0).toUpperCase() + user?.name.slice(1)} 👋
        </span>
        <button className="logout-btn" onClick={logout}>Sair</button>
      </header>

      <main className="tasks-container">
        <section className="card">
          <h2>Nova tarefa</h2>

          <div className="task-form">
            <input
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Nova tarefa"
            />
            <button onClick={criarTarefa}>Adicionar</button>
          </div>
        </section>

        <section className="card">
          <h2>Lista de tarefas</h2>

          <ul className="task-list">
            {tasks.map(task => (
              <li
                key={task.id}
                className={`
                  task-item
                  ${novaId === task.id ? "enter" : ""}
                  ${task.status === 1 ? "done" : ""}
                  ${editadaId === task.id ? "task-updated" : ""}
                  ${apagandoId === task.id ? "task-remove" : ""}
                `}
              >
                <div className="task-info">
                  {editandoId === task.id ? (
                    <input
                      className="edit-input"
                      value={tituloEditado}
                      onChange={e => setTituloEditado(e.target.value)}
                    />
                  ) : (
                    <span className="task-title">{task.name}</span>
                  )}
                </div>

                <div className="task-actions">
                  {editandoId === task.id ? (
                    <button onClick={() => salvarEdicao(task)}>💾</button>
                  ) : (
                    <button onClick={() => iniciarEdicao(task)}>✏️</button>
                  )}

                  <button onClick={() => alternarStatus(task)}>
                    {task.status === 1 ? "↩" : "✔️"}
                  </button>

                  <button onClick={() => deletarTarefa(task.id)}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
