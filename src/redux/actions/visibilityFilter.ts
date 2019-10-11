import { visibilityFilters } from "../constants/visibilityFilters"
export const setVisibilityFilter = (filter: keyof typeof visibilityFilters) =>
    ({
        type: "SET_VISIBILITY_FILTER",
        payload: {
            filter
        }
    } as const)
