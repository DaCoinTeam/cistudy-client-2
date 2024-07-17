import React, { useReducer } from "react"

export interface AllCoursesState {
    searchValue: string,
    viewType: React.Key
}

export interface ViewTypeAction {
    type: "SET_VIEW_TYPE"
    payload: React.Key

}
export interface SearchAction {
    type: "SET_SEARCH_VALUE"
    payload: string
  }

export type AllCoursesAction = SearchAction | ViewTypeAction;

export const state: AllCoursesState = {
    searchValue: "",
    viewType: "grid",
}

export const reducer = (
    state: AllCoursesState,
    action: AllCoursesAction
) => {
    switch (action.type) {
    case "SET_SEARCH_VALUE":
        return { ...state, searchValue: action.payload }
    case "SET_VIEW_TYPE":
        return { ...state, viewType: action.payload }
    default:
        return state
    }
}

export const useAllCoursesReducer = () => {
    return useReducer(reducer, state)
}