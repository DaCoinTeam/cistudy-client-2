import React from "react"
import { CourseEntity } from "@common"
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Spacer,
} from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { VideoPlayer } from "../../../../../../_shared"
import { FilePenLineIcon, MessagesSquareIcon } from "lucide-react"

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
            <CardBody className="p-3 pb-0">
                <div className="font-semibold leading-none">{title}</div>
                <Spacer y={3}/>
                <Divider />
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex items-center gap-1">
                    <FilePenLineIcon
                        size={16}
                        strokeWidth={4 / 3}
                        className="text-foreground-500"
                    />
                    <div className="text-xs text-foreground-500"> 2133 enrolls</div>
                </div>
                
                <div className="flex items-center gap-1">
                    <MessagesSquareIcon
                        size={16}
                        strokeWidth={4 / 3}
                        className="text-foreground-500"
                    />
                    <div className="text-xs text-foreground-500"> 2133 feedbacks</div>
                </div>
            </CardFooter>
        </Card>
    )
}
