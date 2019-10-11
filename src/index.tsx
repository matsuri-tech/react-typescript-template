import "./style.css"
import "ress"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as actions from "@/redux/actions"
import { App } from "./App"
import { Dispatch, createStore } from "redux"
import {
    Provider,
    useDispatch as _useDispatch,
    useSelector as _useSelector
} from "react-redux"
import rootReducer from "@/redux/reducers"

const store = createStore(rootReducer)

export const useDispatch = _useDispatch as () => Dispatch<
    ActionType<typeof actions>
>

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
