// import { useReducer } from "react"

// export interface KeyTarget {
//   key: number;
//   value: string;
// }

// export interface TargetsState {
//   keyTargets: Array<KeyTarget>;
// }

// export interface SetKeyTargetsAction {
//   type: "SET_KEY_TARGETS";
//   payload: Array<KeyTarget>;
// }

// export interface AddKeyTargetsAction {
//   type: "ADD_KEY_TARGET";
//   payload: string;
// }

// export type TargetsAction = SetKeyTargetsAction | AddKeyTargetsAction;

// export const state: TargetsState = {
//     keyTargets: [],
// }

// export const reducer = (state: TargetsState, action: TargetsAction) => {
//     switch (action.type) {
//     case "SET_KEY_TARGETS":
//         return { ...state, keyTargets: action.payload }
//     default:
//         return state
//     }
// }

// export const useTargetsReducer = () => {
//     return useReducer(reducer, state)
// }
