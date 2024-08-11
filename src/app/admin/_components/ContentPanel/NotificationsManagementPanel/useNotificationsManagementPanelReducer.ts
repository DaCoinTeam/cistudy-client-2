import { useReducer } from "react"

export interface NotificationsManagementPanelState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
  }

export type NotificationsManagementPanelAction = SetPageAction;

export const state: NotificationsManagementPanelState = {
    page: 1
}

export const reducer = (
    state: NotificationsManagementPanelState,
    action: NotificationsManagementPanelAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useNotificationsManagementPanelReducer = () => {
    return useReducer(reducer, state)
}