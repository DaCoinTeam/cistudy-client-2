import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { PenIcon } from "lucide-react"
import React from "react"

export const EditProfileModal = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    
    return (
        <>
            <Button
                className="text-secondary-foreground"
                onPress={onOpen}
                color="primary"
                startContent={<PenIcon size={20} strokeWidth={3/2} />}
            >
          Edit
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="p-6 pb-0 text-2xl ">Edit</ModalHeader>
                            <ModalBody className="p-6">
                            </ModalBody>
                            <ModalFooter className="p-6 gap-4 pt-0">
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