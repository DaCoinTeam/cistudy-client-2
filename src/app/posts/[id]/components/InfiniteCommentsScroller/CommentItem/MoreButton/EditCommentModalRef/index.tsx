import React, {
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
} from "react"
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
    EditCommentModalContext,
    EditCommentModalProvider,
} from "./EditCommentModalProvider"
import { AppendKey, Media } from "@common"
import { CommentItemContext } from "../.."
import { getAssetFile } from "@services"
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline"
import { MediaUploader, TextEditor } from "../../../../../../../_shared"

export const WrappedEditCommentModalRef = () => {
    const { formik } = useContext(EditCommentModalContext)!

    const { props } = useContext(CommentItemContext)!
    const { postComment } = props
    const { html, postCommentMedias } = postComment
    
    const setHtml = useCallback(
        (html: string) => formik.setFieldValue("html", html),
        [formik.values.html]
    )

    const setPostCommentMedias = useCallback(
        (postMedias: Array<AppendKey<Media>>) =>
            formik.setFieldValue("postCommentMedias", postMedias),
        [formik.values.postCommentMedias]
    )

    useEffect(() => {
        const handleEffect = async () => 
        {   
            const promises : Array<Promise<void>> = []
            const formatedPostCommentMedias : Array<AppendKey<Media>> = []
            for (const {mediaId, postCommentMediaId, mediaType} of postCommentMedias) {
                const promise = async () => {
                    const file = await getAssetFile(mediaId)
                    if (file === null) return 
                    formatedPostCommentMedias.push({
                        key: postCommentMediaId,
                        mediaType,
                        file
                    })
                }
                promises.push(promise())
            }
            await Promise.all(promises)
            setPostCommentMedias(formatedPostCommentMedias)
        }
        handleEffect()
    }, [])

    useEffect(() => {
        setHtml(html)
    }, [])

    const onPress = () => formik.handleSubmit()

    return (
        <>
            <ModalHeader className="p-4 pb-2 text-xl">
        Edit Comment
            </ModalHeader>
            <ModalBody className="p-4 gap-4">
                <TextEditor html={html} setHtml={setHtml} />
                <MediaUploader
                    medias={formik.values.postCommentMedias}
                    setMedias={setPostCommentMedias}
                />
            </ModalBody>
            <ModalFooter className="p-4 pt-2">
                <Button
                    startContent={<ArrowPathIcon height={20} width={20} />} 
                >
            Reset
                </Button>
                <Button
                    onPress={onPress}
                    color="primary"
                    startContent={<CheckIcon width={20} height={20} />}
                >
            Save
                </Button>
            </ModalFooter>
        </>
    )
}

export interface EditCommentModalRefSelectors {
  onOpen: () => void;
}

interface EditCommentModalRefProps {
    className?: string
}

export const EditCommentModalRef = forwardRef<EditCommentModalRefSelectors, EditCommentModalRefProps>(
    (props, ref) => {
        const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
        const { className } = props

        useImperativeHandle(ref, () => ({
            onOpen,
        }))

        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className={`${className}`}>
                <ModalContent>
                    <EditCommentModalProvider onClose={onClose}>
                        <WrappedEditCommentModalRef />
                    </EditCommentModalProvider>
                </ModalContent>
            </Modal>
        )
    }
)
