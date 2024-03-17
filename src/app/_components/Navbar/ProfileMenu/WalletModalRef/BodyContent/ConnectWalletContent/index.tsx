import { ModalBody, Spacer } from "@nextui-org/react"
import React from "react"
import { MetamaskButton } from "./MetamaskButton"

export const ConnectWalletContent = () => (
    <ModalBody className="p-4 gap-4 min-h-[20rem] grid place-items-center">
        <div className="w-full">
            <div className="text-sm text-center"> Connect a wallet to begin </div>
            <Spacer y={4}/>
            <MetamaskButton />
        </div>
    </ModalBody>
)