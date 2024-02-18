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
import { AddContent } from "./AddContent"
import { FormikContext } from "./FormikProviders"
import { ContentItem } from "./ContentItem"
import { v4 as uuidv4 } from "uuid"

export const WrappedCreatePostModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const formik = useContext(FormikContext)!

    const renderContents = () => (
        <div className="flex flex-col gap-1">
            {formik.values.contents.map((content) => (
                <ContentItem
                    key={uuidv4()}
                    content={content}
                />
            ))}
        </div>
    )

    return (
        <>
            <Button onPress={onOpen} className="!justify-normal w-full bg-content2">
                {" "}
        Do you need some help?{" "}
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 p-6 pb-0">
            Create Post
                    </ModalHeader>
                    <ModalBody className="p-6">
                        {renderContents()}
                    </ModalBody>
                    <ModalFooter className="p-6 pt-0">
                        <AddContent />
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
