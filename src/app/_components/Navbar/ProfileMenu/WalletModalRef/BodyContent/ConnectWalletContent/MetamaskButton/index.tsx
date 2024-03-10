import { useSDK } from "@metamask/sdk-react"
import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { RootContext } from "../../../../../../../_hooks"
import { MetamaskLogoIcon } from "./MetamaskLogoIcon"
import { WalletModalRefContext } from "../../../WalletModalRefProviders"
import { CurrentContent } from "../../../useWalletModalRefReducer"

export const MetamaskButton = () => {
    const { reducer } = useContext(RootContext)!
    const [, dispatch ] = reducer

    const { reducer : walletModalRefReducer } = useContext(WalletModalRefContext)!
    const [, walletModalRefDispatch ] = walletModalRefReducer

    const { sdk } = useSDK()

    const onConnectWalletPress = async () => {
        try {
            const accounts = await sdk?.connect() as Array<string>
            if (!accounts) return
            dispatch({
                type: "SET_METAMASK_ADDRESS",
                payload: accounts.at(0) as string,
            })
            walletModalRefDispatch({
                type: "SET_CURRENT_CONTENT",
                payload: CurrentContent.Home
            })
        } catch (ex) {
            console.warn("failed to connect..", ex)
        }
    }

    return (
        <Button
            fullWidth
            onPress={onConnectWalletPress}
            startContent={<MetamaskLogoIcon size={20} />}
        >
      Metamask
        </Button>
    )
}
