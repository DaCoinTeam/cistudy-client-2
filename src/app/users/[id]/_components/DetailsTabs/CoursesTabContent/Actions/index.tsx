import React, { useContext } from "react"
import { MoreButton } from "./MoreButton"
import { ManageButton } from "./ManageButton"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../../../redux/store"
import { UserDetailsContext } from "../../../../_hooks"
import { SearchBar } from "./SearchBar"

interface ActionsProps {
  className?: string;
}

export const Actions = (props: ActionsProps) => {
    const { className } = props

    const { state } = useContext(UserDetailsContext)!
    const { user } = state

    const profile = useSelector((state: RootState) => state.auth.profile)

    const renderButton = () => (
        <>{user?.userId === profile?.userId ? <ManageButton /> : null}</>
    )

    return (
        <div className={`${className ?? ""} gap-4 flex items-center`}>
            <SearchBar />
            {renderButton()}
            <MoreButton />
        </div>
    )
}
