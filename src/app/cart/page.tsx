"use client"
import { Button, Checkbox } from "@nextui-org/react"
import React, { useContext, useMemo } from "react"
import { CourseCard } from "../_components/Courses/CourseCard"
import { RootContext } from "../_hooks"
import { useCartReducer } from "./_hooks/useCartReducer"

const Cart = () => {
    const [state, dispatch] = useCartReducer()
    const { selectedItems } = state

    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr
    const { cart } = { ...profile }
    const { cartCourses } = { ...cart }

    const getId = () => {
        if (!cartCourses) return []
        return cartCourses.map((cartCourse) => cartCourse.cartCourseId)
    }

    const getTotalPrice = useMemo( () => {
        let price = 0
        let discountPrice = 0
        if (cartCourses) {
            cartCourses.forEach((cartCourse) => {
                if (!selectedItems.includes(cartCourse.cartCourseId)) return
                if (!cartCourse.course.discountPrice) {
                    discountPrice += cartCourse.course.price
                } else {
                    discountPrice += cartCourse.course.discountPrice
                }
                price += cartCourse.course.price
            })
        }

        const total = {
            price: price,
            discountPrice: discountPrice,
        }
        return total
    }, [selectedItems])
    // const getTotalPrice = useMemo(() => handleGetPrice(), [selectedItems])
    const handleDispatchSelectItems = (id: string) => {
        if (!selectedItems) {
            dispatch({ type: "SET_SELECT_ITEM", payload: id })
        } else if (selectedItems.includes(id)) {
            dispatch({ type: "SET_UNSELECT_ITEM", payload: id })
        } else dispatch({ type: "SET_SELECT_ITEM", payload: id })
    }
    const handleDispatchSelectAll = () => {
        if (selectedItems.length === cartCourses?.length) {
            dispatch({ type: "SET_UNSELECT_ALL_ITEMS", payload: [] })
        } else dispatch({ type: "SET_SELECT_ALL_ITEMS", payload: getId() })
    }

    // const handleDelete = async () => {
    //     await deleteFromCart({ data: { cartCourseIds: selectedItems } })
    //         .then(async () => {

    //             ToastAndroid.showWithGravity(
    //                 "Delete success",
    //                 ToastAndroid.LONG,
    //                 ToastAndroid.BOTTOM,
    //             )
    //             await mutate()

    //         })
    //         .catch((error) => {
    //             ToastAndroid.showWithGravity(
    //                 "Delete failed",
    //                 ToastAndroid.SHORT,
    //                 ToastAndroid.BOTTOM,
    //             )
    //             console.log(error)
    //         })
    // }
    

    return (
        <div className="relative h-full">
            <div className="flex flex-row justify-between px-4 pt-4 pb-3">
                <div className="flex flex-row items-center ">
                    <Checkbox
                        color="secondary"
                        isSelected={
                            selectedItems.length === cartCourses?.length
                        }
                        onValueChange={handleDispatchSelectAll}
                    />
                    <div className="text-base text-slate-400">Select All</div>
                </div>
                {/* <div
                    onClick={onPressOpenConfirmDeleteModal}
                    className="flex flex-row items-center mr-1"
                >
                    <div className="text-base text-slate-400">Delete</div>
                </div> */}
            </div>
            <div className="flex pl-4 mb-60  ">
                {cartCourses?.map((item) => (
                    <div className="flex flex-row" key={item.cartCourseId}>
                        <div className="flex justify-center items-start rounded-lg">
                            <Checkbox
                                color="secondary"
                                isSelected={
                                    selectedItems.includes(
                                        item.cartCourseId
                                    )
                                }
                                onValueChange={() => {
                                    handleDispatchSelectItems(
                                        item.cartCourseId
                                    )
                                }}
                            />
                        </div>
                        <CourseCard  {...item.course} />
                    </div>
                ))}
              
            </div>

            <div className="absolute h-full max-h-44 left-0 bottom-0 px-4 w-full pt-4 pb-4 flex border-t border-t-slate-200">
                <div className="w-full flex flex-row justify-between py-1">
                    <div className="text-sm text-slate-500">SubTotal</div>
                    <div className="text-sm font-semibold leading-6">
                        {getTotalPrice.price} STARCI
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between pb-1">
                    <div className="text-sm  text-slate-500">Discount </div>
                    <div className="text-sm font-semibold leading-6">
                        {getTotalPrice.price - getTotalPrice.discountPrice}{" "}
                        STARCI
                    </div>
                </div>
                <div className="w-full flex flex-row justify-between pb-1">
                    <div className="text-base">Total </div>
                    <div className="text-lg font-bold leading-6">
                        {getTotalPrice.discountPrice} STARCI
                    </div>
                </div>
                <div className="w-full pt-2">
                    <Button
                        color="secondary"
                        className="py-1 text-3xl"
                        content="Checkout"
                        disabled={selectedItems.length === 0}
                        // onPress={()=> handleCheckout()}
                    />
                </div>
            </div>
            {/* <ConfirmDeleteModalRef
                ref={confirmDeleteModalRef}
                title="Delete item in cart ? "
                content="Are you sure delete item in cart"
                onDeletePress={handleDelete}
            /> */}
        </div>
    )
}


export default Cart