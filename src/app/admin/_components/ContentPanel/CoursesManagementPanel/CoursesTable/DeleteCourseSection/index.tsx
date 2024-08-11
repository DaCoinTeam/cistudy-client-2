import React, { useContext, useRef } from "react"
import useSWRMutation from "swr/mutation"
import { deleteAdminCourse } from "../../../../../../../services/server"
import { ConfirmDeleteModalRef, ConfirmDeleteModalRefSelectors } from "../../../../../../_shared"
import { TrashIcon } from "@heroicons/react/24/outline"
import { RootContext } from "../../../../../../_hooks"
import { CoursesManagementPanelContext } from "../../CoursesManagementPanelProvider"
import { ToastType } from "../../../../../../_components"
import { Link } from "@nextui-org/react"

interface DeleteCourseSectionProps {
    courseId: string
}
export const DeleteCourseSection = ({ courseId }: DeleteCourseSectionProps) => {
    const { trigger, isMutating } = useSWRMutation("DELETE_COURSE", async () => {
        const { message } = await deleteAdminCourse({
            data: {
                courseId
            }
        })
        await mutate()
        notify!({
            data: {
                message
            },
            type: ToastType.Success
        } )
    })

    const onDeletePress = async () => {
        await trigger()
    }

    const confirmDeleteModalRef = useRef<ConfirmDeleteModalRefSelectors | null>(
        null
    )
    const onConfirmDeleteModalOpen = () =>
        confirmDeleteModalRef.current?.onOpen()

    const { notify } = useContext(RootContext)!
    const  { swrs: { coursesSwr : { mutate }}} = useContext(CoursesManagementPanelContext)!

    return (
        <div>
            <Link as="button" onPress={onConfirmDeleteModalOpen} className="w-5 h-5" color="danger">
                <TrashIcon/>
            </Link>
            <ConfirmDeleteModalRef
                ref={confirmDeleteModalRef}
                title="You are going to delete a course in cart ?"
                content="Are you sure to delete this course?"
                onDeletePress={async () => await onDeletePress()}
                isLoading={isMutating}
            />
        </div>
    )
}