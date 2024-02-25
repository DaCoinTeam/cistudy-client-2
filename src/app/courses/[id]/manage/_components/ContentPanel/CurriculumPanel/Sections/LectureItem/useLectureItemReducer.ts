import { useReducer } from "react"
import { LectureEntity } from "@common"

export interface LectureItemState {
    lecture: LectureEntity | null
}

export interface SetLectureAction {
    type: "SET_LECTURE";
    payload: LectureEntity
}

export interface UpdateLectureAction {
    type: "UPDATE_LECTURE";
    payload: Partial<LectureEntity>
}

export type LectureItemAction = SetLectureAction | UpdateLectureAction;

export const state: LectureItemState = {
    lecture: null,
}

export const reducer = (
    state: LectureItemState,
    action: LectureItemAction
) => {
    switch (action.type) {
    case "SET_LECTURE":
        return { ...state, lecture: action.payload }
    case "UPDATE_LECTURE": {
        const updatedLecture : LectureEntity = {
            ...state.lecture, ...action.payload 
        } as LectureEntity
        return { ...state, lecture: updatedLecture }
    }
    default:
        return state
    }
}

export const useLectureItemReducer = () => {
    return useReducer(reducer, state)
}
