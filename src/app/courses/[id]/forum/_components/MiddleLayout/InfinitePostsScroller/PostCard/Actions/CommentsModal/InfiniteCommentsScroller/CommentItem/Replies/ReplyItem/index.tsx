import { Avatar, Input, Link, Spacer } from "@nextui-org/react"
import React, { createContext, useContext, useEffect, useMemo } from "react"
import { PostCommentReplyEntity, parseTimeAgo } from "@common"
import { getAssetUrl, updatePostCommentReply } from "@services"
import { MoreButton } from "./MoreButton"
import {
    ReplyItemAction,
    ReplyItemState,
    useReplyItemReducer,
} from "./useReplyItemReducer"
import { useFormik } from "formik"
import { RepliesContext } from "../RepliesProviders"
import { ClipboardXIcon, SaveIcon } from "lucide-react"

interface ReplyItemProps {
  postCommentReply: PostCommentReplyEntity;
}

interface ReplyItemContextValue {
  props: ReplyItemProps;
  reducer: [ReplyItemState, React.Dispatch<ReplyItemAction>];
}

export const ReplyItemContext = createContext<ReplyItemContextValue | null>(
    null
)

export const ReplyItem = (props: ReplyItemProps) => {
    const { postCommentReply } = props
    const { creator, createdAt, content, postCommentReplyId, updatedAt } =
    postCommentReply
    const { avatarId, username } = creator

    const { swrs } = useContext(RepliesContext)!
    const { postCommentRepliesSwr } = swrs
    const { mutate } = postCommentRepliesSwr

    const reducer = useReplyItemReducer()
    const [state, dispatch] = reducer

    const replyItemContextValue: ReplyItemContextValue = useMemo(
        () => ({
            props,
            reducer,
        }),
        [props, reducer]
    )

    const formik = useFormik({
        initialValues: {
            previousContent: "",
            content: "",
        },
        onSubmit: async ({ content }) => {
            await updatePostCommentReply({
                data: {
                    postCommentReplyId,
                    content,
                },
            })
            await mutate()
            dispatch({
                type: "SET_IS_EDITED",
                payload: false,
            })
        },
    })

    useEffect(() => {
        if (!content) return
        formik.setFieldValue("previousContent", content)
        formik.setFieldValue("content", content)
    }, [content])

    console.log(state)

    const hasChanged = formik.values.previousContent === formik.values.content

    const onDiscardChange = () =>
        formik.setFieldValue("content", formik.values.previousContent)

    const isEdited = updatedAt !== createdAt

    return (
        <ReplyItemContext.Provider value={replyItemContextValue}>
            <div className="flex gap-2 group/reply">
                <Avatar size="sm" src={getAssetUrl(avatarId)} />
                <div className="flex-1">
                    {state.isEdited ? (
                        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                            <Input
                                size="sm"
                                placeholder="Edit this reply..."
                                label=""
                                variant="underlined"
                                color="primary"
                                id="content"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                classNames={{
                                    inputWrapper: "!px-0 border-b",
                                    innerWrapper: "pb-0",
                                }}
                                labelPlacement="outside"
                                className="flex-1"
                                endContent={
                                    <div className="flex flex-row-reverse gap-2 w-full">
                                        <Link
                                            isDisabled={hasChanged}
                                            onPress={formik.submitForm}
                                            as="button"
                                            size="sm"
                                        >
                                            <SaveIcon size={20} strokeWidth={3 / 2} />
                                        </Link>
                                        <Link as="button" size="sm" onPress={onDiscardChange}>
                                            <ClipboardXIcon size={20} strokeWidth={3 / 2} />
                                        </Link>
                                    </div>
                                }
                            />
                        </form>
                    ) : (
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-sm"> {username} </div>
                                    <div className="text-xs text-foreground-500 flex gap-2 items-center">
                                        <div>{parseTimeAgo(updatedAt)}</div>
                                        <div>{isEdited ? "Edited" : ""}</div>
                                    </div>
                                </div>
                                <MoreButton className="transition-opacity opacity-0 group-hover/reply:opacity-100" />
                            </div>
                            <Spacer y={1} />
                            <div className="text-sm">{content}</div>
                        </>
                    )}
                </div>
            </div>
        </ReplyItemContext.Provider>
    )
}
