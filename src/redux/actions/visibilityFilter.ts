import { visibilityFilters } from "../constants/visibilityFilters"
export const setVisibilityFilter = (payload: keyof typeof visibilityFilters) =>
    ({
        type: "SET_VISIBILITY_FILTER",
        payload
    } as const)
