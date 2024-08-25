import { ReportProcessStatus } from "@common"
import { useReducer } from "react"

export interface ResolveModalState {
    postReportId: string
    verifyStatus: ReportProcessStatus
}

export type SetPostReportIdAction = {
    type: "SET_POST_REPORT_ID"
    payload: string
}

export type SetVerifyStatusAction = {
    type: "SET_VERIFY_STATUS"
    payload: ReportProcessStatus
}

export type ResolveModalAction = SetPostReportIdAction | SetVerifyStatusAction

export const state: ResolveModalState = {
    postReportId: "",
    verifyStatus: ReportProcessStatus.Rejected
}

export const reducer = (
    state: ResolveModalState,
    action: ResolveModalAction
) => {
    switch (action.type) {
    case "SET_POST_REPORT_ID":
        return {
            ...state,
            postReportId: action.payload
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