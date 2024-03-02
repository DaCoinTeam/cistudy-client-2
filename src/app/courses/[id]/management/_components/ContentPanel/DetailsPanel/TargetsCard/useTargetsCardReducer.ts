import { CourseTargetEntity } from "@common"
import { useReducer } from "react"

export interface TargetsCardState {
    courseTargets: Array<CourseTargetEntity>
}

export interface SetCourseTargetsAction {
  type: "SET_COURSE_TARGETS"
  payload: Array<CourseTargetEntity>
}

export interface DeleteCourseTargetsAction {
    type: "DELETE_COURSE_TARGETS"
    payload: string
  }

export type TargetsCardAction = SetCourseTargetsAction | DeleteCourseTargetsAction;

export const state: TargetsCardState = {
    courseTargets: [],
}

export const reducer = (
    state: TargetsCardState,
    action: TargetsCardAction
) => {
    switch (action.type) {
    case "SET_COURSE_TARGETS":
        return { ...state, courseTargets: action.payload } 
    default:
        return state
    }
}

export const useTargetsCardReducer = () => {
    return useReducer(reducer, state)
}
