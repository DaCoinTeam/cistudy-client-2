"use client"
import React from "react"
import { EnrollmentsSection } from "./EnrollmentsSection"
import { EarningSection } from "./EarningSection"
import { Spacer } from "@nextui-org/react"

interface EarningPanelProps {
    className?: string
}
export const EarningPanel = (props: EarningPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <EarningSection/>
            <Spacer y={6}/>
            <EnrollmentsSection/>
        </div>
    )
}
