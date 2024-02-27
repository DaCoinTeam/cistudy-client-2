"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Spacer,
    useDisclosure,
} from "@nextui-org/react"
import { Title } from "./Title"
import { VideoWrapper } from "./VideoWrapper"
import { forwardRef, useImperativeHandle } from "react"

export interface EditModalRefSelectors {
    onOpen: () => void
}

export const EditModalRef = forwardRef<EditModalRefSelectors | null>((_, ref) => {
    const { isOpen, onOpen,  onOpenChange } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen
    }))

    return (
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
    )
})