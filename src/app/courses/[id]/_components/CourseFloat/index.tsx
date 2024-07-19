import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Spacer,
} from "@nextui-org/react"

import {
    ChainId,
    ERC20Contract,
    chainInfos,
} from "@blockchain"
import { CartCourseEntity, computePercentage } from "@common"
import {
    ArrowRightEndOnRectangleIcon,
    ShoppingCartIcon,
    BuildingStorefrontIcon
} from "@heroicons/react/24/outline"
import { useSDK } from "@metamask/sdk-react"
import { addToCart, enrollCourse, getAssetUrl } from "@services"
import {
    BookOpen,
    ClipboardPenLineIcon,
    FileQuestion,
    ListVideo,
    PlaySquareIcon
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useCallback, useContext, useMemo } from "react"
import { RootContext } from "../../../../_hooks"
import { VideoPlayer } from "../../../../_shared"
import { CourseDetailsContext } from "../../_hooks"
import useSWRMutation from "swr/mutation"
import { ToastType } from "../../../../_components"

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
        sections,
        isCreator
    } = {
        ...course,
    }
    const { walletAddress } = { ...creator }

    const { account, provider } = useSDK()

    const { disclosures, swrs : RootContextSwrs, notify } = useContext(RootContext)!
    const { notConnectWalletModalDisclosure } = disclosures
    const { onOpen } = notConnectWalletModalDisclosure
    const { profileSwr } = RootContextSwrs
    const {cart} = {...profileSwr?.data}

    const isAddedToCart = useMemo(() => {
        if (cart) {
            let added = -1
            const { cartCourses } = cart
            if (cartCourses && cartCourses.length) {
                added = cartCourses.findIndex(
                    (cartCourse: CartCourseEntity) =>
                        cartCourse.course.courseId === courseId
                )
            }
            return added !== -1
        }
        return false
    }, [profileSwr.data])

    const fetchAddToCart = async (_: string, { arg }: { arg: string }) => {
        const res = await addToCart({
            data: {
                courseId: arg,
            },
        })
        if(res.others) {
            await mutate()
            notify!({
                data: {
                    message: res.message
                },
                type: ToastType.Success
            })
        } else {
            notify!({
                data: {
                    error: res.message,
                },
                type: ToastType.Error
            })
        }
            
    }

    const { trigger, isMutating } = useSWRMutation(
        "ADD_TO_CART",
        fetchAddToCart
    )
    
    const handleAddToCart = async (courseId: string) => {
        try {
            await trigger(courseId)
        } catch (ex) {
            console.log(ex)
        }
    }
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

    const {numberOfSection, numberOfLesson, numberOfQuiz} = useMemo(() => {
        const numberOfSection = sections?.length
        let numberOfLesson = 0
        let numberOfQuiz = 0

        sections?.map((section) => {
            numberOfLesson = numberOfLesson + section.lessons.length
            section.lessons?.map((lesson) => {
                if(lesson.quiz) numberOfQuiz++
            })
        })
        return {numberOfSection, numberOfLesson, numberOfQuiz}
    }, [sections])

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
    const onManageCoursePress = () => router.push("/management")

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
                {enrolled ? <div className="text-secondary font-semibold text-base mb-2">Enrolled</div> : null}
                <div>{renderPrice()}</div>
                <Spacer y={4} />
                <div>
                    <div className="text-base font-semibold">This course included</div>
                    <Spacer y={2} />
                    <div className="flex text-foreground-500 flex-col gap-2">
                        <div className="flex gap-2">
                            <ListVideo size={20} strokeWidth={3 / 2} />
                            <div className="text-sm font-semibold"> {numberOfSection} sections</div>
                        </div>
                        <div className="flex gap-2">
                            <PlaySquareIcon size={20} strokeWidth={3 / 2} />
                            <div className="text-sm font-semibold"> {numberOfLesson} lessons</div>
                        </div>
                        <div className="flex gap-2">
                            <FileQuestion size={20} strokeWidth={3 / 2} />
                            <div className="text-sm font-semibold"> {numberOfQuiz} quizzes</div>
                        </div>
                    </div>
                </div>
            </CardBody>
            <CardFooter className="p-4 pt-2 flex-col gap-2">
                {enrolled && isCreator === false ? (
                    <Button
                        color="secondary"
                        className="font-semibold"
                        onPress={onEnterCoursePress}
                        startContent={
                            <ArrowRightEndOnRectangleIcon height={20} width={20} />
                        }
                        fullWidth
                    >
            Enter course
                    </Button>
                ) : isCreator === false? (
                    <>
                        <Button
                            startContent={
                                <ClipboardPenLineIcon
                                    height={20}
                                    width={20}
                                    strokeWidth={3 / 2}
                                />
                            }
                            className="font-semibold"
                            onPress={onEnrollPress}
                            color="secondary"
                            fullWidth
                        >
              Enroll now
                        </Button>
                        {isAddedToCart ?  (<Button
                            color="primary"
                            className="font-semibold"
                            variant="flat"
                            onPress={() => router.push("/cart")}
                            startContent={<ShoppingCartIcon height={20} width={20} />}
                            fullWidth
                        >
                    Go to cart
                        </Button> )  : (<Button
                            color="primary"
                            className="font-semibold"
                            variant="light"
                            onPress={() => {console.log("adddd"), handleAddToCart(courseId || "")}}
                            startContent={<ShoppingCartIcon height={20} width={20} />}
                            fullWidth
                            isLoading={isMutating}
                        >
              Add to cart
                        </Button>) }
                        
                    </>
                ) : <>
                    <Button
                        color="secondary"
                        className="font-semibold"
                        startContent={<BookOpen height={20} width={20} strokeWidth={3 / 2} />}
                        fullWidth
                        onPress={onManageCoursePress}
                    >
                        Manage Course
                    </Button>
                </>}
            </CardFooter>
        </Card>
    )
}