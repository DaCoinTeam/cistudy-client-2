"use client"
import { Spacer } from "@nextui-org/react"  
import React from "react"
import { PreviewSection } from "./PreviewSection"

interface PreviewPanelProps {
  className?: string;
}

export const PreviewPanel = (props: PreviewPanelProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <div className="text-2xl font-semibold">Preview</div>
            <Spacer y={6}/>
            <PreviewSection/>
        </div>
    )
}
