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
    useDisclosure,
} from "@nextui-org/react"
import {
    CreatePostModalContext,
    CreatePostModalProviders,
} from "./CreatePostModalProviders"
import { RotateCcw, PlusIcon } from "lucide-react"
import { AppendKey, Media } from "@common"
import { MediaUploader, TextEditor } from "../../../../../../../_shared"

interface CreatePostModalProps {
  className?: string;
}

export const WrappedCreatePostModal = (props: CreatePostModalProps) => {
    const { className } = props

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
            <Button
                fullWidth
                onPress={onOpen}
                size="lg"
                className={`${className} !justify-normal bg-content2`}
            >
        Do you need some help?
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="4xl"
                classNames={{
                    closeButton: "top-3 right-3",
                }}
            >
                <ModalContent>
                    <ModalHeader className="p-4 pb-2 text-xl font-bold ">
            Create Post
                    </ModalHeader>
                    <ModalBody className="p-4 gap-4">
                        <Input
                            label="Title"
                            id="title"
                            variant="bordered"
                            classNames={{
                                inputWrapper: "border shadow-none",
                            }}
                            labelPlacement="outside"
                            placeholder="Input title here"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!(formik.touched.title && formik.errors.title)}
                            errorMessage={formik.touched.title && formik.errors.title}
                        />
                        <TextEditor html={formik.values.html} setHtml={setHtml} />
                        <MediaUploader
                            medias={formik.values.postMedias}
                            setMedias={setPostMedias}
                        />
                    </ModalBody>
                    <ModalFooter className="p-4 pt-2">
                        <div className="flex gap-2 items-center">
                            <Button
                                variant="light"
                                startContent={<RotateCcw size={20} strokeWidth={3 / 2} />}
                            >
                Reset
                            </Button>
                            <Button
                                onPress={onPress}
                                color="primary"
                                className="text-secondary-foreground"
                                startContent={<PlusIcon size={20} strokeWidth={3 / 2} />}
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

export const CreatePostModal = (props: CreatePostModalProps) => {
    return (
        <CreatePostModalProviders>
            <WrappedCreatePostModal {...props} />
        </CreatePostModalProviders>
    )
}
