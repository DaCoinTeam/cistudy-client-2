import { CheckIcon } from "@heroicons/react/24/outline"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react"
import { PenIcon, RefreshCcw } from "lucide-react"
import React from "react"

export const EditProfileModal = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    
    return (
        <>
            <Button
                onPress={onOpen}
                color="primary"
                startContent={<PenIcon size={20} strokeWidth={3/2} />}
            >
          Edit
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-6 pb-0 text-2xl ">Edit</ModalHeader>
                    <ModalBody className="p-6">
                        
                    </ModalBody>
                    <ModalFooter className="p-6 gap-2 pt-0">
                        <Button startContent={<RefreshCcw size={20} strokeWidth={3/2} />} variant="light" onPress={onClose}>
                    Reset
                        </Button>
                        <Button startContent={<CheckIcon height={20} width={20} />} color="primary" onPress={onClose}>
                    Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}