import { useState } from "react";
import { todayString } from "../utils/helpers";

function TaskForm({ onAdd }){
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    if(!title.trim() || !dueDate){ return; }
    onAdd({ title: title.trim(), dueDate });
    setTitle("");
    setDueDate("");
  }

  return(
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-fields">
        <div className="field-group">
          <label className="field-label">What do you want to do?</label>
          <input
            className="field-input"
            type="text"
            placeholder="Study for mid exams..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="field-group field-date">
          <label className="field-label">When should it be done?</label>
          <div className="date-wrapper">
            <input
              className="field-input date-input"
              type="date"
              value={dueDate}
              min={todayString()}
              onChange={e => setDueDate(e.target.value)}
            />
            <span className="date-icon">
              <img src="/src/assets/icons/calendar.png" alt="calendar" className="icon-calendar" />
            </span>
          </div>
        </div>
      </div>
      <button
        className={`btn-create ${title.trim() && dueDate ? "active" : ""}`}
        type="submit"
      >
        Create
      </button>
    </form>
  );
}

export default TaskForm;