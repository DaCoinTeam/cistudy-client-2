"use client"
import React from "react"
import { InformationPanel } from "./InformationPanel"
import { Card } from "@nextui-org/react"

interface ContentPanelProps {
    className?: string
}

export const ContentPanel = (props: ContentPanelProps) => {
    return (
        <div className={`${props.className}`}>
            <Card>
                <InformationPanel/>
            </Card> 
        </div>
    )
}