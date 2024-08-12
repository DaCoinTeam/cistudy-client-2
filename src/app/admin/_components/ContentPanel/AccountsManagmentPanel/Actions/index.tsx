import React from "react"
import { MoreButton } from "./MoreButton"
import { SearchBar } from "./SearchBar"
import { FilterPopover } from "./FilterPopover"
import { CreateAccountModal } from "./CreateAccountModal"

interface ActionsProps {
  className?: string;
}

export const Actions = (props: ActionsProps) => {
    const { className } = props

    return (
        <div className={`${className ?? ""} gap-2 flex items-center`}>
            <SearchBar />
            <FilterPopover/>
            <CreateAccountModal/>
            <MoreButton />
        </div>
    )
}
