import { useReducer } from "react"

export interface CartState {
    selectedItems: Array<string>
    allItems?: Array<string>
}

export interface SelectAction {
    type: "SET_SELECT_ITEM"
    payload: string
}
export interface UnselectAction {
    type: "SET_UNSELECT_ITEM"
    payload: string
}

export interface SelectAllItemsAction {
    type: "SET_SELECT_ALL_ITEMS"
    payload: Array<string>
}

export interface UnselectAllItemsAction {
    type: "SET_UNSELECT_ALL_ITEMS"
    payload: Array<string>

}
export type CartAction = SelectAction | UnselectAction | SelectAllItemsAction | UnselectAllItemsAction

export const state: CartState = {
    allItems: [],
    selectedItems: [],

}

export const reducer = (state: CartState, action: CartAction) => {
    switch (action.type) {
    case "SET_SELECT_ITEM":
        return {
            ...state,
            selectedItems: [...state.selectedItems, action.payload],
        }
    case "SET_UNSELECT_ITEM":
        return {
            ...state,
            selectedItems: state.selectedItems.filter(
                (item) => item !== action.payload
            ),
        }
    case "SET_SELECT_ALL_ITEMS":
        return { ...state, selectedItems: [...action.payload] }

    case "SET_UNSELECT_ALL_ITEMS":
        return { ...state, selectedItems: []}
    default:
        return state
    }
}

export const useCartReducer = () => {
    return useReducer(reducer, state)
}
