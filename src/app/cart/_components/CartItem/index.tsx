import { CourseEntity, formatNouns } from "@common"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Link, Spacer, User } from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl } from "@services"
import {
    FileQuestionIcon,
    ListVideo,
    PackageIcon,
    VideoIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors, InteractiveThumbnail, Stars } from "../../../_shared"
import { useRef } from "react"
interface CartItemProps {
    course: CourseEntity,
    cartCourseId?: string,
    handleDelete?: (courseId: string) => void
}
export const CartItem = (props: CartItemProps) => {
    const {course, handleDelete, cartCourseId} = props
    const {
        title,
        creator,
        thumbnailId,
        description,
        sections,
        courseId,
        courseRatings,
        discountPrice,
        price,
        enableDiscount,
        numberOfLessons,
        numberOfQuizzes,
        numberOfResources,
    } = { ...course }
    const { avatarId, avatarUrl, kind, username, numberOfFollowers } = {
        ...creator,
    }
    const { overallCourseRating, totalNumberOfRatings } = { ...courseRatings }
    const router = useRouter()
    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()
    return (
        <div className="flex gap-4 items-center w-full" key={courseId}>
            <InteractiveThumbnail
                isPressable
                className="min-w-36 w-36 h-32"
                src={getAssetUrl(thumbnailId)}
                onPress={() => router.push(`/courses/${courseId}`)}
            />
            <div className="grid grid-cols-5 gap-4 w-full justify-between">
                <div className="col-span-4 mr-2 w-full">
                    <div className="text-lg font-medium"> {title} </div>
                    <div className="text-sm text-foreground-400 line-clamp-2">
                        {description}
                    </div>
                    <Spacer y={2} />

                    <div className="text-sm text-foreground-400 line-clamp-2">
                        <div className="flex text-foreground-500 flex-row gap-6">
                            <div className="flex gap-2">
                                <ListVideo size={20} strokeWidth={3 / 2} />
                                <div className="text-sm"> {sections?.length} sections</div>
                            </div>
                            <div className="flex gap-2">
                                <VideoIcon size={20} strokeWidth={3 / 2} />
                                <div className="text-sm">
                                    {numberOfLessons} lesson
                                    {numberOfLessons ?? 0 > 1 ? "s" : ""}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <FileQuestionIcon size={20} strokeWidth={3 / 2} />
                                <div className="text-sm">
                                    {numberOfQuizzes} quiz
                                    {(numberOfQuizzes ?? 0) > 1 ? "zes" : ""}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <PackageIcon size={20} strokeWidth={3 / 2} />
                                <div className="text-sm">
                                    {numberOfResources} resource
                                    {(numberOfResources ?? 0) > 1 ? "s" : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Spacer y={2} />

                    <div className="flex w-full gap-4 items-center justify-between ">
                        <User
                            classNames={{
                                name: "text-base",
                                description: "w-20",
                            }}
                            avatarProps={{
                                src: getAvatarUrl({
                                    avatarUrl: avatarUrl,
                                    avatarId: avatarId,
                                    kind: kind,
                                }),
                            }}
                            name={username}
                            description={formatNouns(numberOfFollowers, "follower")}
                        />
                        <div className="flex flex-col items-end">
                            <div className="flex flex-row justify-end items-end leading-4">
                                <Stars
                                    readonly
                                    size={18}
                                    initialValue={overallCourseRating}
                                />
                                <div className="text-sm  ms-1">
                                    {overallCourseRating || 0}
                                </div>
                            </div>
                            <div className="text-xs text-foreground-400 ms-1">
                                {totalNumberOfRatings > 1
                                    ? `(${totalNumberOfRatings} ratings)`
                                    : `(${totalNumberOfRatings || 0} rating)`}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 ">
                    <div className="h-full grid grid-rows-5 justify-end ">
                        <div className="row-span-4">
                            {enableDiscount ? (
                                <div className="flex flex-col items-end">
                                    <div className="text-base font-semibold p-0 ms-1">
                                        {discountPrice} STARCI
                                    </div>
                                    <div className="text-sm text-foreground-400 line-through ms-1">
                                        {price} STARCI
                                    </div>
                                </div>
                                   
                            ):(
                                <div className="text-base font-semibold p-0 ms-1">
                                    {price} STARCI
                                </div>
                            )}
                        </div>
                        {handleDelete  && (
                            <div className="row-span-1">
                                <Link onPress={onConfirmDeleteModalOpen} className="flex row-span-1  items-center justify-center  text-red-500 cursor-pointer">
                                    <XMarkIcon
                                        className="h-3 w-3 mr-1"
                                    />
                                    <div className="text-xs  text-red-60">Remove</div>
                                </Link>
                            </div>
                        )}
                       
                    </div>
                    
                    
                </div>
            </div>
            <ConfirmDeleteModalRef
                ref={confirmDeleteModalRef}
                title="You are going to delete a course in cart?"
                content={`Are you sure deleting the course '${title}' in cart`}
                onDeletePress={() => {if(handleDelete){handleDelete(cartCourseId ?? "")}}}
            />
        </div>
    )
}
