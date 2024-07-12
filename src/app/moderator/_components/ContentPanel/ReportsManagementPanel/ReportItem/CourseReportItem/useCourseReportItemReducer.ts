import {ReportCourseEntity} from "@common"
import {useReducer} from "react"

export interface CourseReportManagementPanelState {
    page: number
    report: ReportCourseEntity
    note: string
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
}

export interface SetReportAction {
    type: "SET_REPORT"
    payload: ReportCourseEntity
}

export interface SetNoteAction {
    type: "SET_NOTE"
    payload: string
}

export type CourseReportManagementPanelAction = SetPageAction | SetReportAction | SetNoteAction;

export const state: CourseReportManagementPanelState = {
    page: 1,
    report: {} as ReportCourseEntity,
    note: ""
}

export const reducer = (
    state: CourseReportManagementPanelState,
    action: CourseReportManagementPanelAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return {...state, page: action.payload}
    case "SET_REPORT":
        return {...state, report: action.payload}
    case "SET_NOTE":
        return {...state, note: action.payload}
    default:
        return state
    }
}

export const useCourseReportManagementPanelReducer = () => {
    return useReducer(reducer, state)
}