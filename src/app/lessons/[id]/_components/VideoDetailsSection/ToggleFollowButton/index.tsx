import { Button } from "@nextui-org/react"
import { UserMinus2Icon, UserPlus2Icon } from "lucide-react"
import React, { useContext } from "react"
import { toggleFollow } from "@services"
import { LessonDetailsContext } from "../../../_hooks"
import { RootContext } from "../../../../../_hooks"

export const ToggleFollowButton = () => {
    const { swrs } = useContext(LessonDetailsContext)!
    const { lessonsSwr } = swrs
    const { data: lesson , mutate } = lessonsSwr

    const { swrs : rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile } = profileSwr

    const { section } = { ...lesson }
    const { course } = { ...section }
    const { creator } = { ...course }

    const onPress = async () => {
        if (!creator) return
        const { accountId } = creator

        await toggleFollow({
            data: {
                followedAccountId: accountId,
            },
        })
        
        await mutate()
    }

    if (profile?.accountId === creator?.accountId) return null

    return (
        <Button
            onPress={onPress}
            color="primary"
            startContent={
                creator?.followed ? (
                    <UserMinus2Icon className="21" strokeWidth={3/2} />
                ) : (
                    <UserPlus2Icon className="21" strokeWidth={3/2} />
                )
            }
        >
            {creator?.followed ? "Unfollow" : "Follow"}
        </Button>
    )
}