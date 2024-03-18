import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Spacer,
} from "@nextui-org/react"

import { getAssetUrl, getDiscountPrice } from "@services"
import { useContext } from "react"
import { VideoPlayer } from "../../../../_shared"
import { CourseDetailsContext } from "../../_hooks"
import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import {
    ClipboardPenLineIcon,
    FolderOpenIcon,
    PlaySquareIcon,
} from "lucide-react"
import { useSDK } from "@metamask/sdk-react"
import { RootContext } from "../../../../_hooks"

export const CourseFloat = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course, isLoading } = courseSwr
    const { previewVideoId, price, enableDiscount, discount } = { ...course }

    const { account } = useSDK()

    const { disclosures } = useContext(RootContext)!
    const { notConnectWalletModalDisclosure } = disclosures
    const { onOpen } = notConnectWalletModalDisclosure

    const onEnrollPress = () => {
        if (!account) {
            onOpen()
            return
        }
        // call api
    }

    const renderPrice = () => {
        if (isLoading) return null

        if (!enableDiscount) 
            return (
                <div
                    className="text-3xl font-semibold"
                >
                    {price} STARCI
                </div>
            )
        
        return (
            <div>
                <div className="flex gap-2 items-center">
                    <div className="text-3xl font-semibold">
                        {getDiscountPrice(price, discount)} STARCI
                    </div>
                    <div
                        className="line-through text-foreground-500 text-sm"
                    >
                        {price} STARCI
                    </div>
                </div>
                <div className="text-sm"> {discount}% off </div>
            </div>
       
        )
    }
    return (
        <Card
            shadow="none"
            radius="md"
            className="w-80 border border-divider rounded-medium"
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
                    <div className="flex text-foreground-500 flex-col gap-2">
                        <div className="flex gap-2">
                            <PlaySquareIcon size={20} strokeWidth={3 / 2} />
                            <div className="text-sm"> 4 lectures</div>
                        </div>
                        <div className="flex text-foreground-500 gap-2">
                            <FolderOpenIcon size={20} strokeWidth={3 / 2} />
                            <div className="text-sm"> 7 downloadable resources </div>
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="p-4 pt-2 flex-col gap-4">
                <Button
                    startContent={
                        <ClipboardPenLineIcon height={20} width={20} strokeWidth={3 / 2} />
                    }
                    onPress={onEnrollPress}
                    color="primary"
                    fullWidth
                >
          Enroll now
                </Button>
                <Button
                    color="primary"
                    variant="light"
                    startContent={<ShoppingCartIcon height={20} width={20} />}
                    fullWidth
                >
          Add to cart
                </Button>
            </CardFooter>
        </Card>
    )
}
