import { useReducer } from "react"

export interface ForumState {
  page: number;
  total: number;
}

export interface SetPageAction {
  type: "SET_PAGE";
  payload: number;
}

export interface SetTotalAction {
  type: "SET_TOTAL";
  payload: number;
}

export type ForumAction = SetPageAction | SetTotalAction;

export const state: ForumState = {
    page: 0,
    total: 0,
}

export const reducer = (state: ForumState, action: ForumAction) => {
    switch (action.type) {
    case "SET_PAGE":
        return { ...state, page: action.payload }
    case "SET_TOTAL":
        return { ...state, total: action.payload }
    default:
        return state
    }
}

export const useForumReducer = () => {
    return useReducer(reducer, state)
}
