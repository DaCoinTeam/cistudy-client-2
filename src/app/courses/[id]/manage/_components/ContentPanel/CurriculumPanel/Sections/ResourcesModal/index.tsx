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
import React, { createContext, useCallback, useContext } from "react"
import { LectureEntity, isErrorResponse } from "@common"
import { ResourceItem } from "./ResourceItem"
import { ManageContext } from "../../../../../_hooks"
import { createResources } from "@services"
import { FileDropzone } from "../../../../../../../../_shared"

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

    const { functions } = useContext(ManageContext)!
    const { fetchAndSetCourseManaged } = functions

    const { lectureId } = useContext(ResourcesModalPropsContext)!

    const onDrop = useCallback(async (files: Array<File>) => {
        const response = await createResources({
            data: {
                lectureId,
            },
            files,
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetCourseManaged()
        } else {
            console.log(response)
        }
    }, [])

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
                            <FileDropzone onDrop={onDrop} />
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
