"use client"
import React, {
    forwardRef,
    useImperativeHandle,
} from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import { WalletModalRefProvider } from "./WalletModalRefProvider"
import { BodyContent } from "./BodyContent"

export const WrappedWalletModalRef = () => {
    return (
        <>
            <ModalHeader className="p-4 font-semibold pb-2">
        Wallet
            </ModalHeader>
            <BodyContent/>
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
                    <WalletModalRefProvider>
                        <WrappedWalletModalRef />
                    </WalletModalRefProvider>
                </ModalContent>
            </Modal>
        )
    }
)

// <div className="text-5xl font-semibold py-2 text-center">
// $2323
// </div>
// <div className="border border-divider rounded-medium p-4">
// <Account className="flex justify-start" name={"STARCI Token"} description={"0 STARCI"} avatarProps={{
// src: "/starci-logo.svg"
// }} />
// {/* <div className="flex items-center gap-2">
//  <Button startContent={<CoinsIcon size={20} strokeWidth={3/2} />}> Swap  </Button>
// <Button startContent={<SendIcon size={20} strokeWidth={3/2} />}> Transfer </Button>
// </div>   */}
// </div>
// <div className="border border-divider rounded-medium p-3">
// <Account className="flex justify-start" name={"STARCI2 Token"} description={"0 STARCI2"} avatarProps={{
// src: "/starci-logo.svg"
// }} />
// <Spacer y={4}/>
// <Divider />
// <Spacer y={4}/>
// <div className="flex items-center gap-2">
// {/* <Button startContent={<HandCoinsIcon size={20} strokeWidth={3/2} />}> Claim  </Button>
// <Button startContent={<CoinsIcon size={20} strokeWidth={3/2} />}> Swap  </Button>
// <Button startContent={<SendIcon size={20} strokeWidth={3/2} />}> Transfer </Button> */}
// </div>
// </div>