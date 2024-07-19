import { useReducer } from "react"
import { v4 as uuidv4 } from "uuid"

export interface WalletModalRefState {
  refreshBalanceKey?: string;
  refreshTransactionsKey?: string;
}

export interface SetRefreshBalanceKeyAction {
  type: "TRIGGER_REFRESH_BALANCE_KEY";
}

export interface SetRefresTransactionsKeyAction {
    type: "TRIGGER_REFRESH_TRANSACTIONS_KEY";
  }

export type WalletModalRefAction = SetRefreshBalanceKeyAction | SetRefresTransactionsKeyAction;

export const state: WalletModalRefState = {}

export const reducer = (
    state: WalletModalRefState,
    action: WalletModalRefAction
) => {
    switch (action.type) {
    case "TRIGGER_REFRESH_BALANCE_KEY":
        return { ...state, refreshBalanceKey: uuidv4() }
    case "TRIGGER_REFRESH_TRANSACTIONS_KEY":
        return { ...state, refreshTransactionsKey: uuidv4() }
    default:
        return state
    }
}

export const useWalletModalRefReducer = () => {
    return useReducer(reducer, state)
}
