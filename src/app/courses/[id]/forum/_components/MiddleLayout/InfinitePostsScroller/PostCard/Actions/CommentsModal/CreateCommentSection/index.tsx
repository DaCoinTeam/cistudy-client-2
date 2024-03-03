import { Avatar } from "@nextui-org/react"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "@redux"
import { getAssetUrl } from "@services"
import { CreateCommentModal } from "./CreateCommentModal"
export const CreateCommentSection = () => {
    const profile = useSelector((state: RootState) => state.auth.profile)
    return (
        <div className="flex items-center gap-4 w-full">
            <Avatar src={getAssetUrl(profile?.avatarId)} />
            <div className="flex-1">
                <CreateCommentModal />
            </div>
        </div>
    )
}
