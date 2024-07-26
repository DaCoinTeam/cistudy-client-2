"use client"
import React from "react"
import { GeneralSection } from "./GeneralSection"

interface GeneralPanelProps {
  className?: string;
}

export const GeneralPanel = (props: GeneralPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <GeneralSection />
        </div>
    )
}
