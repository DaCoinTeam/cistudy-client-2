import { Button } from "@nextui-org/react"
import { UserMinus2Icon, UserPlus2Icon } from "lucide-react"
import React, { useContext } from "react"
import { AccountDetailsContext } from "../../../../_hooks"
import { toggleFollow } from "@services"

export const ToggleFollowButton = () => {
    const { swrs } = useContext(AccountDetailsContext)!
    const { accountSwr } = swrs
    const { data: account , mutate } = accountSwr

    const onPress = async () => {
        if (!account) return
        const { accountId } = account

        await toggleFollow({
            data: {
                followedAccountId: accountId,
            },
        })
        
        await mutate()
    }

    return (
        <Button
            onPress={onPress}
            className="bg-content2"
            startContent={
                account?.followed ? (
                    <UserMinus2Icon className="21" strokeWidth={3/2} />
                ) : (
                    <UserPlus2Icon className="21" strokeWidth={3/2} />
                )
            }
        >
            {account?.followed ? "Unfollow" : "Follow"}
        </Button>
    )
}
