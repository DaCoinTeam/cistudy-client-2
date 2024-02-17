import React from "react"
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import { FormikProviders } from "./FormikProviders"
import { AddContent } from "./AddContent"

export const WrappedCreatePostModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    return (
        <>
            <Button onPress={onOpen} className="!justify-normal w-full bg-content2"> Do you need some help? </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1"> Create Post </ModalHeader>
                    <ModalBody>
                        <div>
                            <AddContent/>
                        </div>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export const CreatePostModal = () => {
    return (
        <FormikProviders>
            <WrappedCreatePostModal/>
        </FormikProviders>
    )
}
