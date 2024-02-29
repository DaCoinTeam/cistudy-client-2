import { useReducer } from "react"

export interface ManageCoursesPanelState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
  }

export type ManageCoursesPanelAction = SetPageAction;

export const state: ManageCoursesPanelState = {
    page: 1
}

export const reducer = (
    state: ManageCoursesPanelState,
    action: ManageCoursesPanelAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useManageCoursesPanelReducer = () => {
    return useReducer(reducer, state)
}
