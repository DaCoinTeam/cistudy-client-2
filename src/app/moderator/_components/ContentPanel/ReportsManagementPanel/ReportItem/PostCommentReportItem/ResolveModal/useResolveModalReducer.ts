import { ReportProcessStatus } from "@common"
import { useReducer } from "react"

export interface ResolveModalState {
    postCommentReportId: string
    verifyStatus: ReportProcessStatus
}

export type SetPostCommentReportIdAction = {
    type: "SET_POST_COMMENT_REPORT_ID"
    payload: string
}

export type SetVerifyStatusAction = {
    type: "SET_VERIFY_STATUS"
    payload: ReportProcessStatus
}

export type ResolveModalAction = SetPostCommentReportIdAction | SetVerifyStatusAction

export const state: ResolveModalState = {
    postCommentReportId: "",
    verifyStatus: ReportProcessStatus.Rejected
}

export const reducer = (
    state: ResolveModalState,
    action: ResolveModalAction
) => {
    switch (action.type) {
    case "SET_POST_COMMENT_REPORT_ID":
        return {
            ...state,
            postCommentReportId: action.payload
        }
    case "SET_VERIFY_STATUS":
        return {
            ...state,
            verifyStatus: action.payload
        }
    default:
        return state
    }
}

export const useResolveModalReducer = () => {
    return useReducer(reducer, state)
}