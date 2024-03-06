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
        <Card shadow="none" className="border border-divider">
            <CardBody className="p-4">
                <div className="flex gap-4 items-stretch">
                    <Avatar size="lg" src={getAssetUrl(profile?.avatarId)} />
                    <div className="flex-1 grid place-content-stretch" >
                        <CreatePostModal className="h-full"/>
                    </div>
              
                </div>
            </CardBody>
        </Card>
    )
}
