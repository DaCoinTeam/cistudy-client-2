import { VideoCameraIcon } from "@heroicons/react/24/solid"
import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import React from "react"

const fileTypes = ["MP4", "MKV"]

export const EditVideoModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button
                onPress={onOpen}
                startContent={<VideoCameraIcon className="w-6 h-6" />}
                color="primary"
            >
        Edit video
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="p-6 pb-4">Edit Video</ModalHeader>
                            <Divider />
                            <ModalBody>
                                <div>
          
                                </div>
                            </ModalBody>
                            <ModalFooter>
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
