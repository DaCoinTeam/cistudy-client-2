import React from "react"
import { Menu } from "./Menu"
import { Actions } from "./Actions"
import { Spacer } from "@nextui-org/react"

interface SidebarProps {
    className?: string
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props
    return (
        <div className={`${className}`}>
            <Menu />
            <Spacer y={6}/>
            <Actions />
        </div>
    )
}