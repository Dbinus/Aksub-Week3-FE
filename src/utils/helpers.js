export function getGreeting(){
  const h = new Date().getHours();
  if(h < 12){ return "Good Morning"; }
  if(h < 17){ return "Good Afternoon"; }
  return "Good Evening";
}

export function greetingEmoji(){
  const h = new Date().getHours();
  if(h < 12){ return "👋"; }
  if(h < 17){ return "👋"; }
  return "👋";
}

export function formatHeaderDate(){
  return new Date().toLocaleDateString("en-US", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export function toDateOnly(date){
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function todayString(){
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function tomorrowString(){
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function isToday(dueDateStr){
  const today = toDateOnly(new Date());
  const due = toDateOnly(new Date(dueDateStr + "T00:00:00"));
  return due.getTime() === today.getTime();
}

export function isOverdue(dueDateStr){
  const today = toDateOnly(new Date());
  const due = toDateOnly(new Date(dueDateStr + "T00:00:00"));
  return due < today;
}

export function getDateLabel(dueDateStr){
  const today = toDateOnly(new Date());
  const due = toDateOnly(new Date(dueDateStr + "T00:00:00"));
  const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));
  if(diff === 0){ return { label: "Today", color: "#2F46DB", background: "#E8F4FF" }; }
  if(diff === 1){ return { label: "Tomorrow", color: "#D86C01", background: "#FFF7E3"}; }
  return {
    label: due.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" }),
    color: diff < 0 ? "#EF4444" : "#367812",
    background: diff < 0 ? "#FEBDBD" : "#E4FFE4"
  };
}