import { FilterLink } from "@/components/FilterLink"
import { visibilityFilters } from "@/redux/constants"
import React from "react"

export const Footer = () => (
    <div>
        <span>Show: </span>
        <FilterLink filter={visibilityFilters.SHOW_ALL}>All</FilterLink>
        <FilterLink filter={visibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
        <FilterLink filter={visibilityFilters.SHOW_COMPLETED}>
            Completed
        </FilterLink>
    </div>
)
