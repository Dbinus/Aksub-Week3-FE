import { useState } from "react";
import TaskItem from "./TaskItem";

function TaskGroup({ title, tasks, icon, onToggle }){
  const [open, setOpen] = useState(true);

  return(
    <div className="task-group">
      <button className="group-header" onClick={() => setOpen(o => !o)}>
        <span className={`chevron ${open ? "open" : ""}`}>
            <img src="../src/assets/icons/chevron.png" alt="chevron" className="icon-chevron" />
        </span>
        <span className="group-icon">
            <img src="../src/assets/icons/calendar.png" alt="calendar" className="icon-calendar" />
        </span>
        <span className="group-title">{title}</span>
        <span className="group-count">{tasks.length}</span>
      </button>
      {open && (
        <div className="group-body">
          {tasks.map(t => (
            <TaskItem key={t.id} task={t} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskGroup;