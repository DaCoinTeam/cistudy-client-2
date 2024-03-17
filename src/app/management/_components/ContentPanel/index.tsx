import React, { useContext } from "react"
import { CoursesManagementPanel } from "./CoursesManagementPanel"
import { ManagementContext, PanelSelected } from "../../_hooks"
import { FollowersManagementPanel } from "./FollowersManagmentPanel"

interface ContentPanelProps {
  className?: string;
}

export const ContentPanel = (props: ContentPanelProps) => {
    const { className } = props

    const { reducer } = useContext(ManagementContext)!
    const [state] = reducer
    const { panelSelected } = state

    const render = () => {
        const panelSelectedToComponent: Record<PanelSelected, JSX.Element> = {
            [PanelSelected.Followers]: <FollowersManagementPanel />,
            [PanelSelected.Courses]: (
                <CoursesManagementPanel className={`${className}`} />
            ),
        }
        return panelSelectedToComponent[panelSelected]
    }

    return <>{render()}</>
}
