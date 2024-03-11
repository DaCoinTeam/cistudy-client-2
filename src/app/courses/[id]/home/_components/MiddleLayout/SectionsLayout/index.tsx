import React from "react"
import { SectionsSection } from "./SectionsSection"

interface SectionsLayoutProps {
    className?: string
}
export const SectionsLayout = (props: SectionsLayoutProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <SectionsSection/>
        </div>
        
    )
}