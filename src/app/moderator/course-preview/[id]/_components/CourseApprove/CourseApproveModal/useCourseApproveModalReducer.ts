import {useReducer} from "react"

export interface CourseApproveModalState {
    courseApproveStatus: string
    note: string
}

export interface SetCourseApproveStatusAction {
    type: "SET_COURSE_APPROVE_STATUS"
    payload: string
}

export interface SetNoteAction {
    type: "SET_NOTE"
    payload: string
}

export type CourseApproveModalAction = SetCourseApproveStatusAction | SetNoteAction

export const state: CourseApproveModalState = {
    courseApproveStatus: "",
    note: ""
}

export const reducer = (
    state: CourseApproveModalState,
    action: CourseApproveModalAction
) => {
    switch (action.type) {
    case "SET_COURSE_APPROVE_STATUS":
        return { ...state, courseApproveStatus: action.payload }
    case "SET_NOTE":
        return { ...state, note: action.payload }
    default:
        return state
    }
}

export const useCourseApproveModalReducer = () => {
    return useReducer(reducer, state)
}