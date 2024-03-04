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
                startContent={<PenIcon size={20} strokeWidth={4/3} />}
            >
          Edit
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="p-6 pb-0 text-xl font-bold leading-none">Edit</ModalHeader>
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

{/* <Input
            label="Username"
            value={username}
            onValueChange={onValueChange}
            isInvalid={!isValid}
            errorMessage={errors.username}
            readOnly={!isEdited}
            endContent={
                <Link
                    color="primary"
                    onPress={onPress}
                    as="button"
                    className="text-sm"
                >
                    {isEdited ? <SaveIcon size={20} strokeWidth={4/3}/> : <PencilIcon size={20} strokeWidth={4/3}/>}
                </Link>
            }
        /> */}