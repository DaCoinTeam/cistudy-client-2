"use client"
import React, {
    forwardRef,
    useContext,
    useImperativeHandle,
} from "react"
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import { useSDK } from "@metamask/sdk-react"
import { RootContext } from "../../../../_hooks"
import { MetamaskLogoIcon } from "./MetamaskLogoIcon"

export const WrappedWalletModalRef = () => {
    const { reducer } = useContext(RootContext)!
    const [ state, dispatch ] = reducer
    const { wallets } = state
    const { metamask } = wallets
    const { address } = metamask

    const { sdk, connected, connecting, provider, chainId } = useSDK()

    const onConnectWalletPress = async () => {
        try {
            const accounts = await sdk?.connect()
            if (accounts === null) return
            dispatch({
                type: "SET_METAMASK_ADDRESS",
                payload: accounts.at(0)
            }) 
        } catch (ex) {
            console.warn("failed to connect..", ex)
        }
    }

    return (
        <>
            <ModalHeader className="flex flex-col p-4 font-semibold text-lg pb-2">
        Wallet
            </ModalHeader>
            <ModalBody className="p-4 gap-4">
                
                {address}
            </ModalBody>
            <ModalFooter className="p-4 pt-2 inline">
                <Button fullWidth onPress={onConnectWalletPress} startContent={<MetamaskLogoIcon size={20}/>}> Connect Wallet </Button>
            </ModalFooter>
        </>
    )
}

export interface WalletModalRefSelectors {
  onOpen: () => void;
}

interface WalletModalRefProps {
    className?: string
}

export const WalletModalRef = forwardRef<WalletModalRefSelectors, WalletModalRefProps>(
    (props, ref) => {
        const { isOpen, onOpen, onOpenChange } = useDisclosure()
        const { className } = props

        useImperativeHandle(ref, () => ({
            onOpen,
        }))

        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm" className={`${className}`}>
                <ModalContent>
                    <WrappedWalletModalRef />
                </ModalContent>
            </Modal>
        )
    }
)
