import React from "react"
import { SectionsSection } from "./SectionsSection"
import { Spacer } from "@nextui-org/react"

interface SectionsLayoutProps {
    className?: string
}
export const SectionsLayout = (props: SectionsLayoutProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="text-2xl font-bold"> Sections </div>
            <Spacer y={4}/>
            <SectionsSection/>
        </div>
        
    )
}