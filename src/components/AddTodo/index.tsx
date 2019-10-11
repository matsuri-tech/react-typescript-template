import { Dispatch } from "@/"
import { useDispatch } from "react-redux"
import React, { useRef } from "react"

export const AddTodo: React.FC = () => {
    const dispatch = useDispatch<Dispatch>()
    const ref = useRef<HTMLInputElement>(null)
    return (
        <div>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    if (!ref.current || !ref.current.value.trim()) {
                        return
                    }
                    dispatch({
                        type: "ADD_TODO",
                        payload: ref.current.value,
                        meta: { id: 0 }
                    })
                    ref.current.value = ""
                }}
            >
                <input ref={ref} />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}
