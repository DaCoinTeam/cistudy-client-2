"use client"
import { FolderIcon } from "@heroicons/react/24/outline"
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid"
import {
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Link,
    Spacer,
} from "@nextui-org/react"
import React, { createContext, useCallback, useContext, useMemo } from "react"
import { LectureEntity, isErrorResponse } from "@common"
import { ResourceItem } from "./ResourceItem"
import { createResources } from "@services"
import Dropzone from "react-dropzone"

interface ResourcesModalProps {
  lecture: LectureEntity;
}

interface ResourcesModalContextValue {
    props: ResourcesModalProps
}

export const ResourcesModalContext =
  createContext<ResourcesModalContextValue | null>(null)

export const ResourcesModal = (props: ResourcesModalProps) => {
    const { lecture } = props
    const { lectureId } = lecture

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const { functions } = useContext(ManageContext)!
    const { fetchAndSetCourseManaged } = functions

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

    const resourcesModalContextValue : ResourcesModalContextValue = useMemo(() => ({
        props
    }), [props])

    return (
        <ResourcesModalContext.Provider
            value={resourcesModalContextValue}
        >
            <Link onPress={onOpen} as="button">
                <FolderIcon className="w-6 h-6" />
            </Link>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    <ModalHeader className="p-6 pb-0">Resources</ModalHeader>
                    <ModalBody className="p-6">
                        <div>
                            <Dropzone onDrop={onDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />   
                                            <div className="cursor-pointer border-dashed rounded-large border-4 h-48 grid place-content-center">
                                                <div className="grid place-content-center">
                                                    <DocumentArrowUpIcon className="w-20 h-20 text-foreground-500" />
                                                    <div className="text-sm text-foreground-500">
                      Upload file(s)
                                                    </div>
                                                </div>
                                            </div>                    
                                        </div>
                                    </section>
                                )} 
                            </Dropzone>
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
        </ResourcesModalContext.Provider>
    )
}