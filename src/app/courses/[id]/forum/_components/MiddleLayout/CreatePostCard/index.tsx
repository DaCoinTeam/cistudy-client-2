import { Avatar, Card, CardBody } from "@nextui-org/react"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { getAssetUrl } from "../../../../../../../services/server"
import { CreatePostModal } from "./CreatePostModal"
export const CreatePostCard = () => {
    const profile = useSelector((state: RootState) => state.auth.profile)
    return (
        <Card>
            <CardBody>
                <div className="flex items-center gap-4">
                    <Avatar src={getAssetUrl(profile?.avatarId)} />
                    <CreatePostModal />
                </div>
            </CardBody>
        </Card>
    )
}
