import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Spacer,
} from "@nextui-org/react"

import { enrollCourse, getAssetUrl } from "@services"
import { useContext } from "react"
import { VideoPlayer } from "../../../../_shared"
import { CourseDetailsContext } from "../../_hooks"
import {
    ArrowRightEndOnRectangleIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline"
import {
    ClipboardPenLineIcon,
    FolderOpenIcon,
    PlaySquareIcon,
} from "lucide-react"
import { useSDK } from "@metamask/sdk-react"
import { RootContext } from "../../../../_hooks"
import { computePercentage, computeRaw } from "@common"
import {
    ChainId,
    ERC20Contract,
    chainInfos,
} from "@blockchain"
import { usePathname, useRouter } from "next/navigation"

export const CourseFloat = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course, isLoading, mutate } = courseSwr
    const {
        previewVideoId,
        price,
        enableDiscount,
        discountPrice,
        courseId,
        enrolled,
        creator,
    } = {
        ...course,
    }
    const { walletAddress } = { ...creator }

    const { account, provider } = useSDK()

    const { disclosures } = useContext(RootContext)!
    const { notConnectWalletModalDisclosure } = disclosures
    const { onOpen } = notConnectWalletModalDisclosure

    // useEffect(() => {
    //     if (socket === null) return
    //     socket.on(
    //         TRANSACTION_VERIFIED,
    //         async ({ code }: TransactionVerifiedMessage) => {
    //             console.log("C")
    //             if (!courseId) return
    //             // await enrollCourse({
    //             //     data: {
    //             //         courseId,
    //             //         code,
    //             //     },
    //             // })
    //             // await mutate()
    //         }
    //     )
    //     return () => {
    //         socket.removeListener(TRANSACTION_VERIFIED)
    //     }
    // }, [socket, courseId])

    const getPrice = () => {
        return (enableDiscount ? discountPrice : price) ?? 0
    }

    const getPriceRaw = () => {
        if (!price) return BigInt(0)
        return enableDiscount ? computeRaw(discountPrice ?? 0) : computeRaw(price)
    }

    const onEnrollPress = async () => {
        if (!account) {
            onOpen()
            return
        }
        if (!courseId) return

        console.log(walletAddress)
        if (!walletAddress) {
            return
        }

        const tokenContract = new ERC20Contract(
            ChainId.KalytnTestnet,
            chainInfos[ChainId.KalytnTestnet].tokenAddress,
            provider,
            account
        )

        await enrollCourse({
            data: {
                courseId,
                numberOfQueries: 10,
                queryInterval: 0.5,
            },
        })
        await mutate()
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

    const path = usePathname()
    const router = useRouter()
    const onEnterCoursePress = () => router.push(`${path}/home`)

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
            <CardBody className="p-4">
                {enrolled ? <div className="text-primary text-sm">Enrolled</div> : null}
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
            <CardFooter className="p-4 pt-2 flex-col gap-4">
                {enrolled ? (
                    <Button
                        color="primary"
                        onPress={onEnterCoursePress}
                        startContent={
                            <ArrowRightEndOnRectangleIcon height={20} width={20} />
                        }
                        fullWidth
                    >
            Enter course
                    </Button>
                ) : (
                    <>
                        <Button
                            startContent={
                                <ClipboardPenLineIcon
                                    height={20}
                                    width={20}
                                    strokeWidth={3 / 2}
                                />
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
                    </>
                )}
            </CardFooter>
        </Card>
    )
}