"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Plus, Trash2, CheckSquare, Square } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error("Failed to parse todos from localStorage");
      }
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Card className="bg-gray-800/30 backdrop-blur-lg border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">To do List</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={addTodo} className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-transparent border border-gray-700 text-gray-100 placeholder:text-gray-400 focus:border-gray-500"
          />
          <Button
            type="submit"
            variant="outline"
            size="icon"
            className="bg-transparent border border-gray-700 text-gray-200 hover:bg-gray-800/30"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </form>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {todos.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">
              No tasks yet. Add one above!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-2 rounded hover:bg-gray-700/20 transition-colors"
              >
                <div className="flex items-center space-x-2 flex-1">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {todo.completed ? (
                      <CheckSquare className="h-5 w-5 text-green-400" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </button>
                  <span
                    className={`text-sm ${todo.completed ? "line-through text-gray-500" : "text-gray-200"}`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
