import { useReducer } from "react"

export enum PanelSelected {
    Analytics = "analytics",
    Accounts = "accounts",
    Courses = "courses",
    Transactions = "transactions",
    Orders = "orders",
    Notifications = "notifications",
    Configuration = "configuration"
}

export interface AdminState {
    panelSelected: PanelSelected
}

export interface SetPanelSelectedAction {
    type: "SET_PANEL_SELECTED";
    payload: PanelSelected
}

export type AdminAction = SetPanelSelectedAction;

export const state: AdminState = {
    panelSelected: PanelSelected.Analytics,
}

export const reducer = (
    state: AdminState,
    action: AdminAction
) => {
    switch (action.type) {
    case "SET_PANEL_SELECTED":
        return { ...state, panelSelected: action.payload }
    default:
        return state
    }
}

export const useAdminReducer = () => {
    return useReducer(reducer, state)
}
