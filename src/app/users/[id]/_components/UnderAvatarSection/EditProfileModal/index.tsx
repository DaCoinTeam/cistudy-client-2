import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { PenIcon } from "lucide-react"
import React from "react"
import { Username } from "./Username"

export const EditProfileModal = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    
    return (
        <>
            <Button
                className="bg-content2"
                onPress={onOpen}
                startContent={<PenIcon size={20} strokeWidth={4/3} />}
            >
          Edit
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="p-6 pb-2 text-xl font-semibold leading-none">Edit</ModalHeader>
                            <ModalBody className="p-6">
                                <Username />
                            </ModalBody>
                            <ModalFooter className="p-6 gap-4 pt-2">
                                <Button color="danger" variant="light" onPress={onClose}>
                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}