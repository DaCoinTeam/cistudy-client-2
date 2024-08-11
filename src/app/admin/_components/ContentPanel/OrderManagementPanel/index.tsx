import { Spacer } from "@nextui-org/react"
import React from "react"
import { Actions } from "./Actions"
import { OrdersTable } from "./OrdersTable"

interface OrdersManagementPanelProps {
  className?: string;
}

export const OrdersManagementPanel = (props: OrdersManagementPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="justify-between flex items-center">
                <div className="text-2xl"> Orders </div>
                <Actions />
            </div>
            <Spacer y={4}/>
            <OrdersTable />
        </div>
    )
}

