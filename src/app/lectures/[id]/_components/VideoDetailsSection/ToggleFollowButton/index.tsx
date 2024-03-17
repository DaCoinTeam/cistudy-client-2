import { Button } from "@nextui-org/react"
import { UserMinus2Icon, UserPlus2Icon } from "lucide-react"
import React, { useContext } from "react"
import { toggleFollow } from "@services"
import { LectureDetailsContext } from "../../../_hooks"
import { RootContext } from "../../../../../_hooks"

export const ToggleFollowButton = () => {
    const { swrs } = useContext(LectureDetailsContext)!
    const { lecturesSwr } = swrs
    const { data: lecture , mutate } = lecturesSwr

    const { swrs : rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile } = profileSwr

    const { section } = { ...lecture }
    const { course } = { ...section }
    const { creator } = { ...course }

    const onPress = async () => {
        if (!creator) return
        const { userId } = creator

        await toggleFollow({
            data: {
                followedUserId: userId,
            },
        })
        
        await mutate()
    }

    if (profile?.userId === creator?.userId) return null

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
