"use client"
import {
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Link,
    Spacer,
} from "@nextui-org/react"
import React from "react"
import { FilmIcon } from "@heroicons/react/24/outline"
import { Title } from "./Title"
import { VideoWrapper } from "./VideoWrapper"

export const LectureVideoModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Link onPress={onOpen} as="button">
                <FilmIcon className="w-6 h-6" />
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-6 pb-0">Lecture Video</ModalHeader>
                    <ModalBody className="p-6">
                        <div>
                            <div>
                                <VideoWrapper />
                                <Spacer y={4} />
                                <Title />
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
