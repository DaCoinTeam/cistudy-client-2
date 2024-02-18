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

export const WrappedCreatePostModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const formik = useContext(FormikContext)!

    const renderContents = () => (
        <div className="flex flex-col gap-4 overflow-auto max-h-[250px]">
            {formik.values.contents.map((content) => (
                <ContentItem
                    key={uuidv4()}
                    content={content}
                />
            ))}
        </div>
    )

    const onPress = () => formik.submitForm()

    return (
        <>
            <Button onPress={onOpen} className="!justify-normal w-full bg-content2">
        Do you need some help?
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col p-6 pb-0">
            Create Post
                    </ModalHeader>
                    <ModalBody className="p-6">
                        <div>
                            <Title />
                            <Spacer y={6}/>
                            {renderContents()}
                            <Spacer y={6}/>
                            <AddContent />
                        </div>
                    </ModalBody>
                    <ModalFooter className="p-6 pt-0">
                        <div className="flex gap-4 items-center">
                            <Button variant="light" color="danger"> Reset </Button>
                            <Button onPress={onPress} color="primary"> Create </Button>
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
