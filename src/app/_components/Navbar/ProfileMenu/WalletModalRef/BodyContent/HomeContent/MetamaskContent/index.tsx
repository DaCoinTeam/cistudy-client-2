"use client"
import React, { useContext } from "react"
import { RootContext } from "../../../../../../../_hooks"
import { ModalBody, Snippet, User } from "@nextui-org/react"
import { truncateAddress } from "@common"

export const MetamaskContent = () => {
    const { reducer } = useContext(RootContext)!
    const [state] = reducer
    const { wallets } = state
    const { metamask } = wallets
    const { address, starciBalance } = metamask

    return (
        <ModalBody className="p-4 gap-4">
            <div>
                <Snippet color="primary" className="w-fit" hideSymbol codeString={address}>{truncateAddress(address)}</Snippet>
                <div className="bg-content2 rounded-medium p-4">
                    <User avatarProps={{
                        src: "/starci-logo.svg"
                    }} name="STARCI Token" description={`${starciBalance} STARCI`} />
                </div>
            </div> 
        </ModalBody>
    )
}
