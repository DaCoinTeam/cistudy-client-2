"use client"

import { TargetsSection } from "./TargetsSection"

interface TargetPanelProps {
    className?: string
}

export const TargetPanel = (props: TargetPanelProps) => {
    const { className } = props

    return (
        <div className={`${className}`}>
            <TargetsSection />
        </div>
    )
}