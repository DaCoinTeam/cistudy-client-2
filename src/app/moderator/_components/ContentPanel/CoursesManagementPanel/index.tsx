import React from "react"
import { Spacer } from "@nextui-org/react"
import { CourseApprovalItem } from "./CourseApprovalItem"

interface CoursesManagementPanelProps {
    className?: string;
}

export const CoursesManagementPanel = (props: CoursesManagementPanelProps) => {
    const { className } = props

    return (
        <div className={`${className}`}>
            <div className="justify-between flex items-center">
                <div className="text-2xl">Courses Management</div>
            </div>
            <Spacer y={4} />
            <CourseApprovalItem />
        </div>
    )
}