import {
    Card,
    CardBody,
    CardHeader,
    Spacer,
} from "@nextui-org/react"

import { getAssetUrl } from "@services"
import { useContext } from "react"
import { VideoPlayer } from "../../../../../_shared" 
import { CoursePreviewContext } from "../../_hooks"
import {
    FileQuestionIcon,
    ListVideo,
    PackageIcon,
    VideoIcon,
} from "lucide-react"
import { computePercentage } from "@common"

export const CourseFloat = () => {
    const { swrs } = useContext(CoursePreviewContext)!
    const { courseSwr } = swrs
    const { data: course, isLoading } = courseSwr
    const {
        previewVideoId,
        price,
        enableDiscount,
        discountPrice,
        numberOfLessons,
        sections,
        numberOfQuizzes,
        numberOfResources,
    } = {
        ...course,
    }

    const renderDiscountPercentage = () => {
        if (!discountPrice || !price) return 0
        return 100 - computePercentage(discountPrice, price)
    }
    const renderPrice = () => {
        if (isLoading) return null

        if (!enableDiscount)
            return <div className="text-3xl font-semibold">{price} STARCI</div>

        return (
            <div>
                <div className="flex gap-2 items-center">
                    <div className="text-3xl font-semibold">{discountPrice} STARCI</div>
                    <div className="line-through text-foreground-400 text-sm">
                        {price} STARCI
                    </div>
                </div>
                <div className="text-sm">{renderDiscountPercentage()}% off</div>
            </div>
        )
    }

    return (
        <Card
            radius="md"
            className="w-full border border-divider rounded-medium"
        >
            <CardHeader className="p-0 pb-2 object-cover">
                <VideoPlayer
                    className="w-full rounded-b-none h-[180px]"
                    src={getAssetUrl(previewVideoId)}
                />
            </CardHeader>
            <CardBody className="px-6 py-3">
                <div>{renderPrice()}</div>
                <Spacer y={4} />
                <div>
                    <div className="text-base font-semibold">This course included</div>
                    <Spacer y={2} />
                    <div className="flex text-foreground-500 flex-col gap-2">
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
            </CardBody>
        </Card>
    )
}