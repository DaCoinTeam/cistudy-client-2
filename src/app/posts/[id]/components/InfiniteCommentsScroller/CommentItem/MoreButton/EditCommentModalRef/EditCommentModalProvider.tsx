"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { AppendKey, Media } from "@common"
import { updatePostComment } from "@services"
import { CommentItemContext } from "../.."
import { PostDetailContext } from "../../../../../hooks"

interface FormikValues {
  html: string;
  postCommentMedias: Array<AppendKey<Media>>;
}

interface EditCommentModalContextValue {
  formik: FormikProps<FormikValues>;
}

export const EditCommentModalContext =
  createContext<EditCommentModalContextValue | null>(null)

const initialValues: FormikValues = {
    html: "",
    postCommentMedias: [],
}

const WrappedEditCommentModalProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    return (
        <EditCommentModalContext.Provider value={{ formik }}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </EditCommentModalContext.Provider>
    )
}

export const EditCommentModalProvider = ({
    children,
    onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
    const { props } = useContext(CommentItemContext)!
    const { postComment } = props
    const { postCommentId } = postComment

    const { swrs } = useContext(PostDetailContext)!
    const { postCommentsSwr } = swrs
    const { mutate } = postCommentsSwr

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (
                { html, postCommentMedias: postCommentMediasRaw },
                helpers
            ) => {
                let countIndex = 0
                const files: Array<File> = []

                const postCommentMedias = postCommentMediasRaw.map(
                    ({ mediaType, file }) => {
                        const result = {
                            mediaIndex: countIndex,
                            mediaType,
                        }

                        countIndex++
                        files.push(file)

                        return result
                    }
                )

                await updatePostComment({
                    data: {
                        postCommentId,
                        html,
                        postCommentMedias,
                    },
                    files,
                })

                await mutate()
                helpers.resetForm()
                onClose()
            }}
        >
            {(formik) => (
                <WrappedEditCommentModalProvider formik={formik}>
                    {children}
                </WrappedEditCommentModalProvider>
            )}
        </Formik>
    )
}
