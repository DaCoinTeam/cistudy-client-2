"use client"
import { Card, CardBody } from "@nextui-org/react"
import React from "react"
import { Menu } from "./Menu"

interface SidebarProps {
  className?: string;
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props
    return (
        <Card
            shadow="none"
            className={`${
                className ?? ""
            } border border-divider p-4 sticky top-[5.5rem] rounded-medium`}
        >
            <CardBody className="p-0">
                <Menu />
            </CardBody>
        </Card>
    )
}
