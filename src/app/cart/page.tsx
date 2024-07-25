"use client"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { Button, Checkbox, Link, Spacer } from "@nextui-org/react"
import { deleteFromCart } from "@services"
import { useContext, useMemo, useRef } from "react"
import { ToastType } from "../_components"
import { RootContext } from "../_hooks"
import {
    ConfirmDeleteModalRef,
    ConfirmDeleteModalRefSelectors,
} from "../_shared"
import { CartItem } from "./_components/CartItem"
import { useCartReducer } from "./_hooks/useCartReducer"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

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
        <div className='relative h-full flex flex-col mx-auto max-w-[1260px] mt-12 '>
            <div className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl'>
        Shopping Cart
            </div>
            <Spacer y={6} />

            <div className='grid grid-cols-7 gap-6'>
                <div className='mx-auto col-span-5 '>
                    <div className='col-span-2 flex flex-col mr-6 '>
                        <div className='flex items-center w-full justify-between px-4 py-2 rounded-lg border  border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 '>
                            <div className='flex items-center '>
                                <Checkbox
                                    size='lg'
                                    color='primary'
                                    classNames={
                                        {
                                            base: "border-slate-700 dark:border-slate-200"
                                        }
                                    }
                                    isSelected={selectedItems.length === cartCourses?.length}
                                    onValueChange={handleDispatchSelectAll}
                                />
                                <span className='text-slate-700 dark:text-slate-200'>All Products</span>
                            </div>
                            <div className='flex items-end'>
                                <Button
                                    variant='light'
                                    color='danger'
                                    onPress={onConfirmDeleteModalOpen}
                                    startContent={<XMarkIcon className='w-5 h-5' />}
                                    aria-label='Delete'
                                >
                  Remove
                                </Button>
                            </div>
                        </div>
                        <Spacer y={4} />
                        <div className='space-y-4'>
                            {cartCourses?.map((item) => (
                                <div
                                    className='flex flex-row p-4 py-6 rounded-lg border border-gray-300 bg-white  shadow-sm dark:border-gray-700 dark:bg-gray-800'
                                    key={item.cartCourseId}
                                >
                                    <div className='flex justify-center items-center rounded-lg'>
                                        <Checkbox
                                            size='lg'
                                            color='primary'
                                            isSelected={selectedItems.includes(item.cartCourseId)}
                                            onValueChange={() => {
                                                handleDispatchSelectItems(item.cartCourseId)
                                            }}
                                        />
                                    </div>
                                    <CartItem {...item.course} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='mx-auto mt-5 col-span-2  space-y-6 lg:mt-0 lg:w-full'>
                    <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6'>
                        <div className='text-xl font-semibold text-gray-900 dark:text-white'>
              Order summary
                        </div>

                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <dl className='flex items-center justify-between gap-4'>
                                    <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>
                    Item{" "}
                                    </dt>
                                    <dd className='text-base font-medium text-gray-900 dark:text-white'>
                                        {selectedItems.length}
                                    </dd>
                                </dl>

                                <dl className='flex items-center justify-between gap-4'>
                                    <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>
                    Original price
                                    </dt>
                                    <dd className='text-base font-medium text-gray-900 dark:text-white'>
                                        {" "}
                                        {getTotalPrice.price} STARCI
                                    </dd>
                                </dl>

                                <dl className='flex items-center justify-between gap-4'>
                                    <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>
                    Savings
                                    </dt>
                                    <dd className='text-base font-medium text-green-600'>
                    -{getTotalPrice.price - getTotalPrice.discountPrice} STARCI
                                    </dd>
                                </dl>
                            </div>

                            <dl className='flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700'>
                                <dt className='text-base font-bold text-gray-900 dark:text-white'>
                  Total
                                </dt>
                                <dd className='text-base font-bold text-gray-900 dark:text-white'>
                                    {getTotalPrice.discountPrice} STARCI
                                </dd>
                            </dl>
                        </div>

                        <Button
                            color='primary'
                            disabled={selectedItems.length === 0}
                            // onPress={()=> handleCheckout()}
                            className='flex w-full items-center justify-center rounded-lg 700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                        >
              Proceed to Checkout
                        </Button>

                        <div className='flex items-center justify-center gap-2'>
                            <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                                {" "}
                or{" "}
                            </span>
                            <Link
                                title=''
                                className='inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500'
                            >
                Continue Shopping
                                <ArrowRightIcon className="w-4 h-4"/>
                            </Link>
                        </div>
                    </div>
                    <div className='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6'>
                        <form className='space-y-4'>
                            <div>
                                <label
                                    htmlFor='voucher'
                                    className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    {" "}
                  Do you have a voucher or gift card?{" "}
                                </label>
                                <input
                                    type='text'
                                    id='voucher'
                                    className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500'
                                    placeholder=''
                                    required
                                />
                            </div>
                            <Button
                                type='submit'
                                className='flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                            >
                Apply Code
                            </Button>
                        </form>
                    </div>

                    <ConfirmDeleteModalRef
                        ref={confirmDeleteModalRef}
                        title='Delete item in cart ? '
                        content='Are you sure delete item in cart'
                        onDeletePress={handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}

export default Cart
