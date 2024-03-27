import React from "react"
import { CourseEntity } from "@common"
import { Card, CardBody, CardHeader, Spacer, User } from "@nextui-org/react"
import { InteractiveThumbnail } from "../../../../_shared"
import { getAssetUrl } from "@services"
import { useRouter } from "next/navigation"

interface CourseCardProps {
    className?: string
    course: CourseEntity
}

export const CourseCard = (props: CourseCardProps) => {
    const { course, className } = props
    const { thumbnailId, title, creator, courseId } = course
    const { avatarId, username, numberOfFollowers } = { ...creator }

    const router = useRouter()
    const onPress = () => router.push(`/courses/${courseId}/home`)
    return (
        <Card onPress={onPress} isPressable shadow="none" className={`${className} border border-divider`} radius="md">
            <CardHeader className="p-0">
                <InteractiveThumbnail isPressable className="rounded-b-none h-fit" src={getAssetUrl(thumbnailId)}/>
            </CardHeader>
            <CardBody className="p-4">
                <div className="text-lg font-semibold"> {title} </div>
                <Spacer y={4}/>
                <User
                    className="w-fit"
                    classNames={{
                        name: "font-semibold text-base",
                        base: "gap-3"
                    }}
                    name={username}
                    description={`${numberOfFollowers} followers`}
                    avatarProps={{
                        src: getAssetUrl(avatarId),
                    }}
                ></User>
            </CardBody>
        </Card>
    )
}