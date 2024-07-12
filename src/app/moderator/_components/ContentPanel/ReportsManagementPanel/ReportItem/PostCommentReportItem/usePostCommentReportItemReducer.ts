import { ReportPostCommentEntity } from "@common"
import { useReducer } from "react"

export interface PostCommentReportItemState {
    page: number
    report: ReportPostCommentEntity
    note: string
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
}

export interface SetReportAction {
    type: "SET_REPORT"
    payload: ReportPostCommentEntity
}

export interface SetNoteAction {
    type: "SET_NOTE"
    payload: string
}

export type PostCommentReportItemAction = SetPageAction | SetReportAction | SetNoteAction

export const state: PostCommentReportItemState = {
    page: 1,
    report: {} as ReportPostCommentEntity,
    note: ""
}

export const reducer = (
    state: PostCommentReportItemState,
    action: PostCommentReportItemAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    case "SET_REPORT":
        return { ...state, report: action.payload }
    case "SET_NOTE":
        return { ...state, note: action.payload }
    default:
        return state
    }
}

export const usePostCommentReportItemReducer = () => {
    return useReducer(reducer, state)
}