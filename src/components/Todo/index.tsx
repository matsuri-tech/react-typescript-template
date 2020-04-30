import styled from "styled-components"

export interface TodoProps {
    onClick: () => void
    completed: boolean
    children: string
}

export const Todo = styled.li<TodoProps>`
    display: inline-block;
    padding: 0.25em 0.5em;
    text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    background-color: ${(props) =>
        props.completed ? "rgba(0, 0, 0, 0.047)" : "white"};
`
