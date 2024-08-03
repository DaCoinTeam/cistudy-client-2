import { useReducer } from "react"
import { v4 as uuidv4 } from "uuid"

export interface CourseDetailsState {
    refreshReviewsKey?: string
}

export interface SetRefreshReviewKeyAction {
    type: "SET_REFRESH_REVIEW_KEY";
}

export type CourseDetailsAction = SetRefreshReviewKeyAction;

export const state: CourseDetailsState = {
}

export const reducer = (
    state: CourseDetailsState,
    action: CourseDetailsAction
) => {
    switch (action.type) {
    case "SET_REFRESH_REVIEW_KEY":
        return { ...state, refreshReviewsKey: uuidv4() }
    default:
        return state
    }
}

export const useCourseDetailsReducer = () => {
    return useReducer(reducer, state)
}
