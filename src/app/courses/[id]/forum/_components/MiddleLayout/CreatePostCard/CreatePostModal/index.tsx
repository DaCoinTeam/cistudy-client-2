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
import { Title } from "./EditSection/Title"
import { EditSection } from "./EditSection"
import { PreviewSection } from "./PreviewSection"

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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <ModalContent>
                    <ModalBody className="p-6">
                        <div className="flex gap-4 items-center">
                            <EditSection />
                            <PreviewSection/>
                        </div>
                    </ModalBody>
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
