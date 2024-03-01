import React from "react"
import { MoreButton } from "./MoreButton"
import { EditPreviewVideoButton } from "./EditPreviewVideoButton"

interface ActionsProps {
  className?: string;
}

export const Actions = (props: ActionsProps) => {
    const { className } = props
    return (
        <div className={`${className ?? ""} gap-4 flex items-center`}>
            <EditPreviewVideoButton/>
            <MoreButton />
        </div>
    )
}
