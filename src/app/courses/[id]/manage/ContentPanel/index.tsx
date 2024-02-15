"use client"
import React from "react"
import { InformationPanel } from "./InformationPanel"
import { Card } from "@nextui-org/react"
import { CurriculumPanel } from "./CurriculumPanel"

interface ContentPanelProps {
    className?: string
}

export const ContentPanel = (props: ContentPanelProps) => {
    return (
        <div className={`${props.className}`}>
            <Card>
                {/* <InformationPanel/> */}
                <CurriculumPanel/>
            </Card> 
        </div>
    )
}