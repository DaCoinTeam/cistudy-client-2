"use client"
import React from "react"
import { Menu } from "./Menu"

interface SidebarProps {
    className?: string
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props

    return (
        <div>
            <Menu className={`${className}`} />
        </div>
    )
}   