"use client"
import { Button } from "@nextui-org/react"
import { PlusIcon } from "lucide-react"
import React, { useContext } from "react"
import { createCourse } from "@services"
import { useRouter } from "next/navigation"
import useSWRMutation from "swr/mutation"
import { RootContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../_components"
import { ErrorResponse } from "@common"

export const CreateCourseButton = () => {
    const router = useRouter()
    const {notify} = useContext(RootContext)!

    const createCourseSwrMutation = useSWRMutation(
        "CREATE_COURSE",
        async() => {
            try {
                const {others} = await createCourse()
                router.push(`/courses/${others.courseId}/management`)
            } catch (ex) {
                const {message} = ex as ErrorResponse
                notify!({
                    data: {
                        message: message as string
                    },
                    type: ToastType.Success
                })
            }
        }
    )

    const {trigger, isMutating} = createCourseSwrMutation

    const onPress = async() => {
        trigger()
    }

    return (
        <Button
            onPress={onPress}
            className="bg-content2"
            startContent={isMutating? "" : <PlusIcon size={20} strokeWidth={3/2} />}
            isLoading={isMutating}
        >
            {isMutating? "Creating" : "Create"}
        </Button>
    )
}
