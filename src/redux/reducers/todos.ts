import * as actions from "../actions/todos"
import { ActionType } from "@/typings/redux"
import { Reducer } from "redux"

type Action = ActionType<typeof actions>

const initialState = [] as {
    id: number
    text: string
    completed: boolean
}[]

type State = typeof initialState

export const todos: Reducer<State, Action> = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                {
                    id: action.meta.id,
                    text: action.payload,
                    completed: false
                }
            ]
        case "TOGGLE_TODO":
            return state.map(todo =>
                todo.id === action.meta.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        default:
            return state
    }
}
