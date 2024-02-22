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
import { FormikContext } from "./FormikProviders"
import { Title } from "./Title"
import { CreatePostModalProviders } from "./CreatePostModalProviders"
import { ContentsEditor } from "./ContentsEditor"

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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col p-6 pb-0">
            Create Post
                    </ModalHeader>
                    <ModalBody className="p-6">
                        <div>
                            <Title />
                            <Spacer y={6} />
                            <ContentsEditor />
                        </div>
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
            <CreatePostModalProviders>
                <WrappedCreatePostModal />
            </CreatePostModalProviders>
        </FormikProviders>
    )
}
