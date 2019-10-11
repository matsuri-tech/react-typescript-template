import { Dispatch, State } from "@/"
import { TodoList } from "@/components/TodoList"
import { useDispatch, useSelector } from "react-redux"
import { visibilityFilters } from "@/redux/constants"
import React, { useCallback } from "react"

export interface VisibleTodoListProps {}

export const VisibleTodoList: React.FC<VisibleTodoListProps> = () => {
    const todos = useSelector<State, State["todos"]>(state => {
        switch (state.visibilityFilter) {
            case visibilityFilters.SHOW_ALL:
                return state.todos
            case visibilityFilters.SHOW_COMPLETED:
                return state.todos.filter(t => t.completed)
            case visibilityFilters.SHOW_ACTIVE:
                return state.todos.filter(t => !t.completed)
            default:
                return state.todos
        }
    })
    const dispatch = useDispatch<Dispatch>()
    const handleToggleTodo = useCallback(
        (id: number) => () => {
            dispatch({ type: "TOGGLE_TODO", meta: { id } })
        },
        [dispatch]
    )
    return <TodoList todos={todos} toggleTodo={handleToggleTodo} />
}
