import { useReducer } from "react"

export enum PanelSelected {
    Reports = "reports",
    CoursesApproval = "coursesApproval",
    Instructors = "instructors",
}

export interface ModeratorState {
    panelSelected: PanelSelected
}

export interface SetPanelSelectedAction {
    type: "SET_PANEL_SELECTED"
    payload: PanelSelected
}

export type ModeratorAction = SetPanelSelectedAction;

export const state: ModeratorState = {
    panelSelected: PanelSelected.CoursesApproval,
}

export const reducer = (
    state: ModeratorState,
    action: ModeratorAction
) => {
    switch (action.type) {
    case "SET_PANEL_SELECTED":
        return { ...state, panelSelected: action.payload }
    default:
        return state
    }
}

export const useModeratorReducer = () => {
    return useReducer(reducer, state)
}
