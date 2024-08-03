import React, {
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
} from "react"
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
    EditPostModalContext, EditPostModalProvider,
} from "./EditPostModalProvider"
import { AppendKey, Media, PostMediaEntity } from "@common"

import { getAssetFile } from "@services"
import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline"
import { PostDetailContext } from "../../../hooks"
import { MediaUploader, TextEditor } from "../../../../../_shared"
interface WrappedEditPostModalRefProps {
    onClose: () => void
}

export const WrappedEditPostModalRef = (refProps: WrappedEditPostModalRefProps ) => {
    const {onClose} = refProps
    const { formik } = useContext(EditPostModalContext)!

    const { swrs } = useContext(PostDetailContext)!
    const {postSwr} = swrs
    const { data } = postSwr
    const { html, postMedias, title } = {...data}
    
    const setHtml = useCallback(
        (html: string) => formik.setFieldValue("html", html),
        [formik.values.html]
    )

    const setPostMedias = useCallback(
        (postMedias: Array<AppendKey<Media>>) =>
            formik.setFieldValue("postMedias", postMedias),
        [formik.values.postMedias]
    )

    useEffect(() => {
        const handleEffect = async () => 
        {   
            const promises : Array<Promise<void>> = []
            const formatedPostMedias : Array<AppendKey<Media>> = []
            for (const {mediaId, postMediaId, mediaType} of postMedias as PostMediaEntity[]) {
                const promise = async () => {
                    const file = await getAssetFile(mediaId)
                    if (file === null) return 
                    formatedPostMedias.push({
                        key: postMediaId,
                        mediaType,
                        file
                    })
                }
                promises.push(promise())
            }
            await Promise.all(promises)
            setPostMedias(formatedPostMedias)
        }
        handleEffect()
    }, [])

    useEffect(() => {
        setHtml(html?? "")
    }, [])

    useEffect(() => {
        formik.setFieldValue("title", title)
    }, [])


    const onPress = () => formik.handleSubmit()

    return (
        <>
            <ModalHeader className="p-4 text-xl pb-2">
        Edit Post
            </ModalHeader>
            <ModalBody className="p-4 gap-4">
                <Input  
                    variant="bordered"
                    classNames={{
                        inputWrapper: "px-4 !border !border-divider bg-transparent shadow-none"
                    }} 
                    id="title"
                    size="lg"
                    labelPlacement="outside"
                    placeholder="Input title here"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!(formik.touched.title && formik.errors.title)}
                    errorMessage={formik.touched.title && formik.errors.title}
                />
                <TextEditor html={html} setHtml={setHtml} />
                <MediaUploader
                    medias={formik.values.postMedias}
                    setMedias={setPostMedias}
                />
            </ModalBody>
            <ModalFooter className="p-4 pt-2">
                <Button
                    startContent={<ArrowPathIcon height={20} width={20} />} 
                    onPress={onClose}
                >
            Reset
                </Button>
                <Button
                    onPress={onPress}
                    color="primary"
                    startContent={<CheckIcon height={20} width={20}/>}
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
                    <EditPostModalProvider onClose={onClose}>
                        <WrappedEditPostModalRef onClose={onClose} />
                    </EditPostModalProvider>
                </ModalContent>
            </Modal>
        )
    }
)
