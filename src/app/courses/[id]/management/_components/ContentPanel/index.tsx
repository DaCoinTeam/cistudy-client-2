"use client"
import React, { useContext } from "react"
import { SectionsPanel } from "./SectionsPanel"
import { GeneralPanel } from "./GeneralPanel"
import { PanelSelected, ManagementContext } from "../../_hooks"

interface ContentPanelProps {
  className?: string;
}

export const ContentPanel = (props: ContentPanelProps) => {
    const { className } = props
    const { reducer } = useContext(ManagementContext)!
    const [state] = reducer
    const { panelSelected } = state

    const panelSelectedToComponent: Record<PanelSelected, JSX.Element> = {
        [PanelSelected.General]: <GeneralPanel className={`${className}`} />,
        [PanelSelected.Sections]: <SectionsPanel className={`${className}`} />,
    }

    return <>{panelSelectedToComponent[panelSelected]}</>
}
