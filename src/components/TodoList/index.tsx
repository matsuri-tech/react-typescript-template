import { Todo } from "../Todo"
import React, { useCallback } from "react"
import styled from "styled-components"

export interface TodoListProps {
    todos: {
        id: number
        completed: boolean
        text: string
    }[]
    toggleTodo: (id: number) => void
}

const Root = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2em;
    li {
        margin: 0.25em 0.5em 0.25em 0px;
        &:last-child {
            margin-right: 0px;
        }
    }
`

export const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo }) => {
    const handleClick = useCallback(
        (id: number) => () => {
            toggleTodo(id)
        },
        [toggleTodo]
    )
    return (
        <Root>
            {todos.map((todo) => (
                <Todo
                    key={todo.id}
                    completed={todo.completed}
                    onClick={handleClick(todo.id)}
                >
                    {todo.text}
                </Todo>
            ))}
        </Root>
    )
}
