import { Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { UserDetailsContext } from "../../_hooks"
import { Actions } from "./Actions"

interface UnderAvatarSectionProps {
  className?: string;
}

export const UnderAvatarSection = (props: UnderAvatarSectionProps) => {
    const { className } = props

    const { state } = useContext(UserDetailsContext)!
    const { user } = state

    return (
        <div className={`${className} flex justify-between items-center`}>
            <div>
                <div className="text-3xl font-semibold">
                    {user?.username ?? "Unnamed"}
                </div>
                <Spacer y={0.5} />
                <div className="text-sm">{user?.numberOfFollowers} followers</div>
            </div>
            <Actions />
        </div>
    )
}
