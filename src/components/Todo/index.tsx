import React from "react"

export interface TodoProps {
    onClick: () => void
    completed: boolean
    children: string
}

export const Todo: React.FC<TodoProps> = ({ onClick, completed, children }) => {
    return (
        <li
            onClick={onClick}
            style={{
                textDecoration: completed ? "line-through" : "none"
            }}
        >
            {children}
        </li>
    )
}
