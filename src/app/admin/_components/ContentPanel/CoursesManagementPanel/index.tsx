import { Spacer } from "@nextui-org/react"
import React from "react"
import { Actions } from "./Actions"
import { CoursesTable } from "./CoursesTable"
import { CoursesManagementPanelProvider } from "./CoursesManagementPanelProvider"

interface CoursesManagementPanelProps {
  className?: string;
}

const WrappedCoursesManagementPanel = (props: CoursesManagementPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="justify-between flex items-center">
                <div className="text-2xl"> Courses </div>
                <Actions />
            </div>
            <Spacer y={4}/>
            <CoursesTable />
        </div>
    )
}

export const CoursesManagementPanel = (props: CoursesManagementPanelProps) => {
    return (
        <CoursesManagementPanelProvider>
            <WrappedCoursesManagementPanel {...props} />
        </CoursesManagementPanelProvider>
    )
}
