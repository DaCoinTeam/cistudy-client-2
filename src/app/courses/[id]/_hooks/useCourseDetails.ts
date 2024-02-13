import { DeepPartial } from "@apollo/client/utilities"
import { CourseEntity } from "@common"
import { useReducer } from "react"

export interface ICourseDetailsState {
  course: DeepPartial<CourseEntity> | null;
  finishFetch: boolean;
}

export interface ISetCourseAction {
  type: "SET_COURSE";
  payload: DeepPartial<CourseEntity>;
}

export interface ISetFinishFetchAction {
  type: "SET_FINISH_FETCH";
  payload: boolean;
}

export type CourseDetailsAction = ISetCourseAction | ISetFinishFetchAction;

export const state: ICourseDetailsState = {
    course: null,
    finishFetch: false,
}

export const reducer = (
    state: ICourseDetailsState,
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
