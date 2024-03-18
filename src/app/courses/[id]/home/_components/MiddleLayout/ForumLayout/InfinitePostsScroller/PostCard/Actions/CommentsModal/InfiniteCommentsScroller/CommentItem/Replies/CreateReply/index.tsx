import React, { useContext } from "react"
import { RootContext } from "../../../../../../../../../../../../../../_hooks"
import { Avatar, Input, Link } from "@nextui-org/react"
import { getAssetUrl } from "@services"
import { CreateReplyContext, CreateReplyProvider } from "./CreateReplyProvider"
import { SendHorizonalIcon } from "lucide-react"
import { RepliesContext } from "../RepliesProvider"

const WrappedCreateReply = () => {
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr

    const { formik } = useContext(CreateReplyContext)!

    const { reducer } = useContext(RepliesContext)!
    const [state] = reducer
    const { editedPostCommentReplyId } = state

    return (
        <>
            {
                !editedPostCommentReplyId ? (
                    <div>
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
                                    <Link className="px-2.5" size="sm" as="button" isDisabled={!formik.values.content} type="submit">
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
                    </div>
                ) : null
            }
        </>
     
    )
}

export const CreateReply = () => {
    return (
        <CreateReplyProvider>
            <WrappedCreateReply />
        </CreateReplyProvider>
    )
}
