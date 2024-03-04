import React from "react"
import { CoursesManagementPanel } from "./CoursesManagementPanel"

export const ContentPanel = () => {
    return (
        <div className="grid grid-cols-6">
            <CoursesManagementPanel className="col-span-6"/>
        </div>
    )
}