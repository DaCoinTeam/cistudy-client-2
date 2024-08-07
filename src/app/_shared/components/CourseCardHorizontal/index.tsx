import { CourseEntity } from "@common"
import { Button, Divider, Spacer, Tooltip, User } from "@nextui-org/react"
import { addToCart, getAssetUrl, getAvatarUrl } from "@services"
import { InteractiveThumbnail } from "../InteractiveThumbnail"
import { Stars } from "../Stars"
import { useRouter } from "next/navigation"
import { CheckIcon, FileQuestion, ListVideo, PlaySquareIcon } from "lucide-react"
import { useContext } from "react"
import { RootContext } from "../../../_hooks"
import { ToastType } from "../../../_components"
import useSWRMutation from "swr/mutation"

export const CourseCardHorizontal = (props: CourseEntity) => {
    const { title, creator, thumbnailId, description, courseId, courseRatings, discountPrice, price, enableDiscount, courseTargets  } = { ...props }
    const { avatarId, avatarUrl, kind, username } = {
        ...creator,
    }
    const { overallCourseRating, totalNumberOfRatings} = {...courseRatings}
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
    return (
        <Tooltip
            placement="top"
            showArrow={true}
            shadow="lg"
            className="max-w-96"
            content={
                <div className="p-4">
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
            <div className="flex gap-4" key={courseId}>
                <InteractiveThumbnail isPressable className="min-w-60 w-60 h-fit relative" src={getAssetUrl(thumbnailId)} onPress={() => router.push(`/courses/${courseId}`)}/>
                <div className="flex-1">
                    <div className="text-lg"> {title} </div>
                    <div className="text-sm text-foreground-400 line-clamp-2"> {description} </div>
                    <Spacer y={4}/>
                    <div className="flex gap-4 h-10 items-center ">
                        <User classNames={{
                            name: "text-base",
                            description: "w-20"
                        }} avatarProps={{
                            src: getAvatarUrl({
                                avatarUrl: avatarUrl,
                                avatarId: avatarId,
                                kind: kind
                            })
                        }} name={username} description={"2 followers"}/>
                        <Divider orientation="vertical"/>
                        <div className="flex flex-col items-end">
                            <div className="flex flex-row justify-center items-end leading-4">
                                <Stars  readonly size={18} initialValue={overallCourseRating} />
                                <div className="text-sm  ms-1">{overallCourseRating}</div>
                            </div>
                            <div className="text-xs text-foreground-400 ms-1">({totalNumberOfRatings | 0})</div>

                        </div>
                        <Divider orientation="vertical"/>
                        <div className="flex justify-between w-full items-center h-11">
                            <div className="flex flex-col items-start">
                                <div className="text-lg font-semibold text-primary p-0 ms-1">{enableDiscount ? discountPrice : price} STARCI</div>
                                {enableDiscount && <div className="text-sm text-foreground-400 line-through ms-1">{price} STARCI</div>}
                            </div>
                       
                            <Button color="primary"
                                isLoading={isMutating}
                                onPress={() => {
                                    handleAddToCart(courseId ?? "")
                                }}
                            >
                            Add to cart
                            </Button>
                        </div>
                    </div>

                </div>           
            </div>
        </Tooltip>
    )
}