import React, { useContext, useEffect, useRef } from "react"
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
import { FormikProviders } from "./FormikProviders"
import { FormikContext } from "./FormikProviders"
import { Title } from "./Title"
import {
    ContentsEditorRef,
    ContentsEditorRefSelectors,
} from "../../../../../../../_shared"
import { CourseDetailsContext } from "../../../../../_hooks"
import { ContentType, isErrorResponse } from "@common"
import { createPost } from "@services"
import { CreatePostModalProviders } from "./CreatePostModalProviders"

export const WrappedCreatePostModal = () => {
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const formik = useContext(FormikContext)!

    const ref = useRef<ContentsEditorRefSelectors | null>(null)

    useEffect(() => {
        console.log("called")
    }, [ref.current?.contents])

    const onPress = async () => {
        if (course === null) return
        const { courseId } = course
        if (ref.current === null) return
        const contents = ref.current.contents

        let countIndex = 0
        const files: Array<File> = []
        const postContents = contents.map((content) => {
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
                    postContentMedias: contentMedias?.map((contentMedia) => {
                        const media = {
                            mediaIndex: countIndex,
                        }
                        files.push(contentMedia.data)
                        countIndex++
                        return media
                    }),
                }
            }
        })
        const response = await createPost({
            data: {
                courseId,
                title: formik.values.title,
                postContents,
            },
            files,
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
        Do you need some help?
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="flex flex-col p-6 pb-0">
            Create Post
                    </ModalHeader>
                    <ModalBody className="p-6">
                        <div>
                            <Title />
                            <Spacer y={6} />
                            <ContentsEditorRef ref={ref} />
                        </div>
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

export const CreatePostModal = () => {
    return (
        <FormikProviders>
            <CreatePostModalProviders>
                <WrappedCreatePostModal />
            </CreatePostModalProviders>
        </FormikProviders>
    )
}
