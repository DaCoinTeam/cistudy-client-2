import { ReportAccountEntity } from "@common"
import { useReducer } from "react"

export interface AccountReportManagementPanelState {
    page: number
    report: ReportAccountEntity
    note: string
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
}

export interface setReportAction {
    type: "SET_REPORT"
    payload: ReportAccountEntity
}

export interface setNoteAction {
    type: "SET_NOTE"
    payload: string
}

export type AccountReportManagementPanelAction = SetPageAction | setReportAction | setNoteAction

export const state: AccountReportManagementPanelState = {
    page: 1,
    report: {} as ReportAccountEntity,
    note: "",
}

export const reducer = (
    state: AccountReportManagementPanelState,
    action: AccountReportManagementPanelAction
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

export const useAccountReportManagementPanelReducer = () => {
    return useReducer(reducer, state)
}