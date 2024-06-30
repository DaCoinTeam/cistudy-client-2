import { Spacer } from "@nextui-org/react"
import React from "react"
import { Actions } from "./Actions"
import { AccountsTable } from "./AccountsTable"
import { AccountsManagementPanelProvider } from "./AccountsManagementPanelProvider"

interface AccountsManagementPanelProps {
  className?: string;
}

const WrappedAccountsManagementPanel = (props: AccountsManagementPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="justify-between flex items-center">
                <div className="text-2xl"> Accounts </div>
                <Actions />
            </div>
            <Spacer y={4}/>
            <AccountsTable />
        </div>
    )
}

export const AccountsManagementPanel = (props: AccountsManagementPanelProps) => {
    return (
        <AccountsManagementPanelProvider>
            <WrappedAccountsManagementPanel {...props} />
        </AccountsManagementPanelProvider>
    )
}
