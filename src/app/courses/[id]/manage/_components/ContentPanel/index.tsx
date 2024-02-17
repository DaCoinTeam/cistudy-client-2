"use client"
import React, { useContext } from "react"
import { Card } from "@nextui-org/react"
import { CurriculumPanel } from "./CurriculumPanel"
import { InformationPanel } from "./InformationPanel"
import { PanelSelected, ManageContext } from "../../_hooks"

interface ContentPanelProps {
  className?: string;
}

export const ContentPanel = (props: ContentPanelProps) => {
    const { state } = useContext(ManageContext)!
    const { panelSelected } = state

    const panelSelectedToPanelComponent: Record<PanelSelected, JSX.Element> = {
        [PanelSelected.Information]: <InformationPanel />,
        [PanelSelected.Curriculum]: <CurriculumPanel />,
    }

    return (
        <div className={`${props.className}`}>
            <Card>{panelSelectedToPanelComponent[panelSelected]}</Card>
        </div>
    )
}
