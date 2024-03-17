import { useReducer } from "react"

export enum CurrentContent {
    Home = "home",
    STARCI = "starci",
    STARCI2 = "starci2"
}

export interface WalletModalRefState {
    currentContent: CurrentContent
}

export interface SetCurrentContentAction {
    type: "SET_CURRENT_CONTENT";
    payload: CurrentContent
}

export type WalletModalRefAction = SetCurrentContentAction;

export const state: WalletModalRefState = {
    currentContent: CurrentContent.Home,
}

export const reducer = (
    state: WalletModalRefState,
    action: WalletModalRefAction
) => {
    switch (action.type) {
    case "SET_CURRENT_CONTENT":
        return { ...state, currentContent: action.payload }
    default:
        return state
    }
}

export const useWalletModalRefReducer = () => {
    return useReducer(reducer, state)
}
