import { useState, useEffect } from "react";
import {
  getGreeting,
  greetingEmoji,
  formatHeaderDate,
  todayString,
  tomorrowString,
  isToday,
  isOverdue,
} from "./utils/helpers";
import TaskForm from "./components/TaskForm";
import TaskGroup from "./components/TaskGroup";
import "./App.css";

const STORAGE_KEY = "task-mana-app.37"; //change number to test new storage

const SEED_TASKS = [
  { id: 1, title: "Complete Data Structures LAB assignment", dueDate: todayString(), done: false },
  { id: 2, title: "Attend afternoon daily scrum at ms teams", dueDate: todayString(), done: false },
  { id: 3, title: "Attend POC assignment meeting with the client", dueDate: todayString(), done: true },
  { id: 4, title: "Complete daily leetcode assignment", dueDate: todayString(), done: true },
  { id: 5, title: "Prepare product backlog for upcoming ecommerce project", dueDate: tomorrowString(), done: false },
  { id: 6, title: "Meeting with product owner to discuss payment gateway options to...", dueDate: tomorrowString(), done: false },
  { id: 7, title: "Attend POC assignment meeting with the client", dueDate: "2026-04-15", done: true },
  { id: 8, title: "Reassign developer teams", dueDate: "2026-04-20", done: false },
];

function App(){
  const [tasks, setTasks] = useState(() => {
    try{
      const stored = localStorage.getItem(STORAGE_KEY);
      if(stored){
        const parsed = JSON.parse(stored);
        return parsed.filter(t => !isOverdue(t.dueDate));
      }
    }catch{}
    return SEED_TASKS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function handleAdd({ title, dueDate }){
    const newTask = {
      id: Date.now(),
      title,
      dueDate,
      done: false,
    };
    setTasks(prev => [...prev, newTask]);
  }

  function handleToggle(id){
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  const todayTasks = tasks.filter(t => isToday(t.dueDate));
  const otherTasks = tasks.filter(t => !isToday(t.dueDate));

  return(
    <div className="page">
      <div className="card">
        <div className="card-header">
          <h1 className="greeting">
            {getGreeting()}, User {greetingEmoji()}
          </h1>
          <p className="date-sub">{formatHeaderDate()}</p>
        </div>

        <TaskForm onAdd={handleAdd} />

        <div className="divider" />

        <div className="task-list">
          {todayTasks.length > 0 && (
            <TaskGroup
              title="Today"
              tasks={todayTasks}
              onToggle={handleToggle}
            />
          )}
          {otherTasks.length > 0 && (
            <TaskGroup
              title="Other"
              tasks={otherTasks}
              onToggle={handleToggle}
            />
          )}
          {tasks.length === 0 && (
            <p className="empty-state">No tasks yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;