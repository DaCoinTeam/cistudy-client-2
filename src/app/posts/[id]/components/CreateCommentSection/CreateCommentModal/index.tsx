import { AppendKey, Media } from "@common"
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline"
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    Spinner,
    useDisclosure,
} from "@nextui-org/react"
import { useCallback, useContext, useEffect } from "react"
import {
    CreateCommentModalContext,
    CreateCommentModalProvider,
} from "./CreateCommentModalProvider"
import { MediaUploader, TextEditor } from "../../../../../_shared"
import useSWRMutation from "swr/mutation"
import { isSastifyCommunityStandard, IsSastifyCommunityStandardInput } from "@services"
import { DELAY_TIME } from "@config"

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
            <ModalHeader className="p-4 pb-2">
        Create Comment
            </ModalHeader>
            <ModalBody className="p-4">
                <TextEditor setHtml={setHtml} />
                <MediaUploader medias={formik.values.postCommentMedias} setMedias={setPostCommentMedias}/>
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
                        isLoading={formik.isSubmitting}
                        isDisabled={formik.isSubmitting}
                        startContent={formik.isSubmitting ? <></> : <PlusIcon height={20} width={20} />}
                    >
                        {
                            formik.isSubmitting ? "Creating..." : "Create"
                        }
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
                variant="flat"
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
