import { useReducer } from "react"

export interface AnalyticsPanelState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
  }

export type AnalyticsPanelAction = SetPageAction;

export const state: AnalyticsPanelState = {
    page: 1
}

export const reducer = (
    state: AnalyticsPanelState,
    action: AnalyticsPanelAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useAnalyticsPanelReducer = () => {
    return useReducer(reducer, state)
}