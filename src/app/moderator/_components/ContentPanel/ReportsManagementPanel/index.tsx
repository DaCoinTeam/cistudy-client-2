import React from "react"
import { ReportItem } from "./ReportItem"
import { Spacer } from "@nextui-org/react"

interface ReportsManagementPanelProps {
    className?: string;
}

export const ReportsManagementPanel = (props: ReportsManagementPanelProps) => {
    const { className } = props

    return (
        <div className={`${className}`}>
            <div className="justify-between flex items-center">
                <div className="text-2xl"> Reports Management</div>
            </div>
            <Spacer y={4} />
            <ReportItem />
        </div>
    )
}