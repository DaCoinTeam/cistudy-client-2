"use client"
import React from "react"
import { PreviewSection } from "./PreviewSection"
import { GeneralSection } from "./GeneralSection"
import { Spacer } from "@nextui-org/react"
interface GeneralPanelProps {
  className?: string;
}

export const GeneralPanel = (props: GeneralPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <GeneralSection />
            <Spacer y={12} />
            <PreviewSection />
            <Spacer y={12} />
        </div>
    )
}
