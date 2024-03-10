"use client"
import React, { useContext } from "react"
import { ForumLayout } from "./ForumLayout"
import { LearnLayout } from "./LearnLayout"
import { HomeContext, PanelSelected } from "../../_hooks"

interface MiddleLayoutProps {
  className?: string;
}

export const MiddleLayout = (props: MiddleLayoutProps) => {
    const { className } = props
    const { reducer } = useContext(HomeContext)!
    const [state] = reducer
    const { panelSelected } = state

    const render = () => {
        const panelSelectedToComponent: Record<PanelSelected, JSX.Element> = {
            [PanelSelected.Forum]: <ForumLayout className={`${className}`} />,
            [PanelSelected.Learn]: <LearnLayout className={`${className}`} />,
            [PanelSelected.Preview]: <></>,
        }
        return panelSelectedToComponent[panelSelected]
    }
    return <> {render()} </>
}
