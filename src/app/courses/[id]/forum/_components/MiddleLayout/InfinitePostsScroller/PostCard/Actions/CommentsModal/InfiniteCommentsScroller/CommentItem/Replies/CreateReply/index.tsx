import React, { useContext } from "react"
import { RootContext } from "../../../../../../../../../../../../../_hooks"
import { Avatar, Input, Link } from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { CreateReplyContext, CreateReplyProviders } from "./CreateReplyProviders"
import { SendHorizonalIcon } from "lucide-react"

const WrappedCreateReply = () => {
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr

    const { formik } = useContext(CreateReplyContext)!

    return (
        <div className="flex items-center gap-2">
            <Avatar src={getAssetUrl(profile?.avatarId)} size="sm" />
            <Input
                size="sm"
                placeholder="Create a reply..."
                label=""
                variant="underlined"
                color="primary"
                id="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                endContent={
                    <Link as="button" isDisabled={!formik.values.content} type="submit">
                        <SendHorizonalIcon size={20} strokeWidth={3 / 2} />
                    </Link>
                }
                classNames={{
                    inputWrapper: "!px-0 border-b",
                    innerWrapper: "pb-0"
                }}
                labelPlacement="outside"
                className="flex-1"
            />
        </div>
    )
}

export const CreateReply = () => {
    return (
        <CreateReplyProviders>
            <WrappedCreateReply />
        </CreateReplyProviders>
    )
}