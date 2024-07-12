import { useReducer } from "react"

export interface CourseApprovalItemState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
}

export type CourseApprovalItemAction = SetPageAction

export const state: CourseApprovalItemState = {
    page: 1,
}

export const reducer = (
    state: CourseApprovalItemState,
    action: CourseApprovalItemAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useCourseApprovalItemReducer = () => {
    return useReducer(reducer, state)
}