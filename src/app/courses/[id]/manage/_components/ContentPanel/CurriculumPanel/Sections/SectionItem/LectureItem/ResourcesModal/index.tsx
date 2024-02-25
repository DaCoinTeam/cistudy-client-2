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
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react"
import { isErrorResponse } from "@common"
import { ResourceItem } from "./ResourceItem"
import { createResources, findManyResources } from "@services"
import Dropzone from "react-dropzone"
import {
    ResourcesModalAction,
    ResourcesModalState,
    useResourcesModalReducer,
} from "./useResourcesModalReducer"
import { LectureItemContext } from "../index"

interface ResourceModalContextValue {
  state: ResourcesModalState;
  dispatch: React.Dispatch<ResourcesModalAction>;
  functions: {
    fetchAndSetResources: () => Promise<void>;
  };
}

export const ResourceModalContext =
  createContext<ResourceModalContextValue | null>(null)

export const ResourcesModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { lectureId } = lecture

    const onDrop = useCallback(async (files: Array<File>) => {
        const response = await createResources({
            data: {
                lectureId,
            },
            files,
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetResources()
        } else {
            console.log(response)
        }
    }, [])

    const [state, dispatch] = useResourcesModalReducer()
    const { resources } = state

    const renderResourceItems = () => (
        <div className="flex flex-col gap-3">
            {resources.map((resource) => (
                <ResourceItem key={resource.resourceId} resource={resource} />
            ))}
        </div>
    )

    const fetchAndSetResources = useCallback(async () => {
        const response = await findManyResources(
            {
                lectureId,
            },
            {
                resourceId: true,
                name: true,
                fileId: true,
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_RESOURCES",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [props, state, dispatch])

    useEffect(() => {
        if (!isOpen) return 
        const handleEffect = async () => {
            await fetchAndSetResources()
        }
        handleEffect()
    }, [isOpen])

    const resourceModalContextValue: ResourceModalContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetResources,
            },
        }),
        [props, state]
    )

    return (
        <ResourceModalContext.Provider value={resourceModalContextValue}>
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
        </ResourceModalContext.Provider>
    )
}
