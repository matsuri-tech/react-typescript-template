/**
 * Images
 */
declare module "*.png"
declare module "*.jpg"
declare module "*.svg"

/**
 * Markdown
 */
declare module "*.md" {
    const content: string
    export default content
}

/**
 * ProcessEnv
 */
declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "production" | "test"
        [key: string]: string
        /**
         * process.envを利用するときは以下に追記する
         */
    }
}

/**
 * Redux
 */
interface Action<T = any> {
    type: T
}

interface AnyAction extends Action {
    [extraProps: string]: any
}

type ActionsType<ActionCreators extends object> = {
    [Key in keyof ActionCreators]: ActionCreators[Key] extends (
        ...args: any[]
    ) => AnyAction
        ? ReturnType<ActionCreators[Key]>
        : never
}

type ActionType<
    ActionCreators extends object,
    Actions = ActionsType<ActionCreators>
> = { [Key in keyof Actions]: Actions[Key] }[keyof Actions]

type StateType<Reducer> = Exclude<Parameters<Reducer>[0], undefined>
