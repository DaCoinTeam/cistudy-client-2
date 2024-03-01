import React from "react"
import { MoreButton } from "./MoreButton"
import { ResourcesModal } from "./ResourcesModal"

interface ActionsProps {
  className?: string;
}

export const Actions = (props: ActionsProps) => {
    const { className } = props
    return (
        <div className={`${className ?? ""} gap-4 flex items-center`}>
            <ResourcesModal/>
            <MoreButton />
        </div>
    )
}
