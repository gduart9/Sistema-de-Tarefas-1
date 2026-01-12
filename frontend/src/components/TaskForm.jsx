import { useState } from "react";

export default function TaskForm() {
  const [titulo, setTitulo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!titulo) return;

    fetch("https://localhost:7204/api/Tarefa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo,
        concluida: false
      })
    }).then(() => {
      setTitulo("");
      window.location.reload();
    });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nova tarefa"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
