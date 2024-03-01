import React from "react"
import { Menu } from "./Menu"
import { Spacer } from "@nextui-org/react"

interface SidebarProps {
    className?: string
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props
    return (
        <div className={`${className} border-r border-divider p-6 h-screen sticky top-0`}>
            <Spacer y={16}/>
            <Menu/>
        </div>
    )
}