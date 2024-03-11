import React from "react"
import { CourseEntity } from "@common"
import {
    Card,
    CardBody,
    CardHeader,
} from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { InteractiveThumbnail } from "../../../../../../_shared"

interface CourseCardProps {
  course: CourseEntity;
  className?: string;
}

export const CourseCard = (props: CourseCardProps) => {
    const { course, className } = props
    const { previewVideoId, title } = course

    return (
        <Card className={`${className ?? ""} border border-divider`} shadow="none">
            <CardHeader className="p-0">
                <InteractiveThumbnail
                    src={getAssetUrl(previewVideoId)}
                    className="!rounded-b-none w-full h-fit"
                />
            </CardHeader>
            <CardBody className="p-4">
                <div className="font-semibold">{title}</div>
            </CardBody>
        </Card>
    )
}
