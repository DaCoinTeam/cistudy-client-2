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
    const { courseId, verifyStatus, sections, title, description, courseCategories, courseTargets, previewVideoId, thumbnailId, price } = { ...data }
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

    const checkCategoryLevels = () => {
        if (!courseCategories) return false
        const hasLevel0 = courseCategories.some(item => item.category.level === 0)
        const hasLevel1 = courseCategories.some(item => item.category.level === 1)
        const hasLevel2 = courseCategories.some(item => item.category.level === 2)

        return hasLevel0 && hasLevel1 && hasLevel2
    }

    const allRequirementsMet = () => {
        return (
            // Title is longer than 20 characters
            (title && title.length > 20) &&

            // Description is longer than 100 characters
            (description && description.length > 100) &&

            // Have at least 1 category, 1 subcategory, 1 topic
            checkCategoryLevels() &&

            // Must have thumbnail and video preview
            (thumbnailId && previewVideoId) &&

            // Have at least 2 targets
            (courseTargets && courseTargets.length > 1) &&

            // Have at least 1 section and 1 content in each section
            (sections &&
                sections.length > 0 &&
                sections.every(section => section.contents.length > 0)) &&

            // Lesson in each section must have a video
            (sections &&
                sections.length > 0 &&
                sections.every(section =>
                    section.contents.length > 0 &&
                    section.contents.every(content => content.lesson?.lessonVideoId)
                )) &&

            // Have price
            !!price
        )
    }

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
            isDisabled={verifyStatus === VerifyStatus.Approved || verifyStatus === VerifyStatus.Pending || !allRequirementsMet()}
        >
            {verifyStatus === VerifyStatus.Approved ? "Published" : verifyStatus === VerifyStatus.Pending ? "Waiting" : "Publish"}
        </Button>
    )
}
