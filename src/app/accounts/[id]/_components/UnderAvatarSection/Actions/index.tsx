import React, { useContext } from "react"
import { AccountDetailsContext } from "../../../_hooks"
import { EditProfileModal } from "./EditProfileModal"
import { ToggleFollowButton } from "./ToggleFollowButton"
import { MoreButton } from "./MoreButton"
import { RootContext } from "../../../../../_hooks"
import { SystemRoles } from "@common"
import { BeInstructorButton } from "./BeInstructorButton"

interface ActionsProps {
  className?: string;
}

export const Actions = (props: ActionsProps) => {
    const { className } = props

    const { swrs } = useContext(AccountDetailsContext)!
    const { accountSwr } = swrs
    const { data: account } = accountSwr

    const { swrs: rootSwrs } = useContext(RootContext)!
    const { profileSwr } = rootSwrs
    const { data: profile } = profileSwr

    const renderButton = () => (
        <>
            {
                account?.roles?.map(role => role.name).includes(SystemRoles.Instructor)? (
                    <BeInstructorButton />
                ) : (
                    <></>
                )
            }
            
            {account?.accountId === profile?.accountId ? (
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
