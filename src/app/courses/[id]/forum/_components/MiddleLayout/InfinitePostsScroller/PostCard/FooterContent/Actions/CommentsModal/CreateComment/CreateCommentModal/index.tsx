import React, { useContext, useRef } from "react"
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import { ContentsEditorRef, ContentsEditorRefSelectors } from "../../../../../../../../../../../../_shared"
import { ContentType, isErrorResponse } from "@common"
import { createComment } from "@services"
import { PostCardPropsContext } from "../../../../../index"

export const CreateCommentModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const { post } = useContext(PostCardPropsContext)!

    const ref = useRef<ContentsEditorRefSelectors|null>(null)

    const onPress = async () => {
        if (ref.current === null) return
        const contents = ref.current.contents

        let countIndex = 0
        const files: Array<File> = []     
        const postCommentContents = contents.map((content) => {
            const { contentType, text, contentMedias } = content
            if (
                contentType === ContentType.Text ||
            contentType === ContentType.Code ||
            contentType === ContentType.Link
            ) {
                return {
                    text,
                    contentType,
                }
            } else {
                return {
                    contentType: contentType,
                    postCommentContentMedias: contentMedias?.map(
                        contentMedia => {
                            const media = {
                                mediaIndex: countIndex
                            }
                            files.push(contentMedia.data)
                            countIndex++
                            return media
                        }   
                    )
                }
            }
        })
        const response = await createComment({
            data: {
                postId: post.postId,
                postCommentContents
            },
            files
        })

        if (!isErrorResponse(response)) {
            alert("Successfully")
        } else {
            console.log(response)
        }
    }

    return (
        <>
            <Button
                fullWidth
                onPress={onOpen}
                className="!justify-normal bg-content2"
            >
        Create a comment...
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col p-6 pb-0">
            Create Comment
                    </ModalHeader>
                    <ModalBody className="p-6">
                        <ContentsEditorRef ref={ref}/>
                    </ModalBody>
                    <ModalFooter className="p-6 pt-0">
                        <div className="flex gap-4 items-center">
                            <Button variant="light" color="danger">
                Reset
                            </Button>
                            <Button onPress={onPress} color="primary">
                Create
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}