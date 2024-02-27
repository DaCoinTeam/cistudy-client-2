"use client"
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid"
import {
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Spacer,
    Button,
    Divider,
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
import { LectureItemContext } from ".."
import { FolderIcon } from "lucide-react"

interface ResourceModalContextValue {
  state: ResourcesModalState;
  dispatch: React.Dispatch<ResourcesModalAction>;
  functions: {
    fetchAndSetResources: () => Promise<void>;
  };
}

export const ResourceModalContext =
  createContext<ResourceModalContextValue | null>(null)

export const WrappedResourcesModal = () => {
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { lectureId } = lecture

    const [state, dispatch] = useResourcesModalReducer()
    const { resources } = state

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
        const handleEffect = async () => {
            await fetchAndSetResources()
        }
        handleEffect()
    }, [])

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

    const renderResources = () => (
        <div className="flex flex-col gap-3">
            {resources.map((resource) => (
                <ResourceItem key={resource.resourceId} resource={resource} />
            ))}
        </div>
    )

    return (
        <ResourceModalContext.Provider value={resourceModalContextValue}>
            <ModalContent>
                <ModalHeader className="p-4 pb-0 text-xl">Resources</ModalHeader>
                <ModalBody className="p-4 gap-4">
                    <Dropzone onDrop={onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="cursor-pointer border-dashed rounded-large border-4 h-48 grid place-items-center">
                                        <div>
                                            <DocumentArrowUpIcon className="w-20 h-20 text-foreground-500" />
                                            <Spacer y={1}/>
                                            <div className="text-sm text-foreground-500">
                          Upload file(s)
                                            </div>
                                        </div>  
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <Divider/>
                    {renderResources()}
                </ModalBody>
            </ModalContent>
        </ResourceModalContext.Provider>
    )
}

export const ResourcesModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button onPress={onOpen} startContent={<FolderIcon size={21} strokeWidth={1.333}/>} variant="flat">
                Resources
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <WrappedResourcesModal />
            </Modal>
        </>
    )
}
