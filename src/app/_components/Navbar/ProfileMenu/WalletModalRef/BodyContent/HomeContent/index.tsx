"use client"
import React, { useContext } from "react"
import { RootContext } from "../../../../../../_hooks"
import { ModalBody, Snippet } from "@nextui-org/react"
import { truncateAddress } from "@common"

export const HomeContent = () => {
    const { reducer } = useContext(RootContext)!
    const [state] = reducer
    const { wallets } = state
    const { metamask } = wallets
    const { address } = metamask

    return (
        <ModalBody className="p-4 gap-4">
            <Snippet color="primary" hideSymbol codeString={address}>{truncateAddress(address)}</Snippet>
        </ModalBody>
    )
}
