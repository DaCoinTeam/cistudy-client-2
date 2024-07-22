import { Spacer } from "@nextui-org/react"
import React, { useContext } from "react"
import { AccountDetailsContext } from "../../_hooks"
import { Actions } from "./Actions"

interface UnderAvatarSectionProps {
  className?: string;
}

export const UnderAvatarSection = (props: UnderAvatarSectionProps) => {
    const { className } = props

    const { swrs } = useContext(AccountDetailsContext)!
    const { accountSwr } = swrs
    const { data: account } = accountSwr
    const { username, numberOfFollowers } = { ...account }

    return (
        <div className={`${className} flex justify-between items-center`}>
            <div>
                <div className="text-4xl">
                    {username ?? "Unnamed"}
                </div>
                <Spacer y={0.5} />
                <div className="text-sm">{numberOfFollowers} followers</div>
            </div>
            <Actions />
        </div>
    )
}