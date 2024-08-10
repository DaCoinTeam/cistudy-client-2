
import {
    Button
} from "@nextui-org/react"
import { enrollCourse } from "@services"
import { ClipboardPenLineIcon } from "lucide-react"
import { useContext, useRef } from "react"
import useSWRMutation from "swr/mutation"
import { ToastType } from "../../../../../_components"
import { RootContext } from "../../../../../_hooks"
import { ConfirmOrderModalRef, ConfirmOrderModalRefSelectors } from "../../../../../_shared/components/ConfirmOrderModalRef"
import { CourseDetailsContext } from "../../../_hooks"

export const ConfirmEnrollModal = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course, mutate } = courseSwr
    const { courseId, price, enableDiscount, discountPrice } = {
        ...course,
    }

    const getPrice = () => (enableDiscount ? discountPrice : price) ?? 0

    const { notify } = useContext(RootContext)!

    const { trigger, isMutating } = useSWRMutation(
        "ENROLL",
        async (
            _,
            {
                arg,
            }: {
        arg: {
          courseId: string;
        };
      }
        ) => {
            const { message } = await enrollCourse({
                data: {
                    courseId: arg.courseId,
                },
            })
    
            await mutate()

            notify!({
                data: {
                    message,
                },
                type: ToastType.Success,
            })
        }        
    )

    const confirmOrderModalRef = useRef<ConfirmOrderModalRefSelectors | null>(
        null
    )
    const onConfirmOrderModalOpen = () =>
        confirmOrderModalRef.current?.onOpen()
    

    const handleEnroll = async () => {
     
        if (!courseId) return
        await trigger({
            courseId,
        })         
    }
    return (
        <>
            <Button
                startContent={
                    <ClipboardPenLineIcon height={20} width={20} strokeWidth={3 / 2} />
                }
                onPress={onConfirmOrderModalOpen}
                color="primary"
                fullWidth
            >
        Enroll
            </Button>
            {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2 text-xl">Enroll</ModalHeader>
                    <ModalBody className="p-4">
                        {balanceLeft < 0 ? (
                            <div>
                                <div className="text-sm">
                  Sorry, your balance are not enough.
                                </div>
                                <Spacer y={4} />
                                <div className="text-sm flex gap-2 items-center">
                                    <div>Paid amount:</div>
                                    <span className="text-primary font-semibold">
                                        {getPrice()} STARCI
                                    </span>
                                </div>
                                <div className="text-sm flex gap-2 items-center">
                                    <div>Your balance:</div>
                                    <span className="text-primary font-semibold">
                                        {balance} STARCI
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div>    
                                <div className="text-sm  w-[300px] flex gap-2 items-center">
                                    <div className="w-[120px]"> Your balance</div>
                                    <span>
                                        {balance} STARCI
                                    </span>
                                </div>
                                <Spacer y={1}/>
                                <div className="text-sm flex gap-2 items-center">
                                    <div className="w-[120px]">You pay</div>
                                    <span className="text-primary text-xl font-semibold">
                                        {getPrice()} STARCI
                                    </span>
                                </div>
                                <Spacer y={1}/>
                                <Divider/>
                                <Spacer y={1}/>
                                <div className="text-sm flex gap-2 items-center">
                                    <div className="w-[120px]"> Your balance left</div>
                                    <span>
                                        {(balance ?? 0) - getPrice()} STARCI
                                    </span>
                                </div>
                                <Spacer y={4}/>
                                <div className="flex gap-2 items-center">
                                    <ExclamationCircleIcon className="w-4 h-4 min-w-4 text-warning"/>
                                    <div className="text-xs text-warning">
                                        {"Are you certain about enrolling in this course? You won't be able to change your mind once you're enrolled."}
                                    </div>
                                </div>
                            </div>
                        )} 
                    </ModalBody>
                    <ModalFooter className="p-4 pt-2">
                        <Button
                            isLoading={isMutating}
                            isDisabled={(balanceLeft < 0) || isMutating}
                            color="primary"
                            onPress={async () => {
                                if (!courseId) return
                                const { message } = await trigger({
                                    courseId,
                                })

                notify!({
                    data: {
                        message,
                    },
                    type: ToastType.Success,
                })

                await mutate()

                onClose()
                            }}
                        >
              Enroll
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
            <ConfirmOrderModalRef
                ref={confirmOrderModalRef}
                courses={course ? [course] : []}
                originalPrice={price ?? 0}
                discountPrice={getPrice()}
                onCheckoutPress={handleEnroll}
                isMutating={isMutating}
            />
        </>
    )
}