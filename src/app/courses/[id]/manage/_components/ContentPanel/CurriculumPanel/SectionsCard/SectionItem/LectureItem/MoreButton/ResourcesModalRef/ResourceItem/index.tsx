import { Card, CardBody, Link } from "@nextui-org/react"
import React from "react"
import { ResourceEntity } from "@common"
import { getAssetUrl } from "@services"
import { DownloadIcon, XIcon } from "lucide-react"

interface ResourceItemProps {
  resource: ResourceEntity;
}

export const ResourceItem = (props: ResourceItemProps) => {
    return (
        <Card fullWidth shadow="none" className="bg-content2">
            <CardBody>
                <div className="w-full justify-between items-center flex">
                    <Link as="button" color="foreground" size="sm" underline="always">
                        {props.resource.name}
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link href={getAssetUrl(props.resource.fileId)}> <DownloadIcon size={20} strokeWidth={4/3}/></Link>
                        <Link as="button"> <XIcon size={20} strokeWidth={4/3}/> </Link>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
