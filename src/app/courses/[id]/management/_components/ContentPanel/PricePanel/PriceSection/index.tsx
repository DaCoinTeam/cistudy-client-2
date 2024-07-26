"use client"
import { Spacer } from "@nextui-org/react"
import { ManagePrice } from "./ManagePrice"
import { PriceSectionProvider } from "./PriceSectionProvider"

const WrappedPriceSection = () => {
    return (
        <div className="h-[30rem] flex flex-col">
            <div className="text-4xl font-bold"> Price </div>
            <Spacer y={4}/>
            <div className="flex items-center gap-2 w-2/3">
                <ManagePrice/>
            </div>
           
        </div>
    )
}

export const PriceSection = () => {
    return (
        <PriceSectionProvider>
            <WrappedPriceSection/>
        </PriceSectionProvider>
    )
}