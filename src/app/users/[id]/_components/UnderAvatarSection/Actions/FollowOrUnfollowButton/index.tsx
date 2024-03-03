import { Button } from "@nextui-org/react"
import { UserMinus2Icon, UserPlus2Icon } from "lucide-react"
import React, { useContext } from "react"
import { UserDetailsContext } from "../../../../_hooks"
import { toggleFollow } from "@services"
import { isErrorResponse } from "@common"

export const FollowOrUnfollowButton = () => {
    const { state, functions } = useContext(UserDetailsContext)!
    const { user } = state
    const { fetchAndSetUser } = functions

    const onPress = async () => {
        if (user === null) return
        const { userId } = user

        const response = await toggleFollow({
            data: {
                followedUserId: userId,
            },
        })
        if (!isErrorResponse(response)) {
            fetchAndSetUser()
        } else {
            console.log(response)
        }
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
