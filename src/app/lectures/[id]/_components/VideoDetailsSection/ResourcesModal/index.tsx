"use client"
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { LectureDetailsContext } from "../../../_hooks"
import { ResourceItem } from "./ResourceItem"
import { FolderIcon } from "lucide-react"

interface ResourcesModalProps {
  className?: string;
}

export const ResourcesModal = (props: ResourcesModalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { className } = props

    const { swrs } = useContext(LectureDetailsContext)!
    const { lecturesSwr } = swrs
    const { data: lecture } = lecturesSwr
    const { resources } = { ...lecture }

    return (
        <>
            <Button
                className={`${className} bg-content2`}
                onPress={onOpen}
                startContent={<FolderIcon size={20} strokeWidth={3 / 2} />}
            >
        Resources
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2 text-xl font-bold leading-none">
            Resources
                    </ModalHeader>
                    <ModalBody className="p-4 gap-4">
                        {resources?.map((resource) => (
                            <ResourceItem key={resource.resourceId} resource={resource} />
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
