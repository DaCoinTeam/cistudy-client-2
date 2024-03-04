"use client"
import React from "react"
import { PreviewCard } from "./PreviewCard"
import { InformationCard } from "./InformationCard"
import { TargetsCard } from "./TargetsCard"
import { Spacer } from "@nextui-org/react"

export const DetailsPanel = () => {
    return (
        <div>
            <PreviewCard /> 
            <Spacer y={6}/>
            <InformationCard/>
            <Spacer y={6}/>
            <TargetsCard />
        </div>
    )
} 