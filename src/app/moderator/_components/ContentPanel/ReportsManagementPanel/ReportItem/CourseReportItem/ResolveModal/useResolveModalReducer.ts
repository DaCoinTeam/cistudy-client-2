import { ReportProcessStatus } from "@common"
import { useReducer } from "react"

export interface ResolveModalState {
    reportCourseId: string
    verifyStatus: ReportProcessStatus
}

export type SetCourseReportIdAction = {
    type: "SET_COURSE_REPORT_ID"
    payload: string
}

export type SetVerifyStatusAction = {
    type: "SET_VERIFY_STATUS"
    payload: ReportProcessStatus
}

export type ResolveModalAction = SetCourseReportIdAction | SetVerifyStatusAction

export const state: ResolveModalState = {
    reportCourseId: "",
    verifyStatus: ReportProcessStatus.Rejected
}

export const reducer = (
    state: ResolveModalState,
    action: ResolveModalAction
) => {
    switch (action.type) {
    case "SET_COURSE_REPORT_ID":
        return {
            ...state,
            reportCourseId: action.payload
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