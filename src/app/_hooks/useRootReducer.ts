import { CategoryEntity } from "@common"
import { useReducer } from "react"
import { Address } from "web3"


export interface RootState {
    wallets: {
        metamask: {
            address: Address;
            starciBalance: bigint;
            starci2Balance: bigint;
        };
    },
    categoryFilter: Array<CategoryEntity>;
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
export interface SetCategoryFilterAction {
    type: "SET_CATEGORY_FILTER"
    payload: Array<CategoryEntity>
  }
export interface AddCategoryFilterAction {
    type: "ADD_CATEGORY_FILTER"
    payload: CategoryEntity
  }
export interface RemoveCategoryFilterAction {
    type: "REMOVE_CATEGORY_FILTER"
    payload: Array<CategoryEntity>
  }
export interface ResetCategoryFilterAction {
    type: "RESET_CATEGORY_FILTER"
  }
export type RootAction =
    | SetMetamaskAddressAction
    | SetMetamaskStarciBalanceAction
    | SetMetamaskStarci2BalanceAction
    | SetCategoryFilterAction
    | AddCategoryFilterAction
    | RemoveCategoryFilterAction
    | ResetCategoryFilterAction

const initialState: RootState = {
    wallets: {
        metamask: {
            address: "",
            starciBalance: BigInt(0),
            starci2Balance: BigInt(0)
        }
    },
    categoryFilter: [],
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
    case "SET_CATEGORY_FILTER":
        return {
            ...state,
            categoryFilter: action.payload as Array<CategoryEntity>
        }
    case "ADD_CATEGORY_FILTER":
        return {
            ...state,
            categoryFilter: [ ...state.categoryFilter, action.payload ]
        }
    case "REMOVE_CATEGORY_FILTER":
        return {
            ...state,
            categoryFilter: state.categoryFilter.filter((c) => !action.payload.includes(c))
        }
    case "RESET_CATEGORY_FILTER":
        return {
            ...state,
            categoryFilter: []
        }
    default:
        return state
    }
}

export const useRootReducer = () => {
    return useReducer(reducer, initialState)
}