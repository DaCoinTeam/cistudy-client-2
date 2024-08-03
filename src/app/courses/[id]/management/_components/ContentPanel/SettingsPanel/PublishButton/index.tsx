import { Button } from "@nextui-org/react"
import React, { useContext } from "react"
import useSWRMutation from "swr/mutation"
import { VerifyStatus } from "@common"
import { publishCourse } from "@services"
import { ManagementContext } from "../../../../_hooks"
import { RootContext } from "../../../../../../../_hooks"
import { ToastType } from "../../../../../../../_components"

export const PublishButton = () => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data, mutate } = courseManagementSwr
    const { courseId, verifyStatus } = { ...data }
    const { notify } = useContext(RootContext)!

    const { trigger, isMutating } = useSWRMutation(
        "PUBLISH",
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
            const { message } = await publishCourse({
                data: arg,
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

    return (
        <Button
            color="primary"
            className="w-fit"
            onPress={async () => {
                if (!courseId) return
                await trigger({
                    courseId,
                })
            }}
            isLoading={isMutating}
            isDisabled={verifyStatus === VerifyStatus.Approved || verifyStatus === VerifyStatus.Pending}
        >
            {(verifyStatus === VerifyStatus.Approved || verifyStatus === VerifyStatus.Pending) ? "Published" : "Publish"}
        </Button>
    )
}
