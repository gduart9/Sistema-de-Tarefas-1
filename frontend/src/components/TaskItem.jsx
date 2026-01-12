export function TaskItem({ task, onDelete, onEdit }) {
  return (
    <li>
      {task.title}

      <button onClick={() => onEdit(task)}>Editar</button>
      <button onClick={() => onDelete(task.id)}>Excluir</button>
    </li>
  );
}
