"use client"
import React, { useContext } from "react"
import { SectionsPanel } from "./SectionsPanel"
import { GeneralPanel } from "./GeneralPanel"
import { PanelSelected, ManagementContext } from "../../_hooks"
import { TargetPanel } from "./TargetPanel"
import { PreviewPanel } from "./PreviewPanel"
import { PricePanel } from "./PricePanel"
import { SettingsPanel } from "./SettingsPanel"
import { AnalyticsPanel } from "./AnalyticsPanel"

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
        [PanelSelected.Price]: <PricePanel className={`${className}`} />,
        [PanelSelected.Preview]: <PreviewPanel className={`${className}`} />,
        [PanelSelected.Target]: <TargetPanel className={`${className}`} />,
        [PanelSelected.Analytics]: <AnalyticsPanel className={`${className}`}/>,
        [PanelSelected.Settings]: <SettingsPanel className={`${className}`}/>
    }

    return <>{panelSelectedToComponent[panelSelected]}</>
}
