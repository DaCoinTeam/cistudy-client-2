import { useReducer } from "react"

export enum IntervalSelected {
    ONE_DAY = "oneDay",
    ONE_WEEK = "oneWeek",
    ONE_MONTH = "oneMonth",
    ONE_YEAR = "oneYear"
}

export interface PriceSectionState {
    intervalSelected: IntervalSelected
}

export interface SetIntervalSelectedAction {
    type: "SET_INTERVAL_SELECTED";
    payload: IntervalSelected
}

export type PriceSectionAction = SetIntervalSelectedAction;

export const state: PriceSectionState = {
    intervalSelected: IntervalSelected.ONE_DAY,
}

export const reducer = (
    state: PriceSectionState,
    action: PriceSectionAction
) => {
    switch (action.type) {
    case "SET_INTERVAL_SELECTED":
        return { ...state, intervalSelected: action.payload }
    default:
        return state
    }
}

export const usePriceSectionReducer = () => {
    return useReducer(reducer, state)
}
