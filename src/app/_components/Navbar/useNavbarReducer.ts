import { useReducer } from "react"

export interface INavbarState {
  isSignUp: boolean;
  isAuthModalOpen: boolean;
}

export interface ISetIsSignUpAction {
  type: "SET_IS_SIGN_UP";
  payload: boolean;
}
export interface ISetIsAuthModalOpenAction {
  type: "SET_IS_AUTH_MODAL_OPEN";
  payload: boolean;
}

export type NavbarAction = ISetIsSignUpAction | ISetIsAuthModalOpenAction;

export const state: INavbarState = {
    isSignUp: false,
    isAuthModalOpen: false,
}

export const reducer = (state: INavbarState, action: NavbarAction) => {
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
