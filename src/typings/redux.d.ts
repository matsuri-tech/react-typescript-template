export interface Action<T = any> {
    type: T
}

export interface AnyAction extends Action {
    [extraProps: string]: any
}

export type ActionsType<ActionCreators extends object> = {
    [Key in keyof ActionCreators]: ActionCreators[Key] extends (
        ...args: any[]
    ) => AnyAction
        ? ReturnType<ActionCreators[Key]>
        : never
}

export type ActionType<
    ActionCreators extends object,
    Actions = ActionsType<ActionCreators>
> = { [Key in keyof Actions]: Actions[Key] }[keyof Actions]

export type StateType<Reducer> = Parameters<Reducer>[0]
