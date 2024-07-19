import { useReducer } from "react"
import { v4 as uuidv4 } from "uuid"

export interface WalletModalRefState {
  refreshBalanceKey?: string;
}

export interface SetRefreshBalanceKeyAction {
  type: "TRIGGER_REFRESH_BALANCE_KEY";
}

export type WalletModalRefAction = SetRefreshBalanceKeyAction;

export const state: WalletModalRefState = {}

export const reducer = (
    state: WalletModalRefState,
    action: WalletModalRefAction
) => {
    switch (action.type) {
    case "TRIGGER_REFRESH_BALANCE_KEY":
        return { ...state, refreshBalanceKey: uuidv4() }
    default:
        return state
    }
}

export const useWalletModalRefReducer = () => {
    return useReducer(reducer, state)
}
