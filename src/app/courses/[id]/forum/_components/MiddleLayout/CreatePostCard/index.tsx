"use client"
import { Avatar, Card, CardBody } from "@nextui-org/react"
import React, { useContext } from "react"
import { getAssetUrl } from "@services"
import { CreatePostModal } from "./CreatePostModal"
import { RootContext } from "../../../../../../_hooks"
export const CreatePostCard = () => {
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr

    return (
        <Card shadow="none" className="border border-divider p-4">
            <CardBody className="p-0 flex gap-2 flex-row items-stretch">
                <Avatar src={getAssetUrl(profile?.avatarId)}/>
                <div  className="flex-1">
                    <CreatePostModal/>
                </div>        
            </CardBody>
        </Card>
    )
}
