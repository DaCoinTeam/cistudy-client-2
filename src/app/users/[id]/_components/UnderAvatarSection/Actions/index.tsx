import React, { useContext } from "react"
import { UserDetailsContext } from "../../../_hooks"
import { EditProfileModal } from "./EditProfileModal"
import { ToggleFollowButton } from "./ToggleFollowButton"
import { MoreButton } from "./MoreButton"
import { RootContext } from "../../../../../_hooks"

interface ActionsProps {
  className?: string;
}

export const Actions = (props: ActionsProps) => {
    const { className } = props

    const { swrs } = useContext(UserDetailsContext)!
    const { userSwr } = swrs
    const { data: user } = userSwr

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile } = profileSwr

    const renderButton = () => (
        <>
            {user?.userId === profile?.userId ? (
                <EditProfileModal />
            ) : (
                <ToggleFollowButton />
            )}
        </>
    )
    return (
        <div className={`${className ?? ""} gap-2 flex items-center`}>
            {renderButton()}
            <MoreButton />
        </div>
    )
}
