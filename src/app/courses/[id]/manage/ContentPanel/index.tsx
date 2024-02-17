"use client"
import React, { useContext } from "react"
import { Card } from "@nextui-org/react"
import { CurriculumPanel } from "./CurriculumPanel"
import { InformationPanel } from "./InformationPanel"
import { ManageContext } from "../ManageProviders"
import { PanelSelected } from "../useManageReducer"

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
