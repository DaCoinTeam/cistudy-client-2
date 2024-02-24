import React, { useContext } from "react"
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
import { FormikContext } from "./FormikProviders"
import { EditSection } from "./EditSection"

export const WrappedCreatePostModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const formik = useContext(FormikContext)!

    const onPress = async () => {
        formik.handleSubmit()
    }

    return (
        <>
            <Button
                fullWidth
                onPress={onOpen}
                className="!justify-normal bg-content2"
            >
        Do you need some help?
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="4xl"
                classNames={{
                    closeButton: "top-3 right-3",
                }}
            >
                <ModalContent>
                    <ModalHeader className="p-6 pb-0"> Create Post</ModalHeader>
                    <ModalBody className="p-6">
                        <EditSection />
                    </ModalBody>
                    <ModalFooter className="p-6 pt-0">
                        <div className="flex gap-4 items-center">
                            <Button variant="light" color="danger">
                Reset
                            </Button>
                            <Button onPress={onPress} color="primary">
                Create
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export const CreatePostModal = () => {
    return (
        <FormikProviders>
            <WrappedCreatePostModal />
        </FormikProviders>
    )
}
