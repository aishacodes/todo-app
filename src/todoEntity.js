import { entity, persistence } from "simpler-state";

export const todoEntity = entity(
  [{ task: "sleep", completed: false }],
  [persistence("My-Todos")]
);

// actions
export const addTodo = (task) =>
  todoEntity.set((state) => [...state, { task, completed: false }]);
export const toggleCompleted = (index) => {
  const todos = todoEntity.get().map((todo, todoIndex) => {
    if (todoIndex === index) todo.completed = !todo.completed;
    return todo;
  });

  return todoEntity.set(todos);
};
export const removeTodo = (index) => {
  const todos = todoEntity.get();

  return todoEntity.set(todos.filter((todo, todoIndex) => todoIndex !== index));
};
