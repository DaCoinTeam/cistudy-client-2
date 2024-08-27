"use client"
import React, { useCallback, useContext, useEffect } from "react"
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    Spinner,
    useDisclosure,
} from "@nextui-org/react"
import {
    CreatePostModalContext,
    CreatePostModalProvider,
} from "./CreatePostModalProvider"
import { PlusIcon } from "lucide-react"
import { AppendKey, Media } from "@common"
import { MediaUploader, TextEditor } from "../../../../../../../../_shared"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import useSWRMutation from "swr/mutation"
import {
    IsSastifyCommunityStandardInput,
    isSastifyCommunityStandard,
} from "@services"
import { DELAY_TIME } from "@config"

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

    const { trigger, data, isMutating } = useSWRMutation(
        "IS_SATISFY_COMMUNITY_STANDARD",
        async (
            _,
            {
                arg,
            }: {
        arg: IsSastifyCommunityStandardInput;
      }
        ) => {
            return await isSastifyCommunityStandard(arg)
        }
    )

    useEffect(() => {
        if (!formik.values.html) return
        const abortController = new AbortController()
        const handleEffect = async () => {
            await trigger({
                message: formik.values.html,
                signal: abortController.signal,
            })
        }
        const delayedHandleEffect = setTimeout(handleEffect, DELAY_TIME)
        return () => {
            abortController.abort()
            clearTimeout(delayedHandleEffect)
        }
    }, [formik.values.html])

    return (
        <>
            <ModalHeader className="p-4 pb-2 text-xl">Create Post</ModalHeader>
            <ModalBody className="p-4 gap-0">
                <Input
                    id="title"
                    size="lg"
                    classNames={{
                        inputWrapper:
              "px-4 !border !border-divider bg-transparent shadow-none",
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
                <Spacer y={4} />
                <div className="text-sm">AI Community Standard Scan</div>
                {data || isMutating ? <Spacer y={1.5} /> : null}
                {isMutating ? (
                    <div className="flex gap-2 items-center">
                        <Spinner size="sm" /> <div className="text-sm">Checking...</div>
                    </div>
                ) : ( 
                    data ? <div
                        className={`px-3 py-2 rounded-medium text-sm ${
                            data.result === false ? "bg-success/20 text-success" : "text-danger bg-danger/20"
                        }`}
                    >
                        {data.result === false 
                            ? "Congratulations! Your content is valid."
                            : data.reason}
                    </div> : null
                )}
            </ModalBody>
            <ModalFooter className="p-4 pt-2 items-center">
                <Button
                    variant="light"
                    startContent={<ArrowPathIcon height={20} width={20} />}
                >
          Reset
                </Button>
                <Button
                    isDisabled={!(data?.result === false) || formik.isSubmitting || isMutating}
                    isLoading={formik.isSubmitting}
                    onPress={onPress}
                    startContent={formik.isSubmitting? <></> : <PlusIcon height={20} width={20} />}
                    color="primary"
                >
                    {
                        formik.isSubmitting ? "Creating..." : "Create"
                    }
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
