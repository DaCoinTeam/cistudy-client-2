"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
} from "@nextui-org/react"
import { Title } from "./Title"
import { VideoWrapper } from "./VideoWrapper"
import { forwardRef, useImperativeHandle } from "react"
import { ListCollapseIcon } from "lucide-react"

export interface EditModalRefSelectors {
  onOpen: () => void;
}

export const EditModalRef = forwardRef<EditModalRefSelectors | null>(
    (_, ref) => {
        const { isOpen, onOpen, onOpenChange } = useDisclosure()

        useImperativeHandle(ref, () => ({
            onOpen,
        }))

        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-6 pb-0 text-xl">Edit</ModalHeader>
                    <ModalBody className="p-6 pb-0">
                        <VideoWrapper />
                    </ModalBody>
                    <ModalBody className="p-6 gap-4">
                        <div className="items-center flex gap-2"> 
                            <ListCollapseIcon size={20} strokeWidth={4/3} />
                            <div className="text-lg font-semibold"> Details </div>
                        </div>
                        <Title />
                    </ModalBody>
                </ModalContent>
            </Modal>
        )
    }
)
