"use client"
import { Card, CardBody } from "@nextui-org/react"
import React from "react"
import { Menu } from "./Menu"

interface SidebarProps {
    className?: string
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props

    return (
        <div className={`${className} sticky top-[5.5rem]`} >
            <Card shadow="none" className="border border-divider p-4 rounded-medium w-full">
                <CardBody className="p-0">
                    <Menu />
                </CardBody>
            </Card>
        </div>   
    )
}