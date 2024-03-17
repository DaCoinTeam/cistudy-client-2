import { Avatar } from "@nextui-org/react"
import React, { useContext } from "react"
import { getAssetUrl } from "@services"
import { CreateCommentModal } from "./CreateCommentModal"
import { RootContext } from "../../../../../../../../../../../_hooks"

export const CreateCommentSection = () => { 
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr

    return (
        <div className="flex items-center gap-2 w-full">
            <Avatar src={getAssetUrl(profile?.avatarId)} />
            <div className="flex-1">
                <CreateCommentModal />
            </div>
        </div>
    )
}
