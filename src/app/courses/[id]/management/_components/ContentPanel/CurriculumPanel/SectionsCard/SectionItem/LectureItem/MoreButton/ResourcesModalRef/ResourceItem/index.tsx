import { Card, CardBody, Link } from "@nextui-org/react"
import React, { useContext, useRef } from "react"
import { ResourceEntity, isErrorResponse } from "@common"
import { deleteResource, getAssetUrl } from "@services"
import { DownloadIcon, XIcon } from "lucide-react"
import { ResourceModalContext } from ".."
import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
} from "../../../../../../../../../../../../_shared"

interface ResourceItemProps {
  resource: ResourceEntity;
}

export const ResourceItem = (props: ResourceItemProps) => {
    const { resource } = props
    const { resourceId } = resource

    const { functions } = useContext(ResourceModalContext)!
    const { fetchAndSetResources } = functions

    const onDeletePress = async () => {
        const response = await deleteResource({
            data: {
                resourceId,
            },
        })
        if (!isErrorResponse(response)) {
            await fetchAndSetResources()
        } else {
            console.log(response)
        }
    }

    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

    return (
        <>
            <Card fullWidth shadow="none" className="bg-content2">
                <CardBody>
                    <div className="w-full justify-between items-center flex">
                        <Link as="button" color="foreground" size="sm" underline="always">
                            {props.resource.name}
                        </Link>
                        <div className="flex gap-4 items-center">
                            <Link href={getAssetUrl(props.resource.fileId)}>
                                <DownloadIcon size={20} strokeWidth={4 / 3} />
                            </Link>
                            <Link as="button" onPress={onConfirmDeleteModalOpen}>
                                <XIcon size={20} strokeWidth={4 / 3} />{" "}
                            </Link>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <ConfirmDeleteModalRef
                ref={confirmDeleteModalRef}
                title="Delete Resource"
                content="Are you sure you want to delete this resource? You cannot undo this action."
                onDeletePress={onDeletePress}
            />
        </>
    )
}
