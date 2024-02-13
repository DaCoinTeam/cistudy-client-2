import { DeepPartial } from "@apollo/client/utilities"
import { CourseEntity } from "@common"
import { useReducer } from "react"

export interface CourseDetailsState {
    course: DeepPartial<CourseEntity> | null
}

export interface SetCourseAction {
  type: "SET_COURSE"
  payload: DeepPartial<CourseEntity>
}

export type CourseDetailsAction = SetCourseAction;

export const state: CourseDetailsState = {
    course: null,
}

export const reducer = (
    state: CourseDetailsState,
    action: CourseDetailsAction
) => {
    switch (action.type) {
    case "SET_COURSE":
        return { ...state, course: action.payload }
    default:
        return state
    }
}

export const useCourseDetailsReducer = () => {
    return useReducer(reducer, state)
}
