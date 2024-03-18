import { useReducer } from "react"

export interface NavbarState {
  isSignUp: boolean;
}

export interface SetIsSignUpAction {
  type: "SET_IS_SIGN_UP";
  payload: boolean;
}

export type NavbarAction = SetIsSignUpAction;

export const state: NavbarState = {
    isSignUp: false,
}

export const reducer = (state: NavbarState, action: NavbarAction) => {
    switch (action.type) {
    case "SET_IS_SIGN_UP":
        return { ...state, isSignUp: action.payload }
    default:
        return state
    }
}

export const useNavbarReducer = () => {
    return useReducer(reducer, state)
}
