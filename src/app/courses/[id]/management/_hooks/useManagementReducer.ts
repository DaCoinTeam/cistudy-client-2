import { useReducer } from "react"

export enum PanelSelected {
    General = "general",
    Sections = "sections",
    Price = "price",
    Target = "target",
    Preview = "preview",
    Analytics = "analytics"
}

export interface ManagementState {
    panelSelected: PanelSelected
}

export interface SetPanelSelectedAction {
    type: "SET_PANEL_SELECTED";
    payload: PanelSelected
}

export type ManagementAction = SetPanelSelectedAction;

export const state: ManagementState = {
    panelSelected: PanelSelected.General,
}

export const reducer = (
    state: ManagementState,
    action: ManagementAction
) => {
    switch (action.type) {
    case "SET_PANEL_SELECTED":
        return { ...state, panelSelected: action.payload }
    default:
        return state
    }
}

export const useManagementReducer = () => {
    return useReducer(reducer, state)
}
