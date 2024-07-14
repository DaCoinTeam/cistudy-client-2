import { ReportPostEntity } from "@common"
import { useReducer } from "react"

export interface PostReportItemState {
    page: number
    report: ReportPostEntity
    note: string
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
}

export interface SetReportAction {
    type: "SET_REPORT"
    payload: ReportPostEntity
}

export interface SetNoteAction {
    type: "SET_NOTE"
    payload: string
}

export type PostReportItemAction = SetPageAction | SetReportAction | SetNoteAction

export const state: PostReportItemState = {
    page: 1,
    report: {} as ReportPostEntity,
    note: ""
}

export const reducer = (
    state: PostReportItemState,
    action: PostReportItemAction
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

export const usePostReportItemReducer = () => {
    return useReducer(reducer, state)
}