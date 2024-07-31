


import { computePercentage } from "@common"
import {
    ArrowRightEndOnRectangleIcon,
    BookOpenIcon
} from "@heroicons/react/24/outline"
import { getAssetUrl } from "@services"

import {
    FileQuestionIcon,
    ListVideo,
    PackageIcon,
    VideoIcon
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react"
import { Button, Spacer } from "@nextui-org/react"
import { VideoPlayer } from "../../../../_shared"
import { CourseDetailsContext } from "../../_hooks"
import { AddToCartButton } from "../CourseFloat/AddToCartButton"
import { ConfirmEnrollModal } from "../CourseFloat/ConfirmEnrollModal"


export const ReplaceCourseFloat = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course, isLoading } = courseSwr
    const {
        previewVideoId,
        price,
        enableDiscount,
        discountPrice,
        enrolled,
        numberOfLessons,
        sections,
        numberOfQuizzes,
        numberOfResources,
        isCreator
    } = {
        ...course,
    }

    const renderDiscountPercentage = () => {
        if (!discountPrice || !price) return 0
        return (100 - computePercentage(discountPrice, price)).toFixed(2)
    }
    const renderPrice = () => {
        if (isLoading) return null

        if (!enableDiscount)
            return <div className="text-3xl font-semibold">{price} STARCI</div>

        return (
            <div>
                <div className="flex gap-2 items-center">
                    <div className="text-3xl font-semibold">{discountPrice} STARCI</div>
                    <div className="line-through font-semibold text-foreground-400 text-sm">
                        {price} STARCI
                    </div>
                </div>
                <div className="text-sm font-semibold">{renderDiscountPercentage()}% off</div>
            </div>
        )
    }

    const path = usePathname()
    const router = useRouter()
    const onEnterCoursePress = () => router.push(`${path}/home`)
    const onEnterManageCoursePress = () => router.push(`${path}/management`)

    return (
        <div className="w-[430px] md:w-[560px] mx-auto  items-center border border-divider rounded-medium" >
            <div className="p-0 pb-2">
                <VideoPlayer
                    className="w-full rounded-t-lg rounded-b-none h-[240px]"
                    src={getAssetUrl(previewVideoId)}
                />
            </div>
            <div className="flex flex-col items-center mt-4 px-6">
                {enrolled ? <div className="text-primary font-semibold text-base mb-2">Enrolled</div> : null}
                <div>{renderPrice()}</div>
                <Spacer y={4} />
                <div className="flex flex-col items-center mb-2">
                    <div className="text-base font-semibold">This course included</div>
                    <Spacer y={2} />
                    <div className="flex text-foreground-500 flex-row gap-2">
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
            </div>
            <div className="p-4 pt-2 flex-col gap-2">
                {enrolled && !isCreator ? (
                    <Button
                        color="primary"
                        className="font-semibold"
                        onPress={onEnterCoursePress}
                        startContent={
                            <ArrowRightEndOnRectangleIcon height={20} width={20} />
                        }
                        fullWidth
                    >
            Enter course
                    </Button>
                ) : !isCreator? (
                    <>
                        <ConfirmEnrollModal/>
                        <AddToCartButton/>
                    </>
                ) : <Button
                    color="primary"
                    className="font-semibold"
                    onPress={onEnterManageCoursePress}
                    startContent={
                        <BookOpenIcon height={20} width={20} />
                    }
                    fullWidth
                >Manage course</Button>}
            </div>
        </div>
    )
}