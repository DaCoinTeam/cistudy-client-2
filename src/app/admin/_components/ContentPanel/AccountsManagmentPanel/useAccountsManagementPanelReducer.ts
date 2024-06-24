import { useReducer } from "react"

export interface AccountsManagementPanelState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
  }

export type AccountsManagementPanelAction = SetPageAction;

export const state: AccountsManagementPanelState = {
    page: 1
}

export const reducer = (
    state: AccountsManagementPanelState,
    action: AccountsManagementPanelAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useAccountsManagementPanelReducer = () => {
    return useReducer(reducer, state)
}