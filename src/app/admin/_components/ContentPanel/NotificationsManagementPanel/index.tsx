import { Spacer } from "@nextui-org/react"
import React from "react"
import { Actions } from "./Actions"
import { NotificationsManagementPanelProvider } from "./NotificationsManagementPanelProvider"
import { NotificationsTable } from "./NotificationsTable"

interface NotificationsManagementPanelProps {
  className?: string;
}

const WrappedNotificationsManagementPanel = (props: NotificationsManagementPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="justify-between flex items-center">
                <div className="text-2xl"> Notifications </div>
                <Actions />
            </div>
            <Spacer y={4}/>
            <NotificationsTable />
        </div>
    )
}

export const NotificationsManagementPanel = (props: NotificationsManagementPanelProps) => {
    return (
        <NotificationsManagementPanelProvider>
            <WrappedNotificationsManagementPanel {...props} />
        </NotificationsManagementPanelProvider>
    )
}
