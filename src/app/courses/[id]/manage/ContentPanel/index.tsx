"use client"
import React from "react"
import { InformationPanel } from "./InformationPanel"
import { Card } from "@nextui-org/react"

interface IContentPanelProps {
    className?: string
}

export const ContentPanel = (props: IContentPanelProps) => {
    return (
        <div className={`${props.className}`}>
            <Card>
                <InformationPanel/>
            </Card> 
        </div>
    )
}