import { useEffect, useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:7204/api/Tarefa")
      .then(res => res.json())
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (tasks.length === 0) return <p>Nenhuma tarefa encontrada</p>;

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className="task-item">
          <strong>{task.name}</strong>
          <p>{task.descricao}</p>
        </li>
      ))}
    </ul>
  );
}
