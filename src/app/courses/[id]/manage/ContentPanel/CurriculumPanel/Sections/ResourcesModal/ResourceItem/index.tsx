import { Card, CardBody, Link } from "@nextui-org/react"
import React from "react"
import { ResourceEntity } from "@common"

interface ResourceItemProps {
  resource: ResourceEntity;
}

export const ResourceItem = (props: ResourceItemProps) => {
    return (
        <Card fullWidth shadow="none" className="bg-content2">
            <CardBody>
                <div className="w-full justify-between items-center flex">
                    <Link as="button" color="foreground" underline="always">{props.resource.name}</Link>
                    <div className="flex gap-4 items-center">
                        <Link as="button"> Download </Link>
                        <Link as="button"> Remove </Link>
                    </div>
                </div>   
            </CardBody>
        </Card>
    )
}
