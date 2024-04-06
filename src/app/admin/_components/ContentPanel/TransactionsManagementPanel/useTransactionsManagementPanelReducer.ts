import { useReducer } from "react"

export interface TransactionsManagementPanelState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
  }

export type TransactionsManagementPanelAction = SetPageAction;

export const state: TransactionsManagementPanelState = {
    page: 1
}

export const reducer = (
    state: TransactionsManagementPanelState,
    action: TransactionsManagementPanelAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useTransactionsManagementPanelReducer = () => {
    return useReducer(reducer, state)
}