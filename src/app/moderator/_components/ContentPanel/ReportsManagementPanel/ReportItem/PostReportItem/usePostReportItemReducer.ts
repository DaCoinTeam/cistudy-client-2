import { ReportPostEntity } from "@common"
import { useReducer } from "react"

export interface PostReportItemState {
    page: number
    report: ReportPostEntity
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
}

export interface SetReportAction {
    type: "SET_REPORT"
    payload: ReportPostEntity
}

export type PostReportItemAction = SetPageAction | SetReportAction

export const state: PostReportItemState = {
    page: 1,
    report: {} as ReportPostEntity,
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
    default:
        return state
    }
}

export const usePostReportItemReducer = () => {
    return useReducer(reducer, state)
}