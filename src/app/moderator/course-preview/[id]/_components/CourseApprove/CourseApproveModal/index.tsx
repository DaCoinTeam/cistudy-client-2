"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Input,
    Button,
} from "@nextui-org/react"

import { forwardRef, useContext, useImperativeHandle, useRef } from "react"
import { CourseApproveModalContext, CourseApproveModalProvider } from "./CourseApproveModalProvider"
import { ToastRef, ToastRefSelectors, ToastType } from "../../../../../../_components"
import { useParams } from "next/navigation"
import { verifyCourse } from "@services"

export interface CourseApproveModalRefSelectors {
    onOpen: () => void;
    handleSaveApproveStatus: (status: string) => void;
}

const WrappedCourseApproveModalRef = forwardRef<
    CourseApproveModalRefSelectors | null
>((props, ref) => {
    const params = useParams()
    const toastRef = useRef<ToastRefSelectors>(null)
    const courseId = params.id as string
    const {reducer} = useContext(CourseApproveModalContext)!
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const [state, dispatch] = reducer
    const { courseApproveStatus, note } = state

    const handleSaveApproveStatus = (status : string) => {
        dispatch({ type: "SET_COURSE_APPROVE_STATUS", payload: status})
    }

    useImperativeHandle(ref, () => ({
        onOpen,
        handleSaveApproveStatus
    }))

    const fetchVerifyCourse = () => {
        verifyCourse({
            data: {
                courseId,
                note,
                verifyStatus: courseApproveStatus
            }
        }).then(() => {
            toastRef.current?.notify({
                data: {
                    message: `Course has been ${courseApproveStatus} successfully!`
                },
                type: ToastType.Success
            })
            onOpenChange()
        }).catch((err) => {
            toastRef.current?.notify({
                data: {
                    error: err.message
                },
                type: ToastType.Error
            })
        })
    }

    // const verifyCourseSwr = useSWR(
    //     ["VERIFY_COURSE"],
    //     fetchVerifyCourse
    // )

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
            <ModalContent>
                {() => (
                    <div>
                        <ModalHeader className="p-4 pb-2 text-2xl justify-center">Note</ModalHeader>
                        <ModalBody className="p-4">
                            <Input
                                classNames={{
                                    inputWrapper: "input-input-wrapper"
                                }}
                                label="Note"
                                id="note"
                                type="string"
                                isRequired
                                labelPlacement="outside"
                                placeholder="Input note here"
                                onChange={(e) => dispatch({ type: "SET_NOTE", payload: e.target.value })}
                            />
                            <Button
                                color="primary"
                                className="w-full mt-4"
                                onClick={() => fetchVerifyCourse()}
                            >
                                        Save
                            </Button>
                        </ModalBody>
                    </div>
                )}
            </ModalContent>
            <ToastRef ref={toastRef}/>
        </Modal>
    )
})

export const CourseApproveModalRef = forwardRef<
CourseApproveModalRefSelectors | null
>((props, ref) => {

    return (
        <CourseApproveModalProvider>
            <WrappedCourseApproveModalRef ref={ref} />
        </CourseApproveModalProvider>
    )
})