import { useReducer } from "react"

export interface UsersManagementPanelState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
  }

export type UsersManagementPanelAction = SetPageAction;

export const state: UsersManagementPanelState = {
    page: 1
}

export const reducer = (
    state: UsersManagementPanelState,
    action: UsersManagementPanelAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useUsersManagementPanelReducer = () => {
    return useReducer(reducer, state)
}