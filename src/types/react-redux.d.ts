import * as actions from "@/redux/actions"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import rootReducer from "@/redux/reducers"

declare module "react-redux" {
    type Store = StateType<typeof rootReducer>
    function useDispatch<
        TDispatch = Dispatch<ActionType<typeof actions>>
    >(): TDispatch
    function useSelector<TSelected>(
        selector: (state: Store) => TSelected,
        equalityFn?: (left: TSelected, right: TSelected) => boolean
    ): TSelected
}
