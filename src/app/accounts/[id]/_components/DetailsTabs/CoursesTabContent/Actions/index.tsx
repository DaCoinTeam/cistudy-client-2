import React, { useContext } from "react"
import { MoreButton } from "./MoreButton"
import { ManageButton } from "./ManageButton"
import { AccountDetailsContext } from "../../../../_hooks"
import { SearchBar } from "./SearchBar"
import { RootContext } from "../../../../../../_hooks"

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
        <>{account?.accountId === profile?.accountId ? <ManageButton /> : null}</>
    )

    return (
        <div className={`${className ?? ""} gap-2 flex items-center`}>
            <SearchBar />
            {renderButton()}
            <MoreButton />
        </div>
    )
}
