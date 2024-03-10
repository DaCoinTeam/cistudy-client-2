import { useReducer } from "react"

export enum PanelSelected {
    Forum = "forum",
    Learn = "learn",
    Preview = "preview"
}

export interface HomeState {
    panelSelected: PanelSelected
}

export interface SetPanelSelectedAction {
    type: "SET_PANEL_SELECTED";
    payload: PanelSelected
}

export type HomeAction = SetPanelSelectedAction;

export const state: HomeState = {
    panelSelected: PanelSelected.Forum,
}

export const reducer = (
    state: HomeState,
    action: HomeAction
) => {
    switch (action.type) {
    case "SET_PANEL_SELECTED":
        return { ...state, panelSelected: action.payload }
    default:
        return state
    }
}

export const useHomeReducer = () => {
    return useReducer(reducer, state)
}
