"use client"
import React from "react"
import { PreviewCard } from "./PreviewCard"
import { InfoCard } from "./InfoCard"
import { TargetsCard } from "./TargetsCard"
import { Spacer } from "@nextui-org/react"
import { PriceCard } from "./PriceCard"

export const DetailsPanel = () => {
    return (
        <div className="grid grid-cols-5 gap-6">
            <div className="col-span-3 h-fit">
                <InfoCard/>
                <Spacer y={6}/>
                <TargetsCard />
            </div>    
            <div className="col-span-2 h-fit">
                <PreviewCard />
                <Spacer y={6}/>
                <PriceCard />
            </div>
          
        </div>
    )
} 