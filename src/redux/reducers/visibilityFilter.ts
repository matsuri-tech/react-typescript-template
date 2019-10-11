import * as actions from "../actions/visibilityFilter"
import { Reducer } from "redux"
import { visibilityFilters } from "../constants/visibilityFilters"

type Action = ActionType<typeof actions>

const initialState = visibilityFilters.SHOW_ALL

type State = keyof typeof visibilityFilters

export const visibilityFilter: Reducer<State, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.payload.filter
        default:
            return state
    }
}
