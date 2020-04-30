import { TodoList } from "."
import React from "react"

export default {
    title: "TodoList",
    parameters: {
        component: TodoList,
    },
}

export const BasicUsage = () => {
    return (
        <TodoList
            toggleTodo={() => {}}
            todos={[
                {
                    id: 1,
                    completed: false,
                    text: "Hoge",
                },
                {
                    id: 2,
                    completed: true,
                    text: "HogeHoge",
                },
            ]}
        />
    )
}
