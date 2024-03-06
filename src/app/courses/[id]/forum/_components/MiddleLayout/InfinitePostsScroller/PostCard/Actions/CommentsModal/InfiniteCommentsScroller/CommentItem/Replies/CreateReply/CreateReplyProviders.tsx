"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { createPostCommentReply } from "@services"
import { RepliesContext } from "../RepliesProviders"
import { CommentItemContext } from "../.."

interface CreateReplyProps {
  formik: FormikProps<FormikValues>;
}

interface FormikValues {
  content: string;
}

export const CreateReplyContext = createContext<CreateReplyProps | null>(null)

const initialValues: FormikValues = {
    content: "",
}

const WrappedCreateReplyProviders = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => (
    <CreateReplyContext.Provider value={{ formik }}>
        <Form onSubmit={formik?.handleSubmit}>{children}</Form>
    </CreateReplyContext.Provider>
)

export const CreateReplyProviders = ({ children }: { children: ReactNode }) => {
    const { props } = useContext(CommentItemContext)!
    const { postComment } = props
    const { postCommentId } = postComment

    const { swrs } = useContext(RepliesContext)!
    const { postCommentRepliesSwr } = swrs
    const { mutate } = postCommentRepliesSwr

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ content }, helpers) => {
                await createPostCommentReply({
                    data: {
                        postCommentId,
                        content,
                    },
                })
                await mutate()
                helpers.resetForm()
            }}
        >
            {(formik) => (
                <WrappedCreateReplyProviders formik={formik}>
                    {children}
                </WrappedCreateReplyProviders>
            )}
        </Formik>
    )
}
