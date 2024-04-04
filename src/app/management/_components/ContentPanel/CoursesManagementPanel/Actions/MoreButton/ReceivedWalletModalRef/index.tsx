import { Button, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import React, { forwardRef, useImperativeHandle } from "react"

export interface ReceivedWalletDropdownRefSelectors {
    onOpen: () => void
}

export const ReceivedWalletDropdownRef = forwardRef<ReceivedWalletDropdownRefSelectors>((_, ref) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen
    }))

    return (
        <Modal size="xs" isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="p-4 pb-0">Received Wallet</ModalHeader>
                <ModalBody className="p-4">
                    <Listbox 
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                    >
                        <ListboxItem key="text">Text</ListboxItem>
                        <ListboxItem key="number">Number</ListboxItem>
                        <ListboxItem key="date">Date</ListboxItem>
                        <ListboxItem key="single_date">Single Date</ListboxItem>
                        <ListboxItem key="iteration">Iteration</ListboxItem>
                    </Listbox>
                </ModalBody>
                <ModalFooter className="p-4 pt-0">
                    <Button> Add </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})