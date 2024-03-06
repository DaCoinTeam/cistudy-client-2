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

    const onPress = () => formik.submitForm()

    return (
        <div className="flex items-center gap-2">
            <Avatar src={getAssetUrl(profile?.avatarId)} size="sm" />
            <Input
                size="sm"
                placeholder="Create a reply..."
                label=""
                id="content"
                value={formik.values.content}
                onChange={formik.handleChange}
                endContent={
                    formik.values.content ? (
                        <Link as="button" onPress={onPress}>
                            <SendHorizonalIcon size={20} strokeWidth={3 / 2} />
                        </Link>
                    ) : null
                }
                classNames={{
                    inputWrapper: "bg-content2 px-3"
                }}
                isInvalid={!!(formik.touched.content && formik.values.content)}
                errorMessage={formik.touched.content && formik.values.content}
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
