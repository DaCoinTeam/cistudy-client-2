import { useReducer } from "react"

export interface AddExperienceModalRefState {
  isCurrentWorking: boolean;
}

export interface SetAddExperienceModalRefAction {
  type: "SET_IS_CURRENT_WORKING";
  payload: boolean;
}

export type AddExperienceModalRefAction = SetAddExperienceModalRefAction;

export const state: AddExperienceModalRefState = {
    isCurrentWorking: false,
}

export const reducer = (state: AddExperienceModalRefState, action: AddExperienceModalRefAction) => {
    switch (action.type) {
    case "SET_IS_CURRENT_WORKING":
        return { ...state, isCurrentWorking: action.payload }
    default:
        return state
    }
}

export const useAddExperienceModalRefReducer = () => {
    return useReducer(reducer, state)
}
