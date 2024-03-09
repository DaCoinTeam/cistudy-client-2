import { Avatar, Input, Link, Spacer } from "@nextui-org/react"
import React, { createContext, useContext, useEffect, useMemo } from "react"
import { PostCommentReplyEntity, parseTimeAgo } from "@common"
import { getAssetUrl, updatePostCommentReply } from "@services"
import { MoreButton } from "./MoreButton"
import { useFormik } from "formik"
import { RepliesContext } from "../RepliesProviders"
import { SaveIcon } from "lucide-react"

interface ReplyItemProps {
  postCommentReply: PostCommentReplyEntity;
}

interface ReplyItemContextValue {
  props: ReplyItemProps;
}

export const ReplyItemContext = createContext<ReplyItemContextValue | null>(
    null
)

export const ReplyItem = (props: ReplyItemProps) => {
    const { postCommentReply } = props
    const { creator, createdAt, content, postCommentReplyId, updatedAt } =
    postCommentReply
    const { avatarId, username } = creator

    const { swrs, reducer } = useContext(RepliesContext)!
    const { postCommentRepliesSwr } = swrs
    const { mutate } = postCommentRepliesSwr

    const [state, dispatch] = reducer

    const replyItemContextValue: ReplyItemContextValue = useMemo(
        () => ({
            props,
        }),
        [props]
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
                type: "SET_EDITED_POST_COMMENT_REPLY_ID",
                payload: null,
            })
        },
    })

    useEffect(() => {
        if (!content) return
        formik.setFieldValue("previousContent", content)
        formik.setFieldValue("content", content)
    }, [content])


    const hasChanged = formik.values.previousContent === formik.values.content

    const onDiscardChange = () =>
    {
        formik.setFieldValue("content", formik.values.previousContent)
        dispatch({
            type: "SET_EDITED_POST_COMMENT_REPLY_ID",
            payload: null
        })
    }
      

    const isEdited = updatedAt !== createdAt

    return (
        <ReplyItemContext.Provider value={replyItemContextValue}>
            <div className="flex gap-2 group/reply">
                <Avatar size="sm" src={getAssetUrl(avatarId)} />
                <div className="flex-1">
                    {state.editedPostCommentReplyId === postCommentReplyId ? (
                        <div>
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
                                        <Link
                                            isDisabled={hasChanged}
                                            onPress={formik.submitForm}
                                            as="button"
                                            size="sm"
                                        >
                                            <SaveIcon size={20} strokeWidth={3 / 2} />
                                        </Link>
                                    }
                                />
                            </form>
                            <Link as="button" onPress={onDiscardChange} className="text-xs">
                            Cancel
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold text-sm"> {username} </div>
                                    <div className="text-xs text-foreground-500 flex gap-2 items-center">
                                        <div>{parseTimeAgo(updatedAt)}</div>
                                        {isEdited ? <div>Edited</div> : null}
                                    </div>
                                </div>
                                <MoreButton className="transition-opacity opacity-0 group-hover/reply:opacity-100" />
                            </div>
                            <Spacer y={0.5} />
                            <div className="text-sm">{content}</div>
                        </>
                    )}
                </div>
            </div>
        </ReplyItemContext.Provider>
    )
}
