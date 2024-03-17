import React, { useContext } from "react"
import { WalletModalRefContext } from "../WalletModalRefProviders"
import { CurrentContent } from "../useWalletModalRefReducer"
import { ConnectWalletContent } from "./ConnectWalletContent"
import { HomeContent } from "./HomeContent"
import { RootContext } from "../../../../../_hooks"

export const BodyContent = () => {
    const { reducer } = useContext(WalletModalRefContext)!
    const [ state ] = reducer
    const { currentContent } = state

    const { reducer : rootReducer } = useContext(RootContext)!
    const [ rootState ] = rootReducer
    const { wallets } = rootState
    const { metamask } = wallets
    const { address } = metamask

    console.log(currentContent)
    const render = () => {

        const currentContentToComponent: Record<CurrentContent, JSX.Element> = {
            [CurrentContent.Home]: <HomeContent />,
            [CurrentContent.STARCI]: <div />,
            [CurrentContent.STARCI2]: <div />,
        }
        return address ? currentContentToComponent[currentContent] : <ConnectWalletContent />
    }

    return <> {render()} </>
}
