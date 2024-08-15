import { useReducer } from "react"

export interface EditExperienceModalRefState {
  isCurrentWorking: boolean;
}

export interface SetEditExperienceModalRefAction {
  type: "SET_IS_CURRENT_WORKING";
  payload: boolean;
}

export type EditExperienceModalRefAction = SetEditExperienceModalRefAction;

export const state: EditExperienceModalRefState = {
    isCurrentWorking: false,
}

export const reducer = (state: EditExperienceModalRefState, action: EditExperienceModalRefAction) => {
    switch (action.type) {
    case "SET_IS_CURRENT_WORKING":
        return { ...state, isCurrentWorking: action.payload }
    default:
        return state
    }
}

export const useEditExperienceModalRefReducer = () => {
    return useReducer(reducer, state)
}
