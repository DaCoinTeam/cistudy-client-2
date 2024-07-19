"use client"
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
} from "react"
import React from "react"
import {
    WalletModalRefAction,
    WalletModalRefState,
    useWalletModalRefReducer,
} from "./useWalletModalRefReducer"
import { RootContext } from "../../../../_hooks"
import {
    ChainId,
    ERC20Contract,
    chainInfos,
    getHttpProvider,
} from "@blockchain"

interface WalletModalRefContextValue {
  reducer: [WalletModalRefState, React.Dispatch<WalletModalRefAction>];
}

export const WalletModalRefContext =
  createContext<WalletModalRefContextValue | null>(null)

export const WalletModalRefProvider = (props: { children: ReactNode }) => {
    const reducer = useWalletModalRefReducer()
    const [state] = reducer
    const { refreshBalanceKey } = state

    const { reducer: rootReducer, swrs } = useContext(RootContext)!
    const [rootState, dispatch] = rootReducer
    const { wallets } = rootState
    const { metamask } = wallets
    const { address } = metamask

    const { profileSwr } = swrs
    const { mutate } = profileSwr

    useEffect(() => {
        const handleEffect = async () => {
            if (!address) return
            const erc20Contract = new ERC20Contract(
                ChainId.KalytnTestnet,
                chainInfos[ChainId.KalytnTestnet].tokenAddress,
                getHttpProvider(ChainId.KalytnTestnet)
            )
            const balance = await erc20Contract.balanceOf().call(address)
            dispatch({
                type: "SET_METAMASK_STARCI_BALANCE",
                payload: balance
            })

            await mutate()
        }
        handleEffect()
    }, [refreshBalanceKey, address])

    const WalletModalRefContextValue: WalletModalRefContextValue = useMemo(
        () => ({
            reducer,
        }),
        [reducer]
    )

    return (
        <WalletModalRefContext.Provider value={WalletModalRefContextValue}>
            {props.children}
        </WalletModalRefContext.Provider>
    )
}
