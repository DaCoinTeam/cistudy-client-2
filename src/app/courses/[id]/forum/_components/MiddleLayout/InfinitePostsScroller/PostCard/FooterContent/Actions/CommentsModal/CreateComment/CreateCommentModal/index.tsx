import React, { useRef } from "react"
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
import { ContentsEditorRef, ContentsEditorRefSelectors } from "../../../../../../../../../../../../_shared"

const WrappedCreateCommentModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const ref = useRef<ContentsEditorRefSelectors|null>(null)

    const onPress = () => {
        console.log(ref.current)
        //formik.submitForm()
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col p-6 pb-0">
            Create Post
                    </ModalHeader>
                    <ModalBody className="p-6">
                        <ContentsEditorRef ref={ref}/>
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
