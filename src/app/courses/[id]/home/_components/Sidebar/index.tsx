"use client"
import { Card, CardBody, CardHeader, Divider, Spacer, User } from "@nextui-org/react"
import React, { useContext } from "react"
import { Stars } from "../../../../../_shared"
import { getAssetUrl } from "@services"
import { Menu } from "./Menu"
import { HomeContext } from "../../_hooks"

interface SidebarProps {
    className?: string
}

export const Sidebar = (props: SidebarProps) => {
    const { className } = props
    const { swrs } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data: courseHome } = courseHomeSwr
    const { title, creator } = { ...courseHome }
    const { avatarId, username, numberOfFollowers } = { ...creator }

    return (
        <Card shadow="none" className={`${className} border border-divider p-4 sticky top-[5.5rem]`}>
            <CardHeader className="p-0 pb-4 inline">
                <div className="text-lg font-bold"> {title} </div>
                <div className="text-xs text-foreground-500"> Javascript, Typescript </div>
                <Spacer y={4}/>
                <User className="flex justify-start" classNames={{name: "text-base font-semibold"}} name={username} description={`${numberOfFollowers} followers`} avatarProps={{
                    src: getAssetUrl(avatarId)
                }} />
                
                <Spacer y={4}/>
                <Stars readonly/>
                <Spacer y={1}/>
                <div className="text-xs text-foreground-500">
                    {232} users has enrolled this course
                </div>      
                <Spacer y={4}/> 
            </CardHeader>
            <Divider />
            <CardBody className="p-0 pt-4">
                <Menu />
            </CardBody>
        </Card>
    )
}