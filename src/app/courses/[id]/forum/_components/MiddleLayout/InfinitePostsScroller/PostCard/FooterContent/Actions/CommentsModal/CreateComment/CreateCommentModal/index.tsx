import React, { useContext } from "react"
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    useDisclosure,
} from "@nextui-org/react"
import { FormikProviders } from "./FormikProviders"
import { AddContent } from "./AddContent"
import { FormikContext } from "./FormikProviders"
import { ContentItem } from "./ContentItem"
import { v4 as uuidv4 } from "uuid"
import { Title } from "./Title"
import { ContentsEditor } from "../../../../../../../../../../../../_shared"

const WrappedCreateCommentModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const formik = useContext(FormikContext)!

    const onPress = () => formik.submitForm()

    return (
        <>
            <Button
                fullWidth
                onPress={onOpen}
                className="!justify-normal bg-content2"
            >
        Do you need some help?
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col p-6 pb-0">
            Create Post
                    </ModalHeader>
                    <ModalBody className="p-6">
                        <ContentsEditor />
                    </ModalBody>
                    <ModalFooter className="p-6 pt-0">
                        <div className="flex gap-4 items-center">
                            <Button variant="light" color="danger">
                                {" "}
                Reset{" "}
                            </Button>
                            <Button onPress={onPress} color="primary">
                                {" "}
                Create{" "}
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
