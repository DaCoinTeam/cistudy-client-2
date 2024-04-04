import { Spacer } from "@nextui-org/react"
import React from "react"
import { Actions } from "./Actions"
import { TransactionsTable } from "./TransactionsTable"
import { TransactionsManagementPanelProvider } from "./TransactionsManagementPanelProvider"

interface TransactionsManagementPanelProps {
  className?: string;
}

const WrappedTransactionsManagementPanel = (props: TransactionsManagementPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="justify-between flex items-center">
                <div className="text-2xl"> Transactions </div>
                <Actions />
            </div>
            <Spacer y={4}/>
            <TransactionsTable />
        </div>
    )
}

export const TransactionsManagementPanel = (props: TransactionsManagementPanelProps) => {
    return (
        <TransactionsManagementPanelProvider>
            <WrappedTransactionsManagementPanel {...props} />
        </TransactionsManagementPanelProvider>
    )
}
