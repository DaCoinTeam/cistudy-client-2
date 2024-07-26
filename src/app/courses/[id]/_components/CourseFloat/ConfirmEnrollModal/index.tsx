
import React, { useContext } from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Spacer,
} from "@nextui-org/react"
import { ClipboardPenLineIcon } from "lucide-react"
import { CourseDetailsContext } from "../../../_hooks"
import { RootContext } from "../../../../../_hooks"
import { enrollCourse } from "@services"
import { ToastType } from "../../../../../_components"
import useSWRMutation from "swr/mutation"

export const ConfirmEnrollModal = () => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course, mutate } = courseSwr
    const { courseId, price, enableDiscount, discountPrice } = {
        ...course,
    }

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data } = profileSwr
    const { balance } = { ...data }

    const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()

    const getPrice = () => (enableDiscount ? discountPrice : price) ?? 0

    const { notify } = useContext(RootContext)!

    const balanceLeft = (balance ?? 0) - getPrice()

    const { trigger, isMutating } = useSWRMutation(
        "ENROLL",
        (
            _,
            {
                arg,
            }: {
        arg: {
          courseId: string;
        };
      }
        ) =>
            enrollCourse({
                data: {
                    courseId: arg.courseId,
                },
            })
    )

    return (
        <>
            <Button
                startContent={
                    <ClipboardPenLineIcon height={20} width={20} strokeWidth={3 / 2} />
                }
                className="font-semibold"
                onPress={onOpen}
                color="primary"
                fullWidth
            >
        Enroll
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="p-4 pb-2">Enroll</ModalHeader>
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
                                <div className="text-sm">
                  Are you sure to enroll this course?
                                </div>
                                <Spacer y={4} />
                                <div className="text-sm flex gap-2 items-center">
                                    <div>Paid amount:</div>
                                    <span className="text-primary font-semibold">
                                        {getPrice()} STARCI
                                    </span>
                                </div>
                                <div className="text-sm flex gap-2 items-center">
                                    <div> Your balance:</div>
                                    <span className="text-primary font-semibold">
                                        {balance} STARCI
                                    </span>
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
            </Modal>
        </>
    )
}