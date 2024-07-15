import { useReducer } from "react"

export interface AllCoursesState {
    searchValue: string
}

export interface SearchAction {
    type: "SET_SEARCH_VALUE"
    payload: string
  }

export type AllCoursesAction = SearchAction;

export const state: AllCoursesState = {
    searchValue: ""
}

export const reducer = (
    state: AllCoursesState,
    action: AllCoursesAction
) => {
    switch (action.type) {
    case "SET_SEARCH_VALUE":
        return { ...state, searchValue: action.payload }
    default:
        return state
    }
}

export const useAllCoursesReducer = () => {
    return useReducer(reducer, state)
}