import { Button } from "@nextui-org/react"
import { UserMinus2Icon, UserPlus2Icon } from "lucide-react"
import React, { useContext } from "react"
import { UserDetailsContext } from "../../../../_hooks"
import { upsertFollow } from "@services"
import { isErrorResponse } from "@common"

export const FollowOrUnfollowButton = () => {
    const { state, functions } = useContext(UserDetailsContext)!
    const { user } = state
    const { fetchAndSetUser } = functions

    const _upsertFollow = async (followed: boolean) => {
        if (user === null) return
        const { userId } = user

        const response = await upsertFollow({
            data: {
                followedUserId: userId,
                followed,
            },
        })
        if (!isErrorResponse(response)) {
            fetchAndSetUser()
        } else {
            console.log(response)
        }
    }

    const onFollowPress = async () => await _upsertFollow(true)
    const onUnfollowPress = async () => await _upsertFollow(false)

    return (
        <>
            {user?.followed ? (
                <Button
                    onPress={onUnfollowPress}
                    className="bg-content2"
                    startContent={<UserMinus2Icon className="21" strokeWidth={4/3} />}
                >
          Unfollow
                </Button>
            ) : (
                <Button
                    onPress={onFollowPress}
                    className="bg-content2"
                    startContent={<UserPlus2Icon className="21" strokeWidth={4/3} />}
                >
          Follow
                </Button>
            )}
        </>
    )
}
