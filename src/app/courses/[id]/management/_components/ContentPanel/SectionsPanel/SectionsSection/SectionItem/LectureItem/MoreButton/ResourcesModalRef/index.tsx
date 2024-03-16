"use client"
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid"
import {
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Spacer,
} from "@nextui-org/react"
import React, {
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useImperativeHandle,
    useMemo,
} from "react"
import { ErrorResponse, ResourceEntity } from "@common"
import { ResourceItem } from "./ResourceItem"
import { createResources, findManyResources } from "@services"
import Dropzone from "react-dropzone"
import { LectureItemContext } from "../.."
import useSWR, { SWRResponse } from "swr"

interface ResourceModalContextValue {
  swrs: {
    resourcesSwr: SWRResponse<Array<ResourceEntity>, ErrorResponse>;
  };
}

export interface ResourceModalRefSelectors {
  onOpen: () => void;
}

export const ResourceModalContext =
  createContext<ResourceModalContextValue | null>(null)

const WrappedResourcesModalRef = () => {
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { lectureId } = lecture

    const fetchResources = useCallback(async () => {
        return await findManyResources(
            {
                params: {
                    lectureId,
                }
            },
            {
                resourceId: true,
                name: true,
                fileId: true,
            }
        )
    }, [])

    const resourcesSwr = useSWR(["RESOURCES"], fetchResources)

    const resourceModalContextValue: ResourceModalContextValue = useMemo(
        () => ({
            swrs: {
                resourcesSwr,
            },
        }),
        [resourcesSwr]
    )

    const onDrop = useCallback(async (files: Array<File>) => {
        await createResources({
            data: {
                lectureId,
            },
            files,
        })
        await resourcesSwr.mutate()
    }, [])

    const renderResources = () => (
        <div>
            <div className="flex flex-col gap-4">
                {resourcesSwr.data?.map((resource) => (
                    <ResourceItem key={resource.resourceId} resource={resource} />
                ))}
            </div>
        </div>
    )

    return (
        <ResourceModalContext.Provider value={resourceModalContextValue}>
            <ModalContent>
                <ModalHeader className="p-4 pb-2 text-2xl ">
          Resources
                </ModalHeader>
                <ModalBody className="p-4 pb-0 gap-4">
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
                <ModalBody className="p-4 gap-4">{renderResources()}</ModalBody>
            </ModalContent>
        </ResourceModalContext.Provider>
    )
}

export interface ResourcesModalRefSelectors {
  onOpen: () => void;
}

export const ResourcesModalRef = forwardRef<ResourcesModalRefSelectors>(
    (_, ref) => {
        const { isOpen, onOpen, onOpenChange } = useDisclosure()

        useImperativeHandle(ref, () => ({
            onOpen,
        }))

        return (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <WrappedResourcesModalRef />
            </Modal>
        )
    }
)
