import { Button } from "@nextui-org/react"
import { UserMinus2Icon, UserPlus2Icon } from "lucide-react"
import React, { useContext } from "react"
import { UserDetailsContext } from "../../../../_hooks"
import { toggleFollow } from "@services"

export const ToggleFollowButton = () => {
    const { swrs } = useContext(UserDetailsContext)!
    const { userSwr } = swrs
    const { data: user , mutate } = userSwr

    const onPress = async () => {
        if (!user) return
        const { userId } = user

        await toggleFollow({
            data: {
                followedUserId: userId,
            },
        })
        
        await mutate()
    }

    return (
        <Button
            onPress={onPress}
            className="bg-content2"
            startContent={
                user?.followed ? (
                    <UserMinus2Icon className="21" strokeWidth={4 / 3} />
                ) : (
                    <UserPlus2Icon className="21" strokeWidth={4 / 3} />
                )
            }
        >
            {user?.followed ? "Unfollow" : "Follow"}
        </Button>
    )
}
