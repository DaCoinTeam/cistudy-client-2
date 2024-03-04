import React from "react"
import { MoreButton } from "./MoreButton"
import { CreateCourseButton } from "./CreateCourseButton"
import { SearchBar } from "./SearchBar"
import { FilterPopover } from "./FilterPopover"

interface ActionsProps {
  className?: string;
}

export const Actions = (props: ActionsProps) => {
    const { className } = props

    return (
        <div className={`${className ?? ""} gap-4 flex items-center`}>
            <SearchBar />
            <FilterPopover/>
            <CreateCourseButton />
            <MoreButton />
        </div>
    )
}
