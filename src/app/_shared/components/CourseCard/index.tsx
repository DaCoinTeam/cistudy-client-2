import { CourseEntity } from "@common"
import { Button, Card, CardBody, CardFooter, Chip, Divider, Image, Spacer, Tooltip, User } from "@nextui-org/react"
import { Award, CheckIcon, FileQuestion, ListVideo, PlaySquareIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { getAssetUrl, getAvatarUrl } from "../../../../services/server"
import { Stars } from "../../../_shared"

export const CourseCard = (props: CourseEntity) => {
    const { title, creator, thumbnailId, description, price, discountPrice, courseId, courseRatings, enableDiscount, courseTargets } = { ...props }
    const { avatarId, avatarUrl, kind, username } = {
        ...creator,
    }
    const {totalNumberOfRatings, overallCourseRating} = {...courseRatings}
    const router = useRouter()
    return (
        <div>

           
            <div>
                <Tooltip
                    placement="right-start"
                    showArrow={true}
                    shadow="sm"
                    content={
                        <div className="p-4">
                            {/* <div className="text-small font-bold">The course included</div> */}
                            <div >
                                <div className="text-base font-semibold">This course included</div>
                                <Spacer y={2} />
                                <div className="flex text-foreground-500 flex-col gap-2">
                                    <div className="flex gap-2">
                                        <ListVideo size={20} strokeWidth={3 / 2} />
                                        <div className="text-sm font-semibold"> 3 sections</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <PlaySquareIcon size={20} strokeWidth={3 / 2} />
                                        <div className="text-sm font-semibold"> 2 lessons</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <FileQuestion size={20} strokeWidth={3 / 2} />
                                        <div className="text-sm font-semibold"> 1 quizzes</div>
                                    </div>
                                </div>
                                
                            </div>
                            <Spacer y={2} />

                            <div>
                                <div className='text-base font-semibold'>What you will learn</div>
                                <Spacer y={4} />
                                <div className='items-start'>
                                    {courseTargets?.map(({ courseTargetId, content }) => (
                                        <div key={courseTargetId} className='flex flex-row items-start mb-1'>
                                            <div className='w-5 h-5 mr-3'>
                                                <CheckIcon />
                                            </div>
                                            <div className='text-sm font-semibold'>{content}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                >
                    <Card   className="w-full hover:cursor-pointer"  isPressable onPress={() => router.push(`/courses/${courseId}`)}>
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
                            <div  className="absolute right-4 top-4 z-20">
                                <Chip color="warning"  size="sm" startContent={<Award className="w-5 h-5"/>}  >Best Seller</Chip>
                            </div>
                        </div>
            
                        <CardBody className="pb-1 w-full min-h-30">
                            
            
                            <div className="text-lg mb-2 line-clamp-2"> {title} </div>
                            <div className="text-sm text-foreground-400  line-clamp-2"> {description} </div>
                        </CardBody>
                        <CardFooter className="w-full flex-col " >
                            <div className="flex justify-between gap-4 h-8 items-center mb-2 w-full ">
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
                                    <div className="flex flex-row justify-center items-end leading-4">
                                        <Stars  readonly size={18} initialValue={overallCourseRating} />
                                        <div className="text-sm  ms-1">{overallCourseRating}</div>
                                    </div>
                                    <div className="text-xs text-foreground-400 ms-1">({totalNumberOfRatings | 0})</div>

                                </div>
                    
                            </div>
                            <div className="flex justify-between w-full items-center h-12">
                                <div className="flex flex-col items-start">
                                    <div className="text-lg font-semibold text-primary p-0 ms-1">{enableDiscount ? discountPrice : price} STARCI</div>
                                    {enableDiscount && <div className="text-sm text-foreground-400 line-through ms-1">{price} STARCI</div>}
                                </div>
                       
                                <Button color="secondary">
                            Add to cart
                                </Button>
                            </div>

                        </CardFooter>
                    </Card>
                </Tooltip>
            </div>
            
        </div>


    )
}
