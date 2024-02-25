import { useReducer } from "react"
import { LectureEntity } from "@common"

export interface SectionItemState {
    lectures: Array<LectureEntity>
}

export interface SetLecturesAction {
    type: "SET_LECTURES";
    payload: Array<LectureEntity>
}

export interface UpdateLectureAction {
    type: "UPDATE_LECTURE";
    payload: LectureEntity
}

export type SectionItemAction = SetLecturesAction | UpdateLectureAction;

export const state: SectionItemState = {
    lectures: [],
}

export const reducer = (
    state: SectionItemState,
    action: SectionItemAction
) => {
    switch (action.type) {
    case "SET_LECTURES":
        return { ...state, lectures: action.payload }
    case "UPDATE_LECTURE": {
        const updated = state.lectures.map(lecture => {
            if (lecture.lectureId === action.payload.lectureId) return action.payload
            return lecture
        })
        return { ...state, lectures: updated }
    }
    default:
        return state
    }
}

export const useSectionItemReducer = () => {
    return useReducer(reducer, state)
}
