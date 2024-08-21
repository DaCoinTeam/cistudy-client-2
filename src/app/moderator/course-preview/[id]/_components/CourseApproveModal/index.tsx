"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Button,
    ModalFooter,
    Textarea,
    Spacer,
} from "@nextui-org/react"

import { forwardRef, useContext, useImperativeHandle } from "react"
import { CourseApproveModalContext, CourseApproveModalProvider } from "./CourseApproveModalProvider"
import { VerifyStatus } from "@common"
import { ManagementContext } from "../../_hooks"

export interface CourseApproveModalRefSelectors {
    onOpen: () => void;
}

const WrappedCourseApproveModalRef = forwardRef<
    CourseApproveModalRefSelectors | null
>((_, ref) => {
    const {swrs} = useContext(ManagementContext)!
    const {courseManagementSwr} = swrs
    const {data: course} = courseManagementSwr
    const {formik} = useContext(CourseApproveModalContext)!
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    useImperativeHandle(ref, () => ({
        onOpen
    }))

    const handleSubmit = (verifyStatus: VerifyStatus) => {
        if (verifyStatus === VerifyStatus.Approved) {
            formik.setFieldValue("verifyStatus", VerifyStatus.Approved)
        }

        if (verifyStatus === VerifyStatus.Rejected) {
            formik.setFieldValue("verifyStatus", VerifyStatus.Rejected)
        }
        formik.handleSubmit()
    }

    return (
        <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {() => (
                    <div>
                        <ModalHeader className="p-4 pb-2 text-2xl">Resolve</ModalHeader>
                        <ModalBody className="p-4">
                            <Textarea
                                classNames={{
                                    inputWrapper: "input-input-wrapper"
                                }}
                                label="Feedback"
                                id="note"
                                type="string"
                                isRequired
                                labelPlacement="outside"
                                placeholder="Input feedback here"
                                value={formik.values.note}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!(formik.touched.note && formik.errors.note)}
                                errorMessage={formik.touched.note && formik.errors.note}
                            />
                            {
                                course?.previousFeedback? (
                                    <div>
                                        <div className="text-xs text-foreground-400">This course has been rejected before with the following feedback:</div>
                                        <Spacer y={1.5} />
                                        <Textarea
                                            isReadOnly
                                            value={course.previousFeedback}
                                        />
                                    </div>
                                ) : <></>
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                variant="bordered"
                                onPress={() => handleSubmit(VerifyStatus.Rejected)}
                                isLoading={formik.values.verifyStatus === VerifyStatus.Rejected && formik.isSubmitting}
                            >
                                Reject
                            </Button>
                            <Button
                                color="primary"
                                onPress={() => handleSubmit(VerifyStatus.Approved)}
                                isLoading={formik.values.verifyStatus === VerifyStatus.Approved && formik.isSubmitting}
                            >
                                Approve
                            </Button>
                        </ModalFooter>
                    </div>
                )}
            </ModalContent>
        </Modal>
    )
})

export const CourseApproveModalRef = forwardRef<
CourseApproveModalRefSelectors | null
>((_, ref) => {
    return (
        <CourseApproveModalProvider>
            <WrappedCourseApproveModalRef ref={ref} />
        </CourseApproveModalProvider>
    )
})