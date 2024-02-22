"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import * as Yup from "yup"
import { Content, ContentType, isErrorResponse } from "@common"
import { createComment } from "@services"
import { PostCardContext } from "../../../../../index"

export const FormikContext = createContext<FormikProps<FormikValues> | null>(
    null
)

interface FormikValues {
  contents: Array<Content>
}

const initialValues: FormikValues = {
    contents: []
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

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
            })}
            onSubmit={async ({contents}, helpers) => {
                if (post === null) return 
                const { postId } = post

                let countIndex = 0
                const files: Array<File> = []     
                const postCommentContents = contents.map((content) => {
                    const { contentType, text, contentMedias } = content
                    if (
                        contentType === ContentType.Text ||
            contentType === ContentType.Code ||
            contentType === ContentType.Link
                    ) {
                        return {
                            text,
                            contentType,
                        }
                    } else {
                        return {
                            contentType: contentType,
                            postCommentContentMedias: contentMedias?.map(
                                contentMedia => {
                                    const media = {
                                        mediaIndex: countIndex
                                    }
                                    files.push(contentMedia.data)
                                    countIndex++
                                    return media
                                }   
                            )
                        }
                    }
                })
                const response = await createComment({
                    data: {
                        postId,
                        postCommentContents
                    },
                    files
                })

                if (!isErrorResponse(response)) {
                    alert("Successfully")
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
