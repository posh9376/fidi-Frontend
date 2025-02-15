import { useState, useEffect } from "react";
import Todo from "./todo";
import axios from "axios";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      console.log(token);
      
      const response = await axios.get("https://fidi-backend-xs2o.onrender.com/todoos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sortedTodos = response.data.sort((a, b) => (a.remaining_time || 0) - (b.remaining_time || 0));
      setTodos(sortedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error.response?.data || error.message);
      alert("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authorization token");

      await axios.delete(`https://fidi-backend-xs2o.onrender.com/todo/${todoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error.response?.data || error.message);
      alert(error.response?.data?.msg || "Failed to delete todo");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto shadow-lg rounded-xl">
      <h2 className="mb-4">Todo List</h2>
      {loading ? <p>Loading todos...</p> : (
        <ul>
          {todos.length === 0 ? <p>No todos available</p> : todos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              remainingTime={Math.trunc(todo.remaining_time || 0)}
              handleDelete={() => handleDelete(todo.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

