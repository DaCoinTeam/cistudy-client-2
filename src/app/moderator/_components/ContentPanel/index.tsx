import React, { useContext } from "react"
import { ModeratorContext, PanelSelected } from "../../_hooks"
import { ReportsManagementPanel } from "./ReportsManagementPanel"
import { CoursesManagementPanel } from "./CoursesManagementPanel"

interface ContentPanelProps {
  className?: string;
}

export const ContentPanel = (props: ContentPanelProps) => {
    const { className } = props

    const { reducer } = useContext(ModeratorContext)!
    const [state] = reducer
    const { panelSelected } = state

    const render = () => {
        const panelSelectedToComponent: Record<PanelSelected, JSX.Element> = {
            [PanelSelected.Reports]: (
                <ReportsManagementPanel className={`${className}`} />
            ),
            [PanelSelected.CoursesApproval]: <CoursesManagementPanel className={`${className}`} />,
        }
        return panelSelectedToComponent[panelSelected]
    }

    return <>{render()}</>
}
