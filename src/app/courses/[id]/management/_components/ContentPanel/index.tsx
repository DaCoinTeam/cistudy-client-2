"use client"
import React, { useContext } from "react"
import { CurriculumPanel } from "./CurriculumPanel"
import { DetailsPanel } from "./DetailsPanel"
import { PanelSelected, ManagementContext } from "../../_hooks"

interface ContentPanelProps {
  className?: string;
}

export const ContentPanel = (props: ContentPanelProps) => {
    const { className } = props
    const { reducers } = useContext(ManagementContext)!
    const { manageReducer } = reducers
    const [state] = manageReducer
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
