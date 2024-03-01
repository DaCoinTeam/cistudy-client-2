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
    ModalFooter,
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
import { LectureItemContext } from "../.."
import { FolderIcon, UploadCloudIcon } from "lucide-react"

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
        <div>
            <div className="gap-2 items-center flex mt-2">
                <UploadCloudIcon size={28} strokeWidth={4 / 3} />
                <div className="text-lg font-semibold"> Uploaded </div>
            </div>
            <Spacer y={4} />
            <div className="flex flex-col gap-4">
                {resources.map((resource) => (
                    <ResourceItem key={resource.resourceId} resource={resource} />
                ))}
            </div>
        </div>
    )

    return (
        <ResourceModalContext.Provider value={resourceModalContextValue}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="p-6 pb-0 text-xl">Resources</ModalHeader>
                        <ModalBody className="p-6 pb-0 gap-4">
                            <Dropzone onDrop={onDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className="cursor-pointer border-dashed rounded-large border-4 h-48 grid place-items-center">
                                                <div>
                                                    <DocumentArrowUpIcon className="w-20 h-20 text-foreground-500" />
                                                    <Spacer y={1} />
                                                    <div className="text-sm text-foreground-500">
                            Upload file(s)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        </ModalBody>
                        <ModalBody className="p-6 gap-4">{renderResources()}</ModalBody>
                        <ModalFooter className="p-6 gap-4 pt-0">
                            <Button color="danger" variant="light" onPress={onClose}>
                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </ResourceModalContext.Provider>
    )
}

export const ResourcesModal = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    return (
        <>
            <Button
                onPress={onOpen}
                className="bg-content2"
                startContent={<FolderIcon size={20} strokeWidth={4 / 3} />}
            >
        Resources
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <WrappedResourcesModal />
            </Modal>
        </>
    )
}
