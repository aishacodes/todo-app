import { useState } from "react";
import "./App.css";
import { todoEntity, addTodo, toggleCompleted, removeTodo } from "./todoEntity";

function App() {
  const todos = todoEntity.use();
  const total = todoEntity.use((state) => state.length);
  const completedCount = todoEntity.use(
    (state) => state.filter((todo) => todo.completed).length
  );

  const [newTask, setNewTask] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    addTodo(newTask);
    setNewTask("");
  };
  return (
    <div className="App">
      <div className="Todo">
        <h1>Todos</h1>
        <form onSubmit={handleAddTodo}>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            type="text"
            placeholder="What needs to be done?"
          />
        </form>
        {Boolean(total) && (
          <div className="todos">
            {todos.map((todo, todoIndex) => (
              <div
                key={`todo_${todoIndex}`}
                className={`todo ${todo.completed ? "completed" : ""}`}
              >
                <span
                  className="status"
                  onClick={() => toggleCompleted(todoIndex)}
                />
                <span
                  className="task"
                  onClick={() => toggleCompleted(todoIndex)}
                >
                  {todo.task}
                </span>
                <span onClick={() => removeTodo(todoIndex)}>x</span>
              </div>
            ))}
            <p>
              Total: {total} task(s) | Complete({completedCount})
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
