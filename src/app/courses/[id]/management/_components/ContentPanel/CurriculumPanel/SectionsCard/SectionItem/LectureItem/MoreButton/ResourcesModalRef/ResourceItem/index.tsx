import { Card, CardBody, Link } from "@nextui-org/react"
import React, { useContext, useRef } from "react"
import { ResourceEntity } from "@common"
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
    const { resourceId, fileId, name } = resource

    const { swrs } = useContext(ResourceModalContext)!
    const { resourcesSwr } = swrs
    const { mutate } = resourcesSwr

    const onDeletePress = async () => {
        await deleteResource({
            data: {
                resourceId,
            },
        })
        await mutate()
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
                            {name}
                        </Link>
                        <div className="flex gap-4 items-center">
                            <Link href={getAssetUrl(fileId)}>
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
