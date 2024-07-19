"use client"
import { Button, Checkbox, Divider, Spacer } from "@nextui-org/react"
import React, { useContext, useMemo, useRef } from "react"
import { RootContext } from "../_hooks"
import { useCartReducer } from "./_hooks/useCartReducer"
import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
    CourseCardHorizontal,
} from "../_shared"
import { deleteFromCart } from "@services"
import { ToastType } from "../_components"
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline"

const Cart = () => {
    const [state, dispatch] = useCartReducer()
    const { selectedItems } = state

    const { swrs, notify } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile, mutate } = profileSwr
    const { cart } = { ...profile }
    const { cartCourses } = { ...cart }

    const getId = () => {
        if (!cartCourses) return []
        return cartCourses.map((cartCourse) => cartCourse.cartCourseId)
    }

    const getTotalPrice = useMemo(() => {
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

    const handleDelete = async () => {
        const res = await deleteFromCart({
            data: { cartCourseIds: selectedItems },
        })
        if (res.others) {
            await mutate()
      notify!({
          data: {
              message: res.message,
          },
          type: ToastType.Success,
      })
        } else {
      notify!({
          data: {
              error: res.message,
          },
          type: ToastType.Error,
      })
        }
    }

    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

    return (
        <div className='relative h-full flex flex-col mx-auto max-w-[1080px] mt-16 '>
            <div className='grid grid-cols-3 gap-12'>
                <div className='col-span-2 flex flex-col '>
                    <div className='flex justify-between w-full'>
                        <div className='flex flex-row items-center '>
                            <Checkbox
                                size='lg'
                                color='secondary'
                                isSelected={selectedItems.length === cartCourses?.length}
                                onValueChange={handleDispatchSelectAll}
                            />
                            <div className='text-base text-slate-400'>Select All</div>
                        </div>
                        <Button
                            isIconOnly
                            variant='light'
                            color='danger'
                            onPress={onConfirmDeleteModalOpen}
                            aria-label='Delete'
                        >
                            <TrashIcon className='w-5 h-5' />
                        </Button>
                    </div>
                    <Spacer y={1} />
                    <Divider />
                    <Spacer y={4} />
                    {cartCourses?.map((item) => (
                        <div className='flex flex-row space-y-8' key={item.cartCourseId}>
                            <div className='flex justify-center items-center rounded-lg'>
                                <Checkbox
                                    size='lg'
                                    color='secondary'
                                    isSelected={selectedItems.includes(item.cartCourseId)}
                                    onValueChange={() => {
                                        handleDispatchSelectItems(item.cartCourseId)
                                    }}
                                />
                            </div>
                            <CourseCardHorizontal {...item.course} />
                        </div>
                    ))}
                </div>

                <div className='col-span-1 px-4 w-full  flex-col pt-4 pb-4 flex '>
                    <div>
                        <div className='text-3xl tracking-tight font-bold text-primary mb-6'>
              Cart Summary
                        </div>
                        <div className='text-xl tracking-tight font-semibold mb-6 text-slate-500'>
                            {selectedItems.length} items
                        </div>
                    </div>
                    <Spacer y={4} />

                    <Divider />
                    <Spacer y={4} />

                    <div className='w-full flex flex-row justify-between py-1'>
                        <div className='text-lg tracking-tight font-semibold  mb-6'>
              SubTotal
                        </div>
                        <div className='font-semibold text-primary leading-6'>
                            {getTotalPrice.price} STARCI
                        </div>
                    </div>
                    <div className='w-full flex flex-row justify-between pb-1'>
                        <div className='text-lg tracking-tight font-semibold mb-6'>
              Discount{" "}
                        </div>
                        <div className='font-semibold text-primary leading-6'>
                            {getTotalPrice.price - getTotalPrice.discountPrice} STARCI
                        </div>
                    </div>
                    <div className='w-full flex flex-row justify-between pb-1'>
                        <div className='text-xl tracking-tight font-bold text-primary mb-6'>
              Total{" "}
                        </div>
                        <div className='text-xl font-bold text-primary leading-6'>
                            {getTotalPrice.discountPrice} STARCI
                        </div>
                    </div>
                    <div className='w-full pt-2'>
                        <Button
                            color='secondary'
                            className='py-1 w-full font-semibold'
                            disabled={selectedItems.length === 0}
                            startContent={<CheckIcon className='w-5 h-5' />}
                            // onPress={()=> handleCheckout()}
                        >
              Checkout
                        </Button>
                    </div>
                </div>
            </div>

            <ConfirmDeleteModalRef
                ref={confirmDeleteModalRef}
                title='Delete item in cart ? '
                content='Are you sure delete item in cart'
                onDeletePress={handleDelete}
            />
        </div>
    )
}

export default Cart
