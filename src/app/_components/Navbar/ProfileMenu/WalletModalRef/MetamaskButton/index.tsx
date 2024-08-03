import { useSDK } from "@metamask/sdk-react"
import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { RootContext } from "../../../../../_hooks"
import { MetamaskLogoIcon } from "./MetamaskLogoIcon"
import { updateProfile } from "@services"

export const MetamaskButton = () => {
    const { reducer } = useContext(RootContext)!
    const [, dispatch] = reducer

    const { sdk } = useSDK()

    const onConnectWalletPress = async () => {
        try {
            const accounts = (await sdk?.connect()) as Array<string>
            if (!accounts) return
            
            const account = accounts.at(0) as string
            dispatch({
                type: "SET_METAMASK_ADDRESS",
                payload: account,
            })

            await updateProfile({
                data: {
                    walletAddress: account
                }
            })
        } catch (ex) {
            console.log("failed to connect..", ex)
        }
    }

    return (
        <Button
            fullWidth
            variant="flat"
            onPress={onConnectWalletPress}
            startContent={<MetamaskLogoIcon size={20} />}
        >
      Connect Wallet
        </Button>
    )
}
