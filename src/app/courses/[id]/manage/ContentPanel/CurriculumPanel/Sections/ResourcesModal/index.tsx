"use client"
import { FolderIcon } from "@heroicons/react/24/outline"
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
import { ResourceItem } from "./ResourceItem"
import { ResourceDropzone } from "./ResourceDropzone"

interface ResourcesModalProps {
  lecture: LectureEntity;
}

interface ResourcesModalPropsContextValue {
  lectureId: string;
}

export const ResourcesModalPropsContext =
  createContext<ResourcesModalPropsContextValue | null>(null)

export const ResourcesModal = (props: ResourcesModalProps) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const renderResourceItems = () => (
        <div className="flex flex-col gap-3">
            {props.lecture.resources ? (
                props.lecture.resources.map((resource) => (
                    <ResourceItem key={resource.resourceId} resource={resource} />
                ))
            ) : (
                <div />
            )}
        </div>
    )

    return (
        <ResourcesModalPropsContext.Provider
            value={{
                lectureId: props.lecture.lectureId,
            }}
        >
            <Link onPress={onOpen} as="button">
                <FolderIcon className="w-6 h-6" />
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-6 pb-0">Resources</ModalHeader>
                    <ModalBody className="p-6">
                        <div>
                            <ResourceDropzone />
                            <Spacer y={6} />
                            <div>
                                <div className="ml-3 font-semibold"> Uploaded </div>
                                <Spacer y={3} />
                                {renderResourceItems()}
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ResourcesModalPropsContext.Provider>
    )
}
