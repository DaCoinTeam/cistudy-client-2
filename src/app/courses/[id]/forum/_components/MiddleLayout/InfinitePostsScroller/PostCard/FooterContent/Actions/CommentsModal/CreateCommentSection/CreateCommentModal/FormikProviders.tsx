"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import * as Yup from "yup"
import { AppendKey, Media, isErrorResponse } from "@common"
import { createComment } from "@services"
import { PostCardContext } from "../../../../../index"
import { CommentsModalContext } from "../../CommentsModalProviders"

export const FormikContext = createContext<FormikProps<FormikValues> | null>(
    null
)

interface FormikValues {
    html: string
    postCommentMedias: Array<AppendKey<Media>>
}

const initialValues: FormikValues = {
    html: "",
    postCommentMedias: []
}

const WrappedFormikProviders = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues> | null;
  children: ReactNode;
}) => (
    <FormikContext.Provider value={formik}>
        <Form onSubmit={formik?.handleSubmit}>{children}</Form>
    </FormikContext.Provider>
)

export const FormikProviders = ({ children }: { children: ReactNode }) => {
    const { state } = useContext(PostCardContext)!
    const { post } = state

    const { functions } = useContext(CommentsModalContext)!
    const { fetchAndSetPostComments } = functions

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
            })}
            onSubmit={async ({ html, postCommentMedias: postCommentMediasRaw }, helpers) => {
                if (post === null) return 
                const { postId } = post

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

                const response = await createComment({
                    data: {
                        postId,
                        html,
                        postCommentMedias
                    },
                    files
                })

                if (!isErrorResponse(response)) {
                    await fetchAndSetPostComments()
                } else {
                    console.log(response)
                }

                helpers.resetForm()
            }}
        >
            {(formik) => (
                <WrappedFormikProviders formik={formik}>
                    {children}
                </WrappedFormikProviders>
            )}
        </Formik>
    )
}
