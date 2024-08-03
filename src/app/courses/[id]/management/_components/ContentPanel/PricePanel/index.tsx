"use client"
import { Spacer } from "@nextui-org/react"
import { ManagePrice } from "./ManagePrice"

interface PricePanelProps {
    className?: string
}
export const PricePanel = (props: PricePanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="text-2xl font-semibold"> Price </div>
            <Spacer y={6}/>
            <div className="w-1/2">
                <ManagePrice/>
            </div>

        </div>
    )
}
