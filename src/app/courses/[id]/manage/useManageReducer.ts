import { useReducer } from "react"

export enum PanelSelected {
    Information = "Information",
    Curriculum = "Curriculum"
}

export interface ManageState {
  panelSelected : PanelSelected
}

export interface SetPanelSelectedAction {
  type: "SET_PANEL_SELECTED";
  payload: PanelSelected
}

export type ManageAction = SetPanelSelectedAction;

export const state: ManageState = {
    panelSelected: PanelSelected.Information,
}

export const reducer = (
    state: ManageState,
    action: ManageAction
) => {
    switch (action.type) {
    case "SET_PANEL_SELECTED":
        return { ...state, panelSelected: action.payload }
    default:
        return state
    }
}

export const useManageReducer = () => {
    return useReducer(reducer, state)
}
