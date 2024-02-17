import { useReducer } from "react"
import { CourseEntity } from "@common"

export enum PanelSelected {
    Information = "information",
    Curriculum = "curriculum"
}

export interface ManageState {
  courseManaged: CourseEntity | null
  panelSelected : PanelSelected
}

export interface SetCourseManagedAction {
    type: "SET_COURSE_MANAGED";
  payload: CourseEntity
}

export interface SetPanelSelectedAction {
  type: "SET_PANEL_SELECTED";
  payload: PanelSelected
}

export type ManageAction = SetCourseManagedAction | SetPanelSelectedAction;

export const state: ManageState = {
    courseManaged: null,
    panelSelected: PanelSelected.Information,
}

export const reducer = (
    state: ManageState,
    action: ManageAction
) => {
    switch (action.type) {
    case "SET_COURSE_MANAGED":
        return { ...state, courseManaged: action.payload }
    case "SET_PANEL_SELECTED":
        return { ...state, panelSelected: action.payload }
    default:
        return state
    }
}

export const useManageReducer = () => {
    return useReducer(reducer, state)
}
