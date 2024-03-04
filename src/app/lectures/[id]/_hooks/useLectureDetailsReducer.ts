import { LectureEntity } from "@common"
import { useReducer } from "react"

export interface LectureDetailsState {
    lecture: LectureEntity | null;
    finishFetch: boolean;
}

export interface SetLectureAction {
    type: "SET_LECTURE";
    payload: LectureEntity;
}

export interface SetFinishFetchAction {
    type: "SET_FINISH_FETCH";
    payload: boolean;
}

export type LectureDetailsAction = SetLectureAction | SetFinishFetchAction;

export const state: LectureDetailsState = {
    lecture: null,
    finishFetch: false,
}

export const reducer = (
    state: LectureDetailsState,
    action: LectureDetailsAction
) => {
    switch (action.type) {
    case "SET_LECTURE":
        return { ...state, lecture: action.payload }
    case "SET_FINISH_FETCH":
        return { ...state, finishFetch: action.payload }
    default:
        return state
    }
}

export const useLectureDetailsReducer = () => {
    return useReducer(reducer, state)
}
