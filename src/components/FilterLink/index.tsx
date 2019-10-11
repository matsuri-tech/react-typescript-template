import { Dispatch, State } from "@/"
import { Link } from "@/components/Link"
import { useDispatch, useSelector } from "react-redux"
import { visibilityFilters } from "@/redux/constants/visibilityFilters"
import React, { useCallback } from "react"

export interface FilterLinkProps {
    filter: keyof typeof visibilityFilters
    children: string
}

export const FilterLink: React.FC<FilterLinkProps> = ({ children, filter }) => {
    const active = useSelector<State, boolean>(
        state => filter === state.visibilityFilter
    )
    const dispatch = useDispatch<Dispatch>()

    const handleClick = useCallback(() => {
        dispatch({
            type: "SET_VISIBILITY_FILTER",
            payload: filter
        })
    }, [dispatch, filter])

    return (
        <Link active={active} onClick={handleClick}>
            {children}
        </Link>
    )
}
