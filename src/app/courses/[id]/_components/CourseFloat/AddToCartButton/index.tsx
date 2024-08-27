import { ShoppingCartIcon } from "@heroicons/react/24/outline"
import { Button } from "@nextui-org/react"
import useSWRMutation from "swr/mutation"
import { addToCart } from "@services"
import { CartCourseEntity } from "@common"
import { useContext, useMemo } from "react"
import { RootContext } from "../../../../../_hooks"
import { ToastType } from "../../../../../_components"
import { CourseDetailsContext } from "../../../_hooks"
import { useRouter } from "next/navigation"

export const AddToCartButton = () => {
    const { swrs: RootContextSwrs, notify } = useContext(RootContext)!

    const { profileSwr } = RootContextSwrs
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { cart } = { ...profileSwr?.data }
    const router = useRouter()

    const isAddedToCart = useMemo(() => {
        if (cart) {
            let added = -1
            const { cartCourses } = cart
            if (cartCourses && cartCourses.length) {
                added = cartCourses.findIndex(
                    (cartCourse: CartCourseEntity) =>
                        cartCourse.course.courseId === course?.courseId
                )
            }
            return added !== -1
        }
        return false
    }, [profileSwr.data])

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
        <div className="w-full">
            {isAddedToCart ? (
                <Button
                    color="primary"
                    variant="flat"
                    onPress={() => router.push("/cart")}
                    startContent={<ShoppingCartIcon height={20} width={20} />}
                    fullWidth
                >
          Go to cart
                </Button>
            ) : (
                <Button
                    color="primary"
                    variant="light"
                    isLoading={isMutating}
                    onPress={() => {
                        handleAddToCart(course?.courseId ?? "")
                    }}
                    startContent={isMutating ? null : <ShoppingCartIcon height={20} width={20} />}
                    fullWidth
                >
          Add to cart
                </Button>
            )}
        </div>
    )
}
