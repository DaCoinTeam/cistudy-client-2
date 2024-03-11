import { useReducer } from "react"

export enum IntervalSelected {
    ONE_DAY = "oneDay",
    ONE_WEEK = "oneWeek",
    ONE_MONTH = "oneMonth",
    ONE_YEAR = "oneYear"
}

export interface EnrollmentsSectionState {
    intervalSelected: IntervalSelected
}

export interface SetIntervalSelectedAction {
    type: "SET_INTERVAL_SELECTED";
    payload: IntervalSelected
}

export type EnrollmentsSectionAction = SetIntervalSelectedAction;

export const state: EnrollmentsSectionState = {
    intervalSelected: IntervalSelected.ONE_DAY,
}

export const reducer = (
    state: EnrollmentsSectionState,
    action: EnrollmentsSectionAction
) => {
    switch (action.type) {
    case "SET_INTERVAL_SELECTED":
        return { ...state, intervalSelected: action.payload }
    default:
        return state
    }
}

export const useEnrollmentsSectionReducer = () => {
    return useReducer(reducer, state)
}
