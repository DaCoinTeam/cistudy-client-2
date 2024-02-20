import { Avatar, Card, CardBody } from "@nextui-org/react"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { getAssetUrl } from "@services"
import { CreateCommentModal } from "./CreateCommentModal"
export const CreateComment = () => {
    const profile = useSelector((state: RootState) => state.auth.profile)
    return (
        <Card>
            <CardBody className="p-6">
                <div className="flex items-center gap-4">
                    <Avatar isBordered src={getAssetUrl(profile?.avatarId)} />
                    <div className="flex-1">
                        <CreateCommentModal />
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
