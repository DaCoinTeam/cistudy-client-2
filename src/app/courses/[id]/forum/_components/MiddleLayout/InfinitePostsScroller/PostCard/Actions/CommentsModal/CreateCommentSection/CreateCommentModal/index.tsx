import React, { useCallback, useContext } from "react"
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
import {
    CreateCommentModalContext,
    CreateCommentModalProviders,
} from "./CreateCommentModalProviders"
import { AppendKey, Media } from "@common"
import {
    TextEditor,
    MediaUploader,
} from "../../../../../../../../../../../_shared"
import { PlusIcon, RotateCcw } from "lucide-react"

export const WrappedCreateCommentModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
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
            <Button
                fullWidth
                onPress={onOpen}
                className="!justify-normal bg-content2"
            >
        Create a comment...
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col p-4 font-bold text-xl  pb-2">
            Create Comment
                    </ModalHeader>
                    <ModalBody className="p-4">
                        <div>
                            <TextEditor html={formik.values.html} setHtml={setHtml} />
                            <Spacer y={4} />
                            <MediaUploader
                                medias={formik.values.postCommentMedias}
                                setMedias={setPostCommentMedias}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter className="p-4 pt-2">
                        <div className="flex gap-2 items-center">
                            <Button
                                variant="bordered"
                                className="border shadow-none"
                                startContent={<RotateCcw size={20} strokeWidth={3/2} />}
                            >
                Reset
                            </Button>
                            <Button
                                onPress={onPress}
                                color="primary"
                                className="text-secondary-foreground"
                                startContent={<PlusIcon size={20} strokeWidth={3/2} />}
                            >
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
        <CreateCommentModalProviders>
            <WrappedCreateCommentModal />
        </CreateCommentModalProviders>
    )
}
