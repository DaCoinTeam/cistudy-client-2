import React from "react"
import { SectionsCard } from "./SectionsCard"

interface SectionsLayoutProps {
    className?: string
}
export const SectionsLayout = (props: SectionsLayoutProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <SectionsCard/>
        </div>
        
    )
}