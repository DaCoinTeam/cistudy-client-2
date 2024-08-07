import { Button } from "@nextui-org/react"
import React, { useContext, useRef } from "react"
import { ManagementContext } from "../../../../_hooks"
import { VerifyStatus } from "@common"
import useSWRMutation from "swr/mutation"
import { deleteCourse, DeleteCourseInput } from "@services"
import { RootContext } from "../../../../../../../_hooks"
import { ToastType } from "../../../../../../../_components"
import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors } from "../../../../../../../_shared"
import { useRouter } from "next/navigation"

export const RemoveButton = () => {
    const router = useRouter()
    const deleteModalRef = useRef<ConfirmDeleteModalRefSelectors>(null)
    const {notify} = useContext(RootContext)!
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data } = courseManagementSwr
    const { verifyStatus, courseId } = { ...data }

    const deleteCourseSwrMutation = useSWRMutation(
        "DELETE_COURSE",
        async (_: string, { arg }: { arg: DeleteCourseInput }) => {
            const {message} = await deleteCourse(arg)
            notify!({
                data: {
                    message
                },
                type: ToastType.Success
            })
            router.push("/management")
        }
    )

    const {trigger, isMutating} = deleteCourseSwrMutation
    
    return (
        <div>
            <Button
                isDisabled={verifyStatus === VerifyStatus.Approved || verifyStatus === VerifyStatus.Pending}
                color="danger"
                className="w-fit"
                variant="bordered"
                onPress={() => deleteModalRef.current?.onOpen()}
            >
                Delete
            </Button>
            <ConfirmDeleteModalRef ref={deleteModalRef} title="Delete Course" content="Continue to delete this course?" isLoading={isMutating} onDeletePress={() => trigger({data: {courseId: courseId?? ""}})} />
        </div>
    )
}
