import { DeepPartial } from "@apollo/client/utilities"
import { CourseEntity } from "@common"
import { useReducer } from "react"

export interface CourseDetailsState {
  course: DeepPartial<CourseEntity> | null;
  finishFetch: boolean;
}

export interface SetCourseAction {
  type: "SET_COURSE";
  payload: DeepPartial<CourseEntity>;
}

export interface SetFinishFetchAction {
  type: "SET_FINISH_FETCH";
  payload: boolean;
}

export type CourseDetailsAction = SetCourseAction | SetFinishFetchAction;

export const state: CourseDetailsState = {
    course: null,
    finishFetch: false,
}

export const reducer = (
    state: CourseDetailsState,
    action: CourseDetailsAction
) => {
    switch (action.type) {
    case "SET_COURSE":
        return { ...state, course: action.payload }
    case "SET_FINISH_FETCH":
        return { ...state, finishFetch: action.payload }
    default:
        return state
    }
}

export const useCourseDetailsReducer = () => {
    return useReducer(reducer, state)
}
