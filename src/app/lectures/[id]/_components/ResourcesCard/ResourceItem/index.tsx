import { Card, CardBody, Link } from "@nextui-org/react"
import React from "react"
import { ResourceEntity } from "@common"
import { getAssetUrl } from "@services"
import { DownloadIcon } from "lucide-react"

interface ResourceItemProps {
  resource: ResourceEntity;
}

export const ResourceItem = (props: ResourceItemProps) => {
    const { resource } = props
    const { fileId, name } = resource

    return (
        <Card fullWidth shadow="none" className="bg-content2">
            <CardBody>
                <div className="w-full justify-between items-center flex">
                    <Link className="max-w-[80%]" as="button" color="foreground" size="sm" underline="always">
                        <div className="truncate">
                            {name}
                        </div>            
                    </Link>
                    <Link href={getAssetUrl(fileId)}>
                        <DownloadIcon size={20} strokeWidth={3/2} />
                    </Link>
                </div>
            </CardBody>
        </Card>
    )
}
