import { getDateLabel } from "../utils/helpers";

function TaskItem({ task, onToggle }){
  const { label, color, background } = getDateLabel(task.dueDate);

  return(
    <div className={`task-item ${task.done ? "done" : ""}`}>
      <label className="task-checkbox-label">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className="custom-checkbox">
          {task.done && (
            <img src="/src/assets/icons/check.png" alt="check" className="icon-check" />
          )}
        </span>
        <span className="task-title">{task.title}</span>
      </label>
      <span
        className="task-badge"
        style={{
            color: color,
            background: background
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default TaskItem;