import { CourseEntity } from "@common"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Spacer, User } from "@nextui-org/react"
import { getAssetUrl, getAvatarUrl } from "@services"
import {
    FileQuestionIcon,
    ListVideo,
    PackageIcon,
    VideoIcon
} from "lucide-react"
import { useRouter } from "next/navigation"
import { InteractiveThumbnail, Stars } from "../../../_shared"
export const CartItem = (props: CourseEntity) => {
    const { title, creator, thumbnailId, description, sections, courseId, courseRatings, discountPrice, price, enableDiscount, numberOfLessons, numberOfQuizzes, numberOfResources  } = { ...props }
    const { avatarId, avatarUrl, kind, username } = {
        ...creator,
    }
    const { overallCourseRating, totalNumberOfRatings} = {...courseRatings}
    const router = useRouter()
    return (
       
        <div className="flex gap-4 items-center justify-center" key={courseId}>
            <InteractiveThumbnail  isPressable className="min-w-40 w-40 h-fit relative" src={getAssetUrl(thumbnailId)} onPress={() => router.push(`/courses/${courseId}`)}/>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-4 mr-2">
                    <div className="text-lg font-medium"> {title} </div>
                    <div className="text-sm text-foreground-400 line-clamp-2"> 
                        {description}
                    </div>
                    <Spacer y={2}/>

                    <div className="text-sm text-foreground-400 line-clamp-2"> 
                        <div className="flex text-foreground-500 flex-row gap-6">
                            <div className="flex gap-2">
                                <ListVideo size={20} strokeWidth={3 / 2} />
                                <div className="text-sm"> {sections?.length} sections</div>
                            </div>
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
                    <Spacer y={2}/>

                    <div className="flex w-full gap-4 items-center justify-between ">
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
                        <div className="flex flex-col items-end">
                            <div className="flex flex-row justify-end items-end leading-4">
                                <Stars  readonly size={18} initialValue={overallCourseRating} />
                                <div className="text-sm  ms-1">{overallCourseRating | 0}</div>
                            </div>
                            <div className="text-xs text-foreground-400 ms-1">({totalNumberOfRatings | 0} ratings)</div>

                        </div>
                        <div className="flex items-center  text-red-600 cursor-pointer">
                            <XMarkIcon className="h-6 w-6 mr-1" onClick={() => console.log("remove")}/>
                            <div className="text-sm  text-red-60">Remove</div>
                        </div>
                        
                    </div>
                   
                </div>   
                <div  className="col-span-1 h-full flex justify-center items-start">
                    <div className="flex items-center ">
                        <div className="flex flex-col items-start">
                            <div className="text-base font-semibold p-0 ms-1">{enableDiscount ? discountPrice : price} STARCI</div>
                            {enableDiscount && <div className="text-sm text-foreground-400 line-through ms-1">{price} STARCI</div>}
                        </div>
                    </div>
                </div>
            </div>
                    
        </div>
    )
}