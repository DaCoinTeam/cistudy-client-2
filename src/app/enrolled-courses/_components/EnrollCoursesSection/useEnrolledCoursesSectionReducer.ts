import { useReducer } from "react"

export interface EnrolledCoursesSectionState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
  }

export type EnrolledCoursesSectionAction = SetPageAction;

export const state: EnrolledCoursesSectionState = {
    page: 1
}

export const reducer = (
    state: EnrolledCoursesSectionState,
    action: EnrolledCoursesSectionAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useEnrolledCoursesSectionReducer = () => {
    return useReducer(reducer, state)
}