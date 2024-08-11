import React, { useContext } from "react"
import { CoursesManagementPanel } from "./CoursesManagementPanel"
import { AdminContext, PanelSelected } from "../../_hooks"
import { AccountsManagementPanel } from "./AccountsManagmentPanel"
import { TransactionsManagementPanel } from "./TransactionsManagementPanel"
import { NotificationsManagementPanel } from "./NotificationsManagementPanel"
import { AnalyticsPanel } from "./AnalyticsPanel"
import { ConfigurationPanel } from "./ConfigurationPanel"

interface ContentPanelProps {
  className?: string;
}

export const ContentPanel = (props: ContentPanelProps) => {
    const { className } = props

    const { reducer } = useContext(AdminContext)!
    const [state] = reducer
    const { panelSelected } = state

    const render = () => {
        const panelSelectedToComponent: Record<PanelSelected, JSX.Element> = {
            [PanelSelected.Analytics]: (
                <AnalyticsPanel className={`${className}`}/>
            ),
            [PanelSelected.Accounts]: (
                <AccountsManagementPanel className={`${className}`}/>
            ),
            [PanelSelected.Courses]: (
                <CoursesManagementPanel className={`${className}`} />
            ),
            [PanelSelected.Transactions]: (
                <TransactionsManagementPanel className={`${className}`} />
            ),
            [PanelSelected.Notifications]: (
                <NotificationsManagementPanel className={`${className}`} />
            ),
            [PanelSelected.Configuration]: (
                <ConfigurationPanel className={`${className}`}/>
            ),
        }
        return panelSelectedToComponent[panelSelected]
    }

    return <>{render()}</>
}
