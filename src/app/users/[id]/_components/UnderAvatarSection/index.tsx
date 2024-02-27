import { Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { MoreButton } from "./MoreButton"
import { UserDetailsContext } from "../../_hooks"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { EditProfileModal } from "./EditProfileModal"
import { FollowOrUnfollowButton } from "./EditProfileModal/FollowOrUnfollowButton"

interface UnderAvatarSectionProps {
  className?: string;
}

export const UnderAvatarSection = (props: UnderAvatarSectionProps) => {
    const { className } = props

    const { state } = useContext(UserDetailsContext)!
    const { user } = state

    const profile = useSelector((state: RootState) => state.auth.profile)

    const renderButton = () => (
        <>
            {user?.userId === profile?.userId ? (
                <EditProfileModal />
            ) : (
                <FollowOrUnfollowButton />
            )}
        </>
    )

    return (
        <div className={`${className} flex justify-between items-center`}>
            <div>
                <div className="text-3xl font-semibold">
                    {user?.username ?? "Unnamed"}{" "}
                </div>
                <Spacer y={0.5} />
                <div className="text-sm">123 followers</div>
            </div>
            <div className="gap-4 items-center flex">
                {renderButton()}
                <MoreButton />
            </div>
        </div>
    )
}
