import * as actions from "../actions/todos"
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
                    id: action.payload.id,
                    text: action.payload.text,
                    completed: false
                }
            ]
        case "TOGGLE_TODO":
            return state.map(todo =>
                todo.id === action.payload.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        default:
            return state
    }
}
