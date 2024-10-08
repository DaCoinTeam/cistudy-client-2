import { Avatar, Input, Link } from "@nextui-org/react"
import { getAvatarUrl } from "@services"
import { SendHorizonalIcon } from "lucide-react"
import { useContext } from "react"
import { RepliesContext } from "../RepliesProvider"
import { CreateReplyContext, CreateReplyProvider } from "./CreateReplyProvider"
import { RootContext } from "../../../../../../../_hooks"

const WrappedCreateReply = () => {
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { data: profile } = profileSwr
    const { avatarId, avatarUrl, kind } = { ...profile }

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
                            <Avatar src={getAvatarUrl({
                                avatarId,
                                avatarUrl,
                                kind
                            })} size="sm" />
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
