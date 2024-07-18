import { useReducer } from "react"

export interface TransactionsModalState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
  }

export type TransactionsModalAction = SetPageAction;

export const state: TransactionsModalState = {
    page: 1
}

export const reducer = (
    state: TransactionsModalState,
    action: TransactionsModalAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useTransactionsModalReducer = () => {
    return useReducer(reducer, state)
}