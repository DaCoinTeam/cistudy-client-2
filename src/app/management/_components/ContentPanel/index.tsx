import React from "react"
import { ManageCoursesPanel } from "./ManageCoursesPanel"

export const ContentPanel = () => {
    return (
        <div className="grid grid-cols-6">
            <ManageCoursesPanel className="col-span-6"/>
        </div>
    )
}