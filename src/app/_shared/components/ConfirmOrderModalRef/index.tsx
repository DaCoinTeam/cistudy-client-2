"use client"
import {  CourseEntity, formatNouns } from "@common"
import {
    Button,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ScrollShadow,
    Spacer,
    useDisclosure,
    User,
} from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import { forwardRef, useContext, useImperativeHandle } from "react"
import { RootContext } from "../../../_hooks"

export interface ConfirmOrderModalRefProps {
  isLoading?: boolean;
  courses: Array<CourseEntity>;
  onCheckoutPress?: () => Promise<void>;
  isMutating?: boolean;
  originalPrice: number;
  discountPrice: number;
}

export interface ConfirmOrderModalRefSelectors {
  onOpen: () => void;
}

export const ConfirmOrderModalRef = forwardRef<
  ConfirmOrderModalRefSelectors | null,
  ConfirmOrderModalRefProps
>((props, ref) => {
    const { courses, originalPrice, discountPrice, onCheckoutPress, isMutating } = props
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen,
    }))
    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data } = profileSwr
    const { balance,  avatarUrl, avatarId, username, kind, numberOfFollowers,  } = { ...data }
    const balanceLeft = balance! - discountPrice
    const handlePress = async () => {
        if(onCheckoutPress) await onCheckoutPress()
        onClose()
    }
    return (
        
        <Modal isOpen={isOpen} scrollBehavior="inside"  onOpenChange={onOpenChange} size='xl'>
            <ScrollShadow className="h-[420px] w-[360px]" >
                <ModalContent>
                    <>
                        <ModalHeader className='p-4 pb-0'>Billing Summary</ModalHeader>
                        <ModalBody className='p-4'>
                            <div className="">
                                <div className="mb-1 text-lg font-medium">Customer</div>
                                <User classNames={{
                                    name: "text-sm line-clamp-1",
                                    description: "w-[70px]"
                                }} avatarProps={{
                                    src: getAvatarUrl({
                                        avatarUrl: avatarUrl,
                                        avatarId: avatarId,
                                        kind: kind
                                    })
                                }} name={username} description={formatNouns(numberOfFollowers, "follower")}
                                /> 
                            </div>
                            <Divider />
                            <div className=" text-lg font-medium">Course</div>
                            <div className="w-full">
                                {courses.map((course, index) => {
                                    return (
                                        <div key={course.courseId} className="mb-2 grid grid-cols-4">
                                            <div className="flex col-span-3">
                                                <div>{index + 1}.</div>
                                                <Spacer x={2}   />
                                                <div className=""> {course?.title} </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="text-primary">{course?.enableDiscount ? discountPrice : course?.price} STARCI</div>
                                                {course?.enableDiscount && <div className="text-sm text-foreground-400 line-through ms-1">{course?.price} STARCI</div>}
                                            </div>
                                           
                                        </div>
                                    )
                                })}
                            </div>
                            <Divider />  
                            <div className='flex  w-full'>
                                <div className='w-full' >
                                    <div className='text-lg font-medium'>
                      Summary
                                    </div>
                                    <div className="w-full">
                                        <div className=" w-full" >
                                            <div className='flex items-center justify-between gap-4'>
                                                <div className='text-base font-normal text-gray-500 dark:text-gray-400'>
                            Item{" "}
                                                </div>
                                                <div className='text-base text-gray-900 dark:text-white'>
                                                    {formatNouns(courses.length, "item")}
                                                </div>
                                            </div>
                                            <Spacer y={1} />

                                            <div className='flex items-center justify-between gap-4'>
                                                <div className='text-base font-normal text-gray-500 dark:text-gray-400'>
                            Original price
                                                </div>
                                                <div className='text-base  text-gray-900 dark:text-white'>
                                                    {originalPrice} STARCI
                                                        
                                                </div>
                                            </div>
                                            <Spacer y={1} />

                                            <div className='flex items-center justify-between gap-4'>
                                                <div className='text-base font-normal text-gray-500 dark:text-gray-400'>
                            Savings
                                                </div>
                                                <dd className='text-base  text-green-600'>
                                                    -{originalPrice - discountPrice} STARCI
                                                </dd>
                                            </div>
                                            <Spacer y={2} />

                                        </div>

                                        <div className='flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700'>
                                            <div className='text-base font-semibold text-gray-900 dark:text-white'>
                          Total
                                            </div>
                                            <div className='text-base font-semibold text-gray-900 dark:text-white'>
                                                {discountPrice} STARCI
                                            </div>
                                        </div>                                   
                                    </div>
                                </div>
                            </div>
                            <div>
                                {balanceLeft < 0 ? (
                                    <div className="bg-danger/20 p-4 rounded-md mt-4">
                                        <div className='text-lg  '>
                        Sorry, your balance are not enough.
                                        </div>
                                        <Spacer y={4} />
                                        <div className='text-sm flex gap-2 items-center'>
                                            <div>Paid amount:</div>
                                            <span className=' font-semibold'>
                                                {discountPrice} STARCI
                                            </span>
                                        </div>
                                        <div className='text-sm flex gap-2 items-center'>
                                            <div>Your balance:</div>
                                            <span className=' font-semibold'>
                                                {balance} STARCI
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </ModalBody>
                        <ModalFooter className='p-4 pt-2'>
                            <Button
                                isLoading={isMutating}
                                color='primary'
                                onPress={handlePress}
                                isDisabled={balanceLeft < 0}
                            >
                Checkout
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </ScrollShadow>
        </Modal>
    )
})
