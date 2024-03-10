"use client"
import React, { useContext } from "react"
import { SectionsPanel } from "./SectionsPanel"
import { DetailsPanel } from "./DetailsPanel"
import { PanelSelected, ManagementContext } from "../../_hooks"

interface ContentPanelProps {
  className?: string;
}

export const ContentPanel = (props: ContentPanelProps) => {
    const { className } = props
    const { reducer } = useContext(ManagementContext)!
    const [ state ] = reducer
    const { panelSelected } = state

    const panelSelectedToComponent: Record<PanelSelected, JSX.Element> = {
        [PanelSelected.Details]: <DetailsPanel />,
        [PanelSelected.Sections]: <SectionsPanel />,
    }

    return (
        <div className={`${className}`}>
            {panelSelectedToComponent[panelSelected]}
        </div>
    )
}
