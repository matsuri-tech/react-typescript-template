import "./style.css"
import "ress"
import { App } from "./App"
import { Provider } from "react-redux"
import { createStore } from "redux"
import ReactDOM from "react-dom"
import rootReducer from "@/redux/reducers"

const store = createStore(rootReducer)

export type Store = StateType<typeof rootReducer>

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
)
