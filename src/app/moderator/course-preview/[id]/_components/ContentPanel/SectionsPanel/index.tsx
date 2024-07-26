"use client"
import React from "react"
import { SectionsSection } from "./SectionsSection"

interface SectionsPanelProps {
    className?: string
}
export const SectionsPanel = (props: SectionsPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <SectionsSection />
        </div>
    )
}
