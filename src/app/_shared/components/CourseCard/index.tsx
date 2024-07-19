import { CourseEntity } from "@common"
import { Card, CardBody, CardFooter, Divider, Image, User } from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl } from "../../../../services/server"
import { Stars } from "../../../_shared"
import { useRouter } from "next/navigation"

export const CourseCard = (props: CourseEntity) => {
    const { title, creator, thumbnailId, description, price, discountPrice, courseId, courseRatings } = { ...props }
    const { avatarId, avatarUrl, kind, username } = {
        ...creator,
    }
    const {totalNumberOfRatings, overallCourseRating} = {...courseRatings}
    const router = useRouter()
    return (
        <Card   className="w-full hover:cursor-pointer"  isPressable onPress={() => router.push(`/courses/${courseId}`)}>
            <div className="w-full">
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
            
            <CardBody className="pb-1 w-full min-h-32">
                <div className="text-lg mb-2 line-clamp-2"> {title} </div>
                <div className="text-sm text-foreground-400  line-clamp-2"> {description} </div>
            </CardBody>
            <CardFooter className="w-full" >
                <div className="flex justify-between gap-4 h-8 items-center mb-2 w-full">
                    <div >
                        <User classNames={{
                            name: "text-sm"
                        }} avatarProps={{
                            src: getAvatarUrl({
                                avatarUrl: avatarUrl,
                                avatarId: avatarId,
                                kind: kind
                            })
                        }} name={username} description={"2 followers"}/>
                    </div>
                   
                    <Divider orientation="vertical"/>
                    <div className="flex flex-col items-end">
                        <div className="text-sm font-semibold text-primary p-0 ms-1">{discountPrice ? discountPrice : price} STARCI</div>

                        <div className="flex flex-row justify-center items-end leading-4">
                            <Stars  readonly size={18} initialValue={overallCourseRating} />
                            <div className="text-xs text-foreground-400 ms-1">({totalNumberOfRatings | 0})</div>
                        </div>
                    </div>
                    
                </div>
            </CardFooter>
        </Card>

    )
}
