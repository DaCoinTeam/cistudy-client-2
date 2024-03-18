"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { AppendKey, Media } from "@common"
import { createPostComment } from "@services"
import { PostCardContext } from "../../../.."
import { CommentsModalContext } from "../../CommentsModalProvider"

interface FormikValues {
    html: string
    postCommentMedias: Array<AppendKey<Media>>
}

interface CreateCommentModalContextValue {
    formik: FormikProps<FormikValues>
}

export const CreateCommentModalContext = createContext<CreateCommentModalContextValue | null>(
    null
)

const initialValues: FormikValues = {
    html: "",
    postCommentMedias: []
}

const WrappedCreateCommentModalProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => (
    <CreateCommentModalContext.Provider value={{formik}}>
        <Form onSubmit={formik?.handleSubmit}>{children}</Form>
    </CreateCommentModalContext.Provider>
)

export const CreateCommentModalProvider = ({ children, onClose }: { children: ReactNode, onClose: () => void }) => {
    const { props } = useContext(PostCardContext)!
    const { post } = props
    const { postId } = post

    const { swrs } = useContext(CommentsModalContext)!
    const { postCommentsSwr } = swrs
    const { mutate } = postCommentsSwr

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ html, postCommentMedias: postCommentMediasRaw }, helpers) => {
                let countIndex = 0
                const files: Array<File> = []     
                
                const postCommentMedias = postCommentMediasRaw.map(({mediaType, file}) => {
                    const result = {
                        mediaIndex: countIndex,
                        mediaType
                    }

                    countIndex ++
                    files.push(file)

                    return result
                })

                await createPostComment({
                    data: {
                        postId,
                        html,
                        postCommentMedias
                    },
                    files
                })

                await mutate()
                helpers.resetForm()
                onClose()
            }}
        >
            {(formik) => (
                <WrappedCreateCommentModalProvider formik={formik}>
                    {children}
                </WrappedCreateCommentModalProvider>
            )}
        </Formik>
    )
}
