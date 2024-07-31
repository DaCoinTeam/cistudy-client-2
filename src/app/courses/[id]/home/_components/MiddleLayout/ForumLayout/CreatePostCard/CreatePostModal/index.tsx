"use client"
import React, { useCallback, useContext } from "react"
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    useDisclosure,
} from "@nextui-org/react"
import {
    CreatePostModalContext,
    CreatePostModalProvider,
} from "./CreatePostModalProvider"
import { PlusIcon } from "lucide-react"
import { AppendKey, Media } from "@common"
import {
    MediaUploader,
    TextEditor,
} from "../../../../../../../../_shared"
import { ArrowPathIcon } from "@heroicons/react/24/outline"

interface CreatePostModalProps {
  className?: string;
}

export const WrappedCreatePostModal = () => {
    const { formik } = useContext(CreatePostModalContext)!
    const onPress = () => formik.handleSubmit()

    const setHtml = useCallback(
        (html: string) => formik.setFieldValue("html", html),
        [formik.values.html]
    )

    const setPostMedias = useCallback(
        (postMedias: Array<AppendKey<Media>>) =>
            formik.setFieldValue("postMedias", postMedias),
        [formik.values.postMedias]
    )

    return (
        <>
            <ModalHeader className="p-4 pb-2 text-xl">
        Create Post
            </ModalHeader>
            <ModalBody className="p-4 gap-0">
                <Input  
                    id="title"
                    size="lg"
                    classNames={{
                        inputWrapper: "px-4 !border !border-divider bg-transparent shadow-none"
                    }} 
                    labelPlacement="outside"
                    placeholder="Input title here"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.title && formik.errors.title)}
                    errorMessage={formik.touched.title && formik.errors.title}
                />
                <Spacer y={4} />
                <TextEditor setHtml={setHtml} />
                <Spacer y={4} />
                <MediaUploader
                    medias={formik.values.postMedias}
                    setMedias={setPostMedias}
                />
            </ModalBody>
            <ModalFooter className="p-4 pt-2 items-center">
                <Button variant="light" startContent={<ArrowPathIcon height={20} width={20} />}>Reset</Button>
                <Button
                    onPress={onPress}
                    startContent={
                        <PlusIcon height={20} width={20}/>
                    }
                    color="primary"
                >
            Create
                </Button>
            </ModalFooter>
        </>
    )
}

export const CreatePostModal = (props: CreatePostModalProps) => {
    const { className } = props
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

    return (
        <>
            <Button
                fullWidth
                variant="flat"
                onPress={onOpen}
                className={`${className} !justify-normal px-3 text-foreground-400`}
            >
        Create a post
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="2xl"
                classNames={{
                    closeButton: "top-3 right-3",
                }}
            >
                <ModalContent>
                    <CreatePostModalProvider onClose={onClose}>
                        <WrappedCreatePostModal />
                    </CreatePostModalProvider>
                </ModalContent>
            </Modal>
        </>
    )
}
