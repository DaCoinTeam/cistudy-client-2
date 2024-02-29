import { Card, CardBody, CardHeader } from "@nextui-org/react"
import React from "react"
import { Actions } from "./Actions"
import { CoursesTable } from "./CoursesTable"
import { ManageCoursesPanelProviders } from "./ManageCoursesPanelProviders"

const WrappedManageCoursesPanel = () => {
    return (
        <Card>
            <CardHeader className="p-6 pb-2 justify-between flex items-center">
                <div className="text-xl font-semibold"> Courses </div>
                <Actions />
            </CardHeader>
            <CardBody className="p-6">
                <CoursesTable />
            </CardBody>
        </Card>
    )
}

export const ManageCoursesPanel = () => {
    return (
        <ManageCoursesPanelProviders>
            <WrappedManageCoursesPanel/>
        </ManageCoursesPanelProviders>
    )
}
