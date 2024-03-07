import { useReducer } from "react"

export enum PanelSelected {
    Details = "details",
    Curriculum = "curriculum"
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
    panelSelected: PanelSelected.Details,
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