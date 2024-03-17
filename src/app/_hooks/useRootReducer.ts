import { useReducer } from "react"
import { Address } from "web3"

export interface RootState {
    wallets: {
        metamask: {
            address: Address;
            starciBalance: bigint;
            starci2Balance: bigint;
        };
    };
}

export interface SetMetamaskAddressAction {
    type: "SET_METAMASK_ADDRESS";
    payload: Address;
}

export interface SetMetamaskStarciBalanceAction {
    type: "SET_METAMASK_STARCI_BALANCE";
    payload: bigint;
}

export interface SetMetamaskStarci2BalanceAction {
    type: "SET_METAMASK_STARCI2_BALANCE";
    payload: bigint;
}

export type RootAction =
    | SetMetamaskAddressAction
    | SetMetamaskStarciBalanceAction
    | SetMetamaskStarci2BalanceAction;

const initialState: RootState = {
    wallets: {
        metamask: {
            address: "",
            starciBalance: BigInt(0),
            starci2Balance: BigInt(0)
        }
    }
}

export const reducer = (state: RootState = initialState, action: RootAction): RootState => {
    switch (action.type) {
    case "SET_METAMASK_ADDRESS":
        return {
            ...state,
            wallets: {
                ...state.wallets,
                metamask: {
                    ...state.wallets.metamask,
                    address: action.payload
                }
            }
        }
    case "SET_METAMASK_STARCI_BALANCE":
        return {
            ...state,
            wallets: {
                ...state.wallets,
                metamask: {
                    ...state.wallets.metamask,
                    starciBalance: action.payload
                }
            }
        }
    case "SET_METAMASK_STARCI2_BALANCE":
        return {
            ...state,
            wallets: {
                ...state.wallets,
                metamask: {
                    ...state.wallets.metamask,
                    starci2Balance: action.payload
                }
            }
        }
    default:
        return state
    }
}

export const useRootReducer = () => {
    return useReducer(reducer, initialState)
}