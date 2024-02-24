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
import { FormikContext, FormikProviders } from "./FormikProviders"
import { EditSection } from "./EditSection"


export const WrappedCreateCommentModal = () => {
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
        Create a comment...
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col p-6 pb-0">
            Create Comment
                    </ModalHeader>
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

export const CreateCommentModal = () => {
    return (
        <FormikProviders>
            <WrappedCreateCommentModal />
        </FormikProviders>
    )
}
