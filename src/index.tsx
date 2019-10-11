import "ress"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as actions from "@/redux/actions"
import { ActionType, StateType } from "@/typings/redux"
import { App } from "./App"
import { Provider } from "react-redux"
import { Dispatch as TDispatch, createStore } from "redux"
import rootReducer from "@/redux/reducers"

export type Dispatch = TDispatch<ActionType<typeof actions>>
export type State = Exclude<StateType<typeof rootReducer>, undefined>

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
