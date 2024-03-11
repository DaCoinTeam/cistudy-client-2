import { useReducer } from "react"

export enum IntervalSelected {
    ONE_DAY = "oneDay",
    ONE_WEEK = "oneWeek",
    ONE_MONTH = "oneMonth",
    ONE_YEAR = "oneYear"
}

export interface EarningSectionState {
    intervalSelected: IntervalSelected
}

export interface SetIntervalSelectedAction {
    type: "SET_INTERVAL_SELECTED";
    payload: IntervalSelected
}

export type EarningSectionAction = SetIntervalSelectedAction;

export const state: EarningSectionState = {
    intervalSelected: IntervalSelected.ONE_DAY,
}

export const reducer = (
    state: EarningSectionState,
    action: EarningSectionAction
) => {
    switch (action.type) {
    case "SET_INTERVAL_SELECTED":
        return { ...state, intervalSelected: action.payload }
    default:
        return state
    }
}

export const useEarningSectionReducer = () => {
    return useReducer(reducer, state)
}
