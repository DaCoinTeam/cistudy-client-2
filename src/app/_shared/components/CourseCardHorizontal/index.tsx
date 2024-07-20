import { CourseEntity } from "@common"
import { Divider, Spacer, User } from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl } from "@services"
import { InteractiveThumbnail } from "../InteractiveThumbnail"
import { Stars } from "../Stars"
import { useRouter } from "next/navigation"

export const CourseCardHorizontal = (props: CourseEntity) => {
    const { title, creator, thumbnailId, description, courseId, courseRatings } = { ...props }
    const { avatarId, avatarUrl, kind, username } = {
        ...creator,
    }
    const { overallCourseRating} = {...courseRatings}
    const router = useRouter()
    return (
        <div className="flex gap-4" key={courseId}>
            <InteractiveThumbnail isPressable className="min-w-60 w-60 h-fit" src={getAssetUrl(thumbnailId)} onPress={() => router.push(`/courses/${courseId}`)}/>
            <div className="flex-1">
                <div className="text-lg"> {title} </div>
                <div className="text-sm text-foreground-400 line-clamp-2"> {description} </div>
                <Spacer y={4}/>
                <div className="flex gap-4 h-10 items-center">
                    <User classNames={{
                        name: "text-base"
                    }} avatarProps={{
                        src: getAvatarUrl({
                            avatarUrl: avatarUrl,
                            avatarId: avatarId,
                            kind: kind
                        })
                    }} name={username} description={"2 followers"}/>
                    <Divider orientation="vertical"/>
                    <Stars readonly initialValue={overallCourseRating} />
                </div>

            </div>           
        </div>
    )
}