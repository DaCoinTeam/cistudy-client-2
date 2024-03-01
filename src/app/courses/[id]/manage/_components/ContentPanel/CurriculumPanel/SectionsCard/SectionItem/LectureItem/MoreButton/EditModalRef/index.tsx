"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Input
} from "@nextui-org/react"
import { forwardRef, useImperativeHandle } from "react"

export interface EditModalRefSelectors {
  onOpen: () => void;
}

export const EditModalRef = forwardRef<EditModalRefSelectors | null>(
    (_, ref) => {
        const { isOpen, onOpen, onOpenChange } = useDisclosure()

        useImperativeHandle(ref, () => ({
            onOpen,
        }))

        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-4 pb-2 text-xl">Edit</ModalHeader>
                    <ModalBody className="p-4">
                        <Input variant="bordered" classNames={{
                            inputWrapper: "border shadow-none"
                        }} labelPlacement="outside" label="Title" placeholder="Input title here"/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }
)
