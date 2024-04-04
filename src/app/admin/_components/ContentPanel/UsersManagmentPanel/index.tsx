import { Spacer } from "@nextui-org/react"
import React from "react"
import { Actions } from "./Actions"
import { UsersTable } from "./UsersTable"
import { UsersManagementPanelProvider } from "./UsersManagementPanelProvider"

interface UsersManagementPanelProps {
  className?: string;
}

const WrappedUsersManagementPanel = (props: UsersManagementPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="justify-between flex items-center">
                <div className="text-2xl"> Users </div>
                <Actions />
            </div>
            <Spacer y={4}/>
            <UsersTable />
        </div>
    )
}

export const UsersManagementPanel = (props: UsersManagementPanelProps) => {
    return (
        <UsersManagementPanelProvider>
            <WrappedUsersManagementPanel {...props} />
        </UsersManagementPanelProvider>
    )
}
