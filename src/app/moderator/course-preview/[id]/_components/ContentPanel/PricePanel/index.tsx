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
            <div className="text-4xl font-bold"> Price </div>
            <Spacer y={4}/>
            <div className="w-1/2">
                <ManagePrice/>
            </div>

        </div>
    )
}
