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
    FolderOpenIcon,
    PlaySquareIcon,
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
            shadow="none"
            radius="md"
            className="w-full border border-divider rounded-medium"
        >
            <CardHeader className="p-0 pb-2 object-cover">
                <VideoPlayer
                    className="w-full rounded-b-none h-[180px]"
                    src={getAssetUrl(previewVideoId)}
                />
            </CardHeader>
            <CardBody className="p-4">
                <div>{renderPrice()}</div>
                <Spacer y={4} />
                <div>
                    <div className="text-sm">This course included</div>
                    <Spacer y={2} />
                    <div className="flex text-foreground-400 flex-col gap-2">
                        <div className="flex gap-2">
                            <PlaySquareIcon size={20} strokeWidth={3 / 2} />
                            <div className="text-sm"> 4 lessons</div>
                        </div>
                        <div className="flex text-foreground-400 gap-2">
                            <FolderOpenIcon size={20} strokeWidth={3 / 2} />
                            <div className="text-sm"> 7 downloadable resources </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}