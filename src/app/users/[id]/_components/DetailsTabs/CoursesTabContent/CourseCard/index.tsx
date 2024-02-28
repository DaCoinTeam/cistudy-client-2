import React from "react"
import { CourseEntity } from "@common"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { VideoPlayer } from "../../../../../../_shared"
import { EyeIcon, PenLineIcon } from "lucide-react"

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
                <VideoPlayer
                    src={getAssetUrl(previewVideoId)}
                    className="!rounded-b-none"
                />
            </CardHeader>
            <CardBody className="p-3">
                <div className="font-semibold">{title}</div>
                <div className="items-center flex gap-1">
                    <PenLineIcon
                        size={16}
                        strokeWidth={4 / 3}
                        className="text-foreground-500"
                    />
                    <div className="text-xs text-foreground-500"> 2133 Views</div>
                </div>
            </CardBody>
            <CardFooter className="p-3 pt-1">
                <Button
                    className="w-full"
                    startContent={<EyeIcon strokeWidth={4 / 3} size={20} />}
                >
          View
                </Button>
            </CardFooter>
        </Card>
    )
}
