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
import React, { createContext } from "react"
import { LectureEntity } from "@common"
import { FilmIcon } from "@heroicons/react/24/outline"
import { Title } from "./Title"
import { VideoWrapper } from "./VideoWrapper"

interface LectureVideoModalProps {
  lecture: LectureEntity;
}

interface LectureVideoModalPropsContextValue {
  lecture: LectureEntity;
}

export const LectureVideoModalPropsContext =
  createContext<LectureVideoModalPropsContextValue | null>(null)

export const LectureVideoModal = (props: LectureVideoModalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <LectureVideoModalPropsContext.Provider value={{ lecture: props.lecture }}>
            <Link onPress={onOpen} as="button">
                <FilmIcon className="w-6 h-6" />
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-6 pb-0">Lecture video</ModalHeader>
                    <ModalBody className="p-6">
                        <div>
                            <div>
                                <VideoWrapper/>
                                <Spacer y={6}/>
                                <Title />
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </LectureVideoModalPropsContext.Provider>
    )
}
