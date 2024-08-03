"use client"
import React, { useContext } from "react"
import { Menu } from "./Menu"
import { CompleteState } from "./CompleteState"
import { Spacer } from "@nextui-org/react"
import { HomeContext, PanelSelected } from "../../_hooks"
import { EnrolledUsers } from "./EnrolledUsers"

interface SidebarProps {
  className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { reducer } = useContext(HomeContext)!
    const [state] = reducer
    const { panelSelected } = state

    const renderUnder = () => {
        const map: Record<PanelSelected, JSX.Element> = {
            [PanelSelected.Forum]: <EnrolledUsers />,
            [PanelSelected.Sections]: <CompleteState />,
            [PanelSelected.Preview]: <></>,
        }
        return map[panelSelected]
    }

    const { className } = props
    return (
        <div>
            <Menu className={`${className}`} />
            <Spacer y={12} />
            {renderUnder()}
        </div>
    )
}
