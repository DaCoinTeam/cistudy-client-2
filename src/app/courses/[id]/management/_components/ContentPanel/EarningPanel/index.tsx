"use client"
import React from "react"
import { EnrollmentsSection } from "./EnrollmentsSection"
import { EarningSection } from "./EarningSection"
import { Spacer } from "@nextui-org/react"
import { ReceivedWalletSection } from "./ReceivedWalletSection"

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
            <Spacer y={6}/>
            <ReceivedWalletSection/>
        </div>
    )
}
