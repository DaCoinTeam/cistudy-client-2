import { FolderIcon, FolderOpenIcon } from "@heroicons/react/24/outline"
import { VideoCameraIcon } from "@heroicons/react/24/solid"
import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import NextVideo from "next-video"
import React, { useCallback, useContext, useState } from "react"
import { useDropzone } from "react-dropzone"
import { updateCourse } from "@services"
import { isErrorResponse } from "@common"
import { CourseDetailsContext } from "../../../../../_hooks"

export const EditVideoModal = () => {
    const { state, functions } = useContext(CourseDetailsContext)!
    const { course } = state
    const { fetchAndSetCourse } = functions

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [previewVideoFile, setPreviewVideoFile] = useState<File | null>(null)

    const onDrop = useCallback((files: Array<File>) => {
        const file = files.at(0)
        if (!file) return
        setPreviewVideoFile(file)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
    })

    const renderDragArea = () => (
        <div
            {...getRootProps({
                className: "h-[200px] w-full grid place-items-center",
            })}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <div className="grid place-items-center cursor-pointer">
                    <FolderOpenIcon className="w-28 h-28" />
                    <div className="text-sm">Drop the file here ...</div>
                </div>
            ) : (
                <div className="grid place-items-center cursor-pointer">
                    <FolderIcon className="w-28 h-28" />
                    <div className="text-sm">
            Drag video here, or click to select video
                    </div>
                </div>
            )}
        </div>
    )

    const renderPlayer = () => (
        <NextVideo
            className="rounded-[12px] overflow-hidden"
            src={URL.createObjectURL(previewVideoFile as File)}
        />
    )

    const onClick = async () => {
        if (previewVideoFile === null) return
        const courseId = course?.courseId
        if (courseId === null) return
        const response = await updateCourse({
            data: {
                courseId,
                previewVideoIndex: 0,
            },
            files: [previewVideoFile],
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourse()
        } else {
            console.log(response)
        }
    }

    const onOpenReset = () => {
        setPreviewVideoFile(null)
        onOpen()
    }

    const onClickReverse = () => setPreviewVideoFile(null)
    return (
        <>
            <Button
                onPress={onOpenReset}
                startContent={<VideoCameraIcon className="w-6 h-6" />}
                color="primary"
            >
        Edit video
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-6 pb-4">Edit Video</ModalHeader>
                    <Divider />
                    <ModalBody className="p-6">
                        <div>{previewVideoFile ? renderPlayer() : renderDragArea()}</div>
                    </ModalBody>
                    <ModalFooter className="p-6 pt-0">
                        <div className="flex gap-4">
                            <Button color="primary" onClick={onClick}>
                Save
                            </Button>
                            <Button isDisabled={!previewVideoFile} onClick={onClickReverse}>
                Revert
                            </Button>
                        </div>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
