import { Link } from "../Link"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { visibilityFilters } from "../../redux/constants/visibilityFilters"
import React from "react"

export interface FilterLinkProps {
    filter: keyof typeof visibilityFilters
    children: string
}

export const FilterLink: React.FC<FilterLinkProps> = ({ children, filter }) => {
    const active = useSelector<boolean>(
        useCallback((state) => filter === state.visibilityFilter, [filter])
    )
    const dispatch = useDispatch()

    const handleClick = useCallback(() => {
        dispatch({
            type: "SET_VISIBILITY_FILTER",
            payload: {
                filter,
            },
        })
    }, [dispatch, filter])

    return (
        <Link active={active} onClick={handleClick}>
            {children}
        </Link>
    )
}
