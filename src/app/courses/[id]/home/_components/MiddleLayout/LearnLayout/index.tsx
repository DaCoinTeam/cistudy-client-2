import React from "react"
import { SectionsCard } from "./SectionsCard"

interface LearnLayoutProps {
    className?: string
}
export const LearnLayout = (props: LearnLayoutProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <SectionsCard/>
        </div>
        
    )
}