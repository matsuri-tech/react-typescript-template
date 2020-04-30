import { Store, useDispatch, useSelector } from "react-redux"
import { TodoList } from "../TodoList"
import { useCallback } from "react"
import { visibilityFilters } from "../../redux/constants"
import React from "react"

export interface VisibleTodoListProps {}

export const VisibleTodoList: React.FC<VisibleTodoListProps> = () => {
    const todos = useSelector<Store["todos"]>(
        useCallback((state) => {
            switch (state.visibilityFilter) {
                case visibilityFilters.SHOW_ALL:
                    return state.todos
                case visibilityFilters.SHOW_COMPLETED:
                    return state.todos.filter((t) => t.completed)
                case visibilityFilters.SHOW_ACTIVE:
                    return state.todos.filter((t) => !t.completed)
                default:
                    return state.todos
            }
        }, [])
    )
    const dispatch = useDispatch()
    const handleToggleTodo = useCallback(
        (id: number) => {
            dispatch({ type: "TOGGLE_TODO", payload: { id } })
        },
        [dispatch]
    )

    return <TodoList todos={todos} toggleTodo={handleToggleTodo} />
}
