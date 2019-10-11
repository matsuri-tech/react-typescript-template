import { Todo } from "@/components/Todo"
import React, { useCallback } from "react"

interface TodoListProps {
    todos: {
        id: number
        completed: boolean
        text: string
    }[]
    toggleTodo: (id: number) => void
}

export const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
    const handleClick = useCallback(
        (id: number) => () => {
            toggleTodo(id)
        },
        [toggleTodo]
    )
    return (
        <ul>
            {todos.map(todo => (
                <Todo
                    key={todo.id}
                    completed={todo.completed}
                    onClick={handleClick(todo.id)}
                >
                    {todo.text}
                </Todo>
            ))}
        </ul>
    )
}
