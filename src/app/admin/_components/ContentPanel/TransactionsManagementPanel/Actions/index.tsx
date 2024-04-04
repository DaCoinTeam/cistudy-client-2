import React from "react"
import { MoreButton } from "./MoreButton"
import { SearchBar } from "./SearchBar"
import { FilterPopover } from "./FilterPopover"
import { StatusSelect } from "./StatusSelect"

interface ActionsProps {
  className?: string;
}

export const Actions = (props: ActionsProps) => {
    const { className } = props

    return (
        <div className={`${className ?? ""} gap-2 flex items-center`}>
            <StatusSelect className="w-40"/>
            <SearchBar />
            <FilterPopover/>
            <MoreButton />
        </div>
    )
}
