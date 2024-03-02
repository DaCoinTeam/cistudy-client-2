import { useReducer } from "react"
import { CourseEntity } from "@common"

export enum PanelSelected {
    Details = "details",
    Curriculum = "curriculum"
}

export interface ManagementState {
    courseManagement: CourseEntity | null
    panelSelected: PanelSelected
}

export interface SetCourseManagedAction {
    type: "SET_COURSE_MANAGEMENT";
    payload: CourseEntity
}

export interface SetPanelSelectedAction {
    type: "SET_PANEL_SELECTED";
    payload: PanelSelected
}

export type ManagementAction = SetCourseManagedAction | SetPanelSelectedAction;

export const state: ManagementState = {
    courseManagement: null,
    panelSelected: PanelSelected.Details,
}

export const reducer = (
    state: ManagementState,
    action: ManagementAction
) => {
    switch (action.type) {
    case "SET_COURSE_MANAGEMENT":
        return { ...state, courseManagement: action.payload }
    case "SET_PANEL_SELECTED":
        return { ...state, panelSelected: action.payload }
    default:
        return state
    }
}

export const useManagementReducer = () => {
    return useReducer(reducer, state)
}
