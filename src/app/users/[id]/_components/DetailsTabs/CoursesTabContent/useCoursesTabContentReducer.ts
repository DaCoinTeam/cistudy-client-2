import { CourseEntity } from "@common"
import { useReducer } from "react"

export interface CoursesTabContentState {
    courses: Array<CourseEntity>
}

export interface SetFollowersAction {
  type: "SET_COURSES"
  payload: Array<CourseEntity>
}

export type CoursesTabContentAction = SetFollowersAction;

export const state: CoursesTabContentState = {
    courses: [],
}

export const reducer = (
    state: CoursesTabContentState,
    action: CoursesTabContentAction
) => {
    switch (action.type) {
    case "SET_COURSES":
        return { ...state, courses: action.payload }
    default:
        return state
    }
}

export const useCoursesTabContentReducer = () => {
    return useReducer(reducer, state)
}
