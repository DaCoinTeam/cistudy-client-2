import React, { useCallback, useContext } from "react"
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import {
    CreateCommentModalContext,
    CreateCommentModalProvider,
} from "./CreateCommentModalProvider"
import { AppendKey, Media } from "@common"
import {
    TextEditor,
    MediaUploader,
} from "../../../../../../../../../../../../_shared"
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline"

export const WrappedCreateCommentModal = () => {
    const { formik } = useContext(CreateCommentModalContext)!

    const setHtml = useCallback(
        (html: string) => formik.setFieldValue("html", html),
        [formik.values.html]
    )

    const setPostCommentMedias = useCallback(
        (postMedias: Array<AppendKey<Media>>) =>
            formik.setFieldValue("postCommentMedias", postMedias),
        [formik.values.postCommentMedias]
    )

    const onPress = () => formik.handleSubmit()

    return (
        <>
            <ModalHeader className="p-4 pb-2">
        Create Comment
            </ModalHeader>
            <ModalBody className="p-4">
                <TextEditor setHtml={setHtml} />
                <MediaUploader medias={formik.values.postCommentMedias} setMedias={setPostCommentMedias}/>
            </ModalBody>
            <ModalFooter className="p-4 pt-2">
                <div className="flex gap-2 items-center">
                    <Button
                        startContent={<ArrowPathIcon height={20} width={20} />} 
                    >
            Reset
                    </Button>
                    <Button
                        onPress={onPress}
                        color="primary"

                        startContent={<PlusIcon height={20} width={20} />}
                    >
            Create
                    </Button>
                </div>
            </ModalFooter>
        </>
    )
}

export const CreateCommentModal = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

    return (
        <CreateCommentModalProvider onClose={onClose}>
            <Button
                fullWidth
                onPress={onOpen}
                className="!justify-normal px-3 text-foreground-400"
            >
        Create a comment...
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <WrappedCreateCommentModal />
                </ModalContent>
            </Modal>
        </CreateCommentModalProvider>
    )
}
