"use client"
import React from "react"
import { Menu } from "./Menu"

interface SidebarProps {
    className?: string
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props
    return (
        <Menu className={`${className} sticky top-[7rem]`} />
    )
}