import React, { useContext } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../../redux/store"
import { UserDetailsContext } from "../../../_hooks"
import { EditProfileModal } from "./EditProfileModal"
import { FollowOrUnfollowButton } from "./FollowOrUnfollowButton"
import { MoreButton } from "./MoreButton"

interface ActionsProps {
  className?: string;
}

export const Actions = (props: ActionsProps) => {
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
        <div className={`${className ?? ""} gap-4 flex items-center`}>
            {renderButton()}
            <MoreButton />
        </div>
    )
}
