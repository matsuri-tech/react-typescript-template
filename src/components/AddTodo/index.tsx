import { useCallback, useRef } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

const Root = styled.div`
    margin-bottom: 0.5em;
`

const Input = styled.input`
    padding: 0.25em 0.5em;
    margin-right: 1em;
    border: 1px solid coral;
    outline: none;
`

const Button = styled.button`
    padding: 0.25em 0.5em;
    color: white;
    background-color: coral;
    border: 1px solid coral;
    outline: none;
`

let nextTodoId = 0
export const AddTodo: React.FC = () => {
    const dispatch = useDispatch()
    const ref = useRef<HTMLInputElement>(null)
    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (!ref.current || !ref.current.value.trim()) {
                return
            }
            dispatch({
                type: "ADD_TODO",
                payload: {
                    text: ref.current.value,
                    id: nextTodoId++
                }
            })
            ref.current.value = ""
        },
        [dispatch]
    )
    return (
        <Root>
            <form onSubmit={handleSubmit}>
                <Input ref={ref} placeholder="Enter here" />
                <Button type="submit">Add Todo</Button>
            </form>
        </Root>
    )
}
