"use client"
import React, { useContext } from "react"
import { CurriculumPanel } from "./CurriculumPanel"
import { DetailsPanel } from "./DetailsPanel"
import { PanelSelected, ManageContext } from "../../_hooks"

interface ContentPanelProps {
  className?: string;
}

export const ContentPanel = (props: ContentPanelProps) => {
    const { className } = props 
    const { state } = useContext(ManageContext)!
    const { panelSelected } = state

    const panelSelectedToPanelComponent: Record<PanelSelected, JSX.Element> = {
        [PanelSelected.Details]: <DetailsPanel />,
        [PanelSelected.Curriculum]: <CurriculumPanel />,
    }

    return (
        <div className={`${className}`}>
            {panelSelectedToPanelComponent[panelSelected]}
        </div>
    )
}
