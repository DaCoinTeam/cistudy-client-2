"use client"
import React from "react"
import { SectionsSection } from "./SectionsSection"

interface SectionPanelProps {
    className?: string
}
export const SectionsPanel = (props: SectionPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <SectionsSection />
        </div>
    )
}
