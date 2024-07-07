import { useSDK } from "@metamask/sdk-react"
import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import { RootContext } from "../../../../../_hooks"
import { updateProfile } from "@services"

export const DisconnectWalletButton = () => {
    const { reducer } = useContext(RootContext)!
    const [, dispatch] = reducer

    const { sdk } = useSDK()

    const onDisconnectWalletPress = async () => {
        try {
            sdk?.terminate()
            dispatch({
                type: "SET_METAMASK_ADDRESS",
                payload: "",
            })

            await updateProfile({
                data: {
                    walletAddress: ""
                }
            })
        } catch (ex) {
            console.warn("failed to disconnect..", ex)
        }
    }

    return (
        <Button
            fullWidth
            onPress={onDisconnectWalletPress}
        >
      Disconnect
        </Button>
    )
}
