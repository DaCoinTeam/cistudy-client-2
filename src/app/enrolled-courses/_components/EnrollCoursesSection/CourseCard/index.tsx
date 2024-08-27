import { CourseEntity } from "@common"
import { Button, Card, CardBody, CardFooter, Image, User } from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl } from "@services"
import { useRouter } from "next/navigation"

interface CourseCardProps {
    className?: string
    course: CourseEntity
}

export const CourseCard = (props: CourseCardProps) => {
    const { course } = props
    const { thumbnailId, title, description, creator, courseId } = course
    const { avatarId, username, avatarUrl, kind } = { ...creator }

    const router = useRouter()
    const onPress = () => router.push(`/courses/${courseId}/home`)
    return (
        <Card className="w-full hover:cursor-pointer h-full"  >
            <div className="w-full relative z-30">
                {thumbnailId && (
                    <Image
                        alt='course image'
                        style={{width: "100%"}}
                        removeWrapper
                        className='z-10 rounded-b-none object-cover max-h-[9.6rem] min-h-[9.6rem]'
                        src={getAssetUrl(thumbnailId)!}
                    />

                )}
            </div>

            <CardBody className="pb-4 w-full px-4 min-h-42 overflow-hidden">
                <div className="text-lg mb-2 line-clamp-2 min-h-13"> {title} </div>
                <div className="text-sm text-foreground-400  line-clamp-2 mb-4"> {description} </div>
                <div className="flex justify-between gap-4 h-7 items-center mb-4 w-full ">
                    <div >
                        <User classNames={{
                            name: "text-sm line-clamp-1",
                            description: "w-[3.5rem]"
                        }} avatarProps={{
                            src: getAvatarUrl({
                                avatarUrl: avatarUrl,
                                avatarId: avatarId,
                                kind: kind
                            })
                        }} name={username}
                        />
                    </div> 
                </div>
            </CardBody>
            <CardFooter className="p-4 pt-2">
                <Button fullWidth onPress={onPress} color="primary" >Enter course</Button>
            </CardFooter>
        </Card>
    )
}