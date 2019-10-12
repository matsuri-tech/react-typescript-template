import "./style.css"
import "ress"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./App"
import { Provider, useSelector as _useSelector } from "react-redux"
import { createStore } from "redux"
import rootReducer from "@/redux/reducers"

const store = createStore(rootReducer)

export type Store = StateType<typeof rootReducer>

export const useSelector = _useSelector as <TSelected>(
    selector: (state: Store) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
