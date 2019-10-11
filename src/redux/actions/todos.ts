let nextTodoId = 0

export const addTodo = (payload: string) =>
    ({
        type: "ADD_TODO",
        payload,
        meta: {
            id: nextTodoId++
        }
    } as const)

export const toggleTodo = (payload: number) =>
    ({
        type: "TOGGLE_TODO",
        meta: {
            id: payload
        }
    } as const)
