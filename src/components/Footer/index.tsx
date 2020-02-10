import { FilterLink } from "../FilterLink"
import { visibilityFilters } from "../..//redux/constants"
import React from "react"
import styled from "styled-components"

const Root = styled.footer`
    display: flex;
    align-items: center;
`

const Label = styled.span`
    margin-right: 0.5em;
`

export const Footer = () => {
    return (
        <Root>
            <Label>Show: </Label>
            <FilterLink filter={visibilityFilters.SHOW_ALL}>All</FilterLink>
            <FilterLink filter={visibilityFilters.SHOW_ACTIVE}>
                Active
            </FilterLink>
            <FilterLink filter={visibilityFilters.SHOW_COMPLETED}>
                Completed
            </FilterLink>
        </Root>
    )
}
