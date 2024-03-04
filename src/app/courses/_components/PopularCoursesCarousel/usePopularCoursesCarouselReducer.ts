import { CourseEntity } from "@common"
import { useReducer } from "react"

export interface PopularCoursesCarouselState {
  courses: Array<CourseEntity>;
  finishFetch: boolean;
}

export interface SetCoursesAction {
  type: "SET_COURSES";
  payload: Array<CourseEntity>;
}

export interface SetFinishFetchAction {
  type: "SET_FINISH_FETCH";
  payload: boolean;
}

export type PopularCoursesCarouselAction = SetCoursesAction | SetFinishFetchAction;

export const state: PopularCoursesCarouselState = {
    courses: [],
    finishFetch: false,
}

export const reducer = (
    state: PopularCoursesCarouselState,
    action: PopularCoursesCarouselAction
) => {
    switch (action.type) {
    case "SET_COURSES":
        return { ...state, courses: action.payload }
    case "SET_FINISH_FETCH":
        return { ...state, finishFetch: action.payload }
    default:
        return state
    }
}

export const usePopularCoursesCarouselReducer = () => {
    return useReducer(reducer, state)
}
