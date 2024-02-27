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
                startContent={<PenIcon className="21" strokeWidth={4/3} />}
            >
          Edit
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="px-4 py-3 text-xl font-semibold">Edit</ModalHeader>
                            <ModalBody className="p-4 pt-0">
                                <Username />
                            </ModalBody>
                            <ModalFooter className="p-4 pt-0">
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