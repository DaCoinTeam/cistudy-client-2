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
    Spacer,
    useDisclosure,
} from "@nextui-org/react"
import {
    EditCommentModalContext,
    EditCommentModalProviders,
} from "./EditCommentModalProviders"
import { AppendKey, Media } from "@common"
import {
    TextEditor,
    MediaUploader,
} from "../../../../../../../../../../../../../_shared"
import { RotateCcw, SaveIcon } from "lucide-react"
import { CommentItemContext } from "../.."
import { getAssetFile } from "../../../../../../../../../../../../../../services/server"

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
            <ModalHeader className="flex flex-col p-4 font-bold text-xl pb-2">
        Update Comment
            </ModalHeader>
            <ModalBody className="p-4">
                <div>
                    <TextEditor html={html} setHtml={setHtml} />
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
                        variant="light"
                        startContent={<RotateCcw size={20} strokeWidth={3 / 2} />}
                    >
            Reset
                    </Button>
                    <Button
                        onPress={onPress}
                        color="primary"
                        className="text-secondary-foreground"
                        startContent={<SaveIcon size={20} strokeWidth={3 / 2} />}
                    >
            Save
                    </Button>
                </div>
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" className={`${className}`}>
                <ModalContent>
                    <EditCommentModalProviders onClose={onClose}>
                        <WrappedEditCommentModalRef />
                    </EditCommentModalProviders>
                </ModalContent>
            </Modal>
        )
    }
)
