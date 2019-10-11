export const addTodo = (text: string, id: number) =>
    ({
        type: "ADD_TODO",
        payload: {
            text,
            id
        }
    } as const)

export const toggleTodo = (id: number) =>
    ({
        type: "TOGGLE_TODO",
        payload: {
            id
        }
    } as const)
