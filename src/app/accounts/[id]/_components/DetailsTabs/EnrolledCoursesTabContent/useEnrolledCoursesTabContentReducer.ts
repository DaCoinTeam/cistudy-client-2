import { useReducer } from "react"

export interface EnrolledCoursesTabContentState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
  }

export type EnrolledCoursesTabContentAction = SetPageAction;

export const state: EnrolledCoursesTabContentState = {
    page: 1
}

export const reducer = (
    state: EnrolledCoursesTabContentState,
    action: EnrolledCoursesTabContentAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useEnrolledCoursesTabContentReducer = () => {
    return useReducer(reducer, state)
}