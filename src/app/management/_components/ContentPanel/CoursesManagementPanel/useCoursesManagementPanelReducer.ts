import { useReducer } from "react"

export interface CoursesManagementPanelState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
  }

export type CoursesManagementPanelAction = SetPageAction;

export const state: CoursesManagementPanelState = {
    page: 1
}

export const reducer = (
    state: CoursesManagementPanelState,
    action: CoursesManagementPanelAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useCoursesManagementPanelReducer = () => {
    return useReducer(reducer, state)
}