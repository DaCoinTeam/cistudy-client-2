import { Card, CardBody, CardHeader } from "@nextui-org/react"
import React from "react"
import { Actions } from "./Actions"
import { CoursesTable } from "./CoursesTable"
import { CoursesManagementPanelProviders } from "./CoursesManagementPanelProviders"

interface CoursesManagementPanelProps {
  className?: string;
}

const WrappedCoursesManagementPanel = (props: CoursesManagementPanelProps) => {
    const { className } = props
    return (
        <Card className={`${className ?? ""} border border-divider`} shadow="none">
            <CardHeader className="p-6 pb-0 inline">
                <div className="justify-between flex items-center">
                    <div className="text-lg font-bold"> Courses </div>
                    <Actions />
                </div>
            </CardHeader>
            <CardBody className="p-6">
                <div className="border rounded-large border-divider">
                    <CoursesTable />
                </div>
            </CardBody>
        </Card>
    )
}

export const CoursesManagementPanel = (props: CoursesManagementPanelProps) => {
    return (
        <CoursesManagementPanelProviders>
            <WrappedCoursesManagementPanel {...props} />
        </CoursesManagementPanelProviders>
    )
}
