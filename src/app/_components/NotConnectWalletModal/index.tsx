import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import React, { useContext } from "react"
import { RootContext } from "../../_hooks"

export const NotConnectWalletModal = () => {
    const { disclosures } = useContext(RootContext)!
    const { notConnectWalletModalDisclosure } = disclosures
    const { isOpen, onOpenChange } = notConnectWalletModalDisclosure
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xs">
            <ModalContent>
                <ModalHeader className="p-4 pb-2 font-semibold text-lg">Oops...</ModalHeader>
                <ModalBody className="grid place-items-center p-4">
                    <Image alt="oops" src="/starci-teach.svg" height={200} width={200}/>
                    <div className="text-sm"> Please connect to a wallet first </div>
                </ModalBody>
                <ModalFooter className="p-4 pt-2"> 
                    <Button color="secondary" className="w-full">
                  Connect Wallet
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}