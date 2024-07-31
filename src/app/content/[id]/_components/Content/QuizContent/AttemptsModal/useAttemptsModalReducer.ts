import { useReducer } from "react"

export interface AttemptsModalState {
    page: number
}

export interface SetPageAction {
    type: "SET_PAGE"
    payload: number
  }

export type AttemptsModalAction = SetPageAction;

export const state: AttemptsModalState = {
    page: 1
}

export const reducer = (
    state: AttemptsModalState,
    action: AttemptsModalAction
) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    default:
        return state
    }
}

export const useAttemptsModalReducer = () => {
    return useReducer(reducer, state)
}