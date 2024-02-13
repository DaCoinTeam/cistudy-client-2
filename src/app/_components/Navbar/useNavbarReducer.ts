import { useReducer } from "react"

export interface NavbarState {
  isSignUp: boolean;
  isAuthModalOpen: boolean;
}

export interface SetIsSignUpAction {
  type: "SET_IS_SIGN_UP";
  payload: boolean;
}
export interface SetIsAuthModalOpenAction {
  type: "SET_IS_AUTH_MODAL_OPEN";
  payload: boolean;
}

export type NavbarAction = SetIsSignUpAction | SetIsAuthModalOpenAction;

export const state: NavbarState = {
    isSignUp: false,
    isAuthModalOpen: false,
}

export const reducer = (state: NavbarState, action: NavbarAction) => {
    switch (action.type) {
    case "SET_IS_SIGN_UP":
        return { ...state, isSignUp: action.payload }
    case "SET_IS_AUTH_MODAL_OPEN":
        return { ...state, isAuthModalOpen: action.payload }
    default:
        return state
    }
}

export const useNavbarReducer = () => {
    return useReducer(reducer, state)
}
