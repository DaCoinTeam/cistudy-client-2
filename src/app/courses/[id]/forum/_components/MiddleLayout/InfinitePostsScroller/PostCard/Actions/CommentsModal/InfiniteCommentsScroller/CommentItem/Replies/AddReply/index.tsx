import React, { useContext } from "react"
import { RootContext } from "../../../../../../../../../../../../../_hooks"
import { Avatar, Input, Link } from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { AddReplyContext, AddReplyProviders } from "./AddReplyProviders"
import { SendHorizonalIcon } from "lucide-react"

const WrappedAddReply = () => {
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr

    const { formik } = useContext(AddReplyContext)!

    const onPress = () => formik.submitForm()

    return (
        <div className="flex items-center gap-4">
            <Avatar src={getAssetUrl(profile?.avatarId)} />
            <Input
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
                isInvalid={!!(formik.touched.content && formik.values.content)}
                errorMessage={formik.touched.content && formik.values.content}
                labelPlacement="outside"
                className="flex-1"
            />
        </div>
    )
}

export const AddReply = () => {
    return (
        <AddReplyProviders>
            <WrappedAddReply />
        </AddReplyProviders>
    )
}
