import { CourseEntity, formatNouns } from "@common"
import { Button, Card, CardBody, CardFooter, Chip, Divider, Image, Link, Spacer, Tooltip, User } from "@nextui-org/react"
import {
    Award, CheckIcon,
    FileQuestionIcon,
    ListVideo,
    PackageIcon,
    VideoIcon
} from "lucide-react"
import { useRouter } from "next/navigation"
import { addToCart, getAssetUrl, getAvatarUrl } from "../../../../services/server"
import { Stars } from "../../../_shared"
import { useContext } from "react"
import { RootContext } from "../../../_hooks"
import { ToastType } from "../../../_components"
import useSWRMutation from "swr/mutation"

interface CourseCardProps {
    course: CourseEntity,
    isBestSeller?: boolean
}

export const CourseCard = (props: CourseCardProps) => {
    const {course, isBestSeller} = props
    const { title, creator, thumbnailId, description, price, discountPrice, courseId, courseRatings, enableDiscount, courseTargets, sections, numberOfLessons, numberOfQuizzes, numberOfResources, isAddedToCart, isCreator, enrolled } = {...course}
    const { avatarId, avatarUrl, kind, username, numberOfFollowers } = {
        ...creator,
    }
    const {totalNumberOfRatings, overallCourseRating} = {...courseRatings}
    const router = useRouter()

    
    const { swrs: RootContextSwrs, notify } = useContext(RootContext)!
    const { profileSwr } = RootContextSwrs
    const fetchAddToCart = async (_: string, { arg }: { arg: string }) => {
        const { message } = await addToCart({
            data: {
                courseId: arg,
            },
        })
        await profileSwr.mutate()
    notify!({
        data: {
            message,
        },
        type: ToastType.Success,
    })
    }

    const { trigger, isMutating } = useSWRMutation("ADD_TO_CART", fetchAddToCart)
    const handleAddToCart = async (courseId: string) => {
        try {
            await trigger(courseId)
        } catch (ex) {
            console.log(ex)
        }
    }
    const onEnterCoursePress = () => router.push(`courses/${courseId}/home`)
    const onEnterManageCoursePress = () => router.push(`courses/${courseId}/management`)
    return (
        <div>

           
            <div>
                <Tooltip
                    placement="right-start"
                    showArrow={true}
                    shadow="lg"
                    className="max-w-72"
                    content={
                        <div className="p-4">
                            <div >
                                <div className="text-base font-semibold">This course included</div>
                                <Spacer y={2} />
                                <div className="flex text-foreground-500 flex-col gap-2">
                                    {/* <div className="flex gap-2">
                                        <ListVideo size={20} strokeWidth={3 / 2} />
                                        <div className="text-sm"> {sections?.length} sections</div>
                                    </div> */}
                                    <div className="flex gap-2">
                                        <VideoIcon size={20} strokeWidth={3 / 2} />
                                        <div className="text-sm"> {numberOfLessons} lesson{numberOfQuizzes ?? 0 > 1 ? "s" : ""}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <FileQuestionIcon size={20} strokeWidth={3 / 2} />
                                        <div className="text-sm"> {numberOfQuizzes} quiz{(numberOfQuizzes ?? 0) > 1 ? "zes" : ""}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <PackageIcon size={20} strokeWidth={3 / 2} />
                                        <div className="text-sm"> {numberOfResources} resource{(numberOfResources ?? 0) > 1 ? "s" : ""}</div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            <Spacer y={4} />

                            <div>
                                <div className='text-base font-semibold'>What you will learn</div>
                                <Spacer y={2} />
                                <div className='items-start'>
                                    {courseTargets?.slice(0,3)?.map(({ courseTargetId, content }) => (
                                        <div key={courseTargetId} className='flex flex-row items-start mb-1'>
                                            <div className='w-5 h-5 mr-3'>
                                                <CheckIcon />
                                            </div>
                                            <div className='text-sm '>{content}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                >
                    <Card   className="w-full hover:cursor-pointer h-full"  isPressable onPress={() => router.push(`/courses/${courseId}`)}>
                        <div className="w-full relative z-30">
                            {thumbnailId ? (
                                <Image
                                    alt='course image'
                                    style={{width: "100%"}}
                                    removeWrapper
                                    className='z-10 rounded-b-none object-cover max-h-[9.6rem] min-h-[9.6rem]'
                                    src={getAssetUrl(thumbnailId)!}
                                />
                
                            ): <Image  alt='course image' 
                                className='z-10 rounded-b-none object-cover max-h-[9.6rem] min-h-[9.6rem]'
                                src="https://placehold.co/289x153?text=No+Image"/>}
                            {isBestSeller &&  <div  className="absolute right-4 top-4 z-20 flex">
                                <Chip color="warning"  size="sm" startContent={<Award className="w-5 h-5"/>}>Best Seller</Chip>
                            </div>
                            }
                           
                        </div>
            
                        <CardBody className="pb-1 w-full px-4 min-h-42 overflow-hidden">
                            <div className="text-lg mb-2 line-clamp-2 min-h-14"> {title} </div>
                            <div className="text-sm text-foreground-400 min-h-10 line-clamp-2 mb-4"> {description} </div>
                            <div className="flex justify-between gap-4 h-7 items-center mb-2 w-full ">
                                <div >
                                    <User classNames={{
                                        name: "text-sm line-clamp-1",
                                        description: "w-[70px]"
                                    }} avatarProps={{
                                        src: getAvatarUrl({
                                            avatarUrl: avatarUrl,
                                            avatarId: avatarId,
                                            kind: kind
                                        })
                                    }} name={username} description={formatNouns(numberOfFollowers, "follower")}
                                    />
                                </div> 
                   
                                <Divider orientation="vertical"/>
                                <div className="flex flex-col items-end">
                                    <div className="flex flex-row justify-center items-end leading-4">
                                        <Stars  readonly size={18} initialValue={overallCourseRating} />
                                        <div className="text-sm  ms-1">{overallCourseRating}</div>
                                    </div>
                                    <div className="text-xs text-foreground-400 ms-1">{totalNumberOfRatings > 1 ? `(${totalNumberOfRatings} ratings)` : `(${totalNumberOfRatings || 0} rating)`}</div>

                                </div>
                    
                            </div>
                        </CardBody>

                        <CardFooter className="w-full flex-col pt-2 px-4" >
                            <div className="flex justify-between w-full items-center h-11">
                                <div className="flex flex-col items-start">
                                    <div className="text-lg font-semibold text-black dark:text-white p-0 ms-1">{enableDiscount ? discountPrice : price} STARCI</div>
                                    {enableDiscount && <div className="text-sm text-foreground-400 line-through ms-1">{price} STARCI</div>}
                                </div>                                
                           
                            </div>

                        </CardFooter>
                    </Card>
                </Tooltip>
            </div>
            
        </div>


    )
}
