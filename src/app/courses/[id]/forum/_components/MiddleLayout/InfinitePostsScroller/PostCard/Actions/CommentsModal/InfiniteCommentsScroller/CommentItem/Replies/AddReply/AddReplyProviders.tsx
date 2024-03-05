"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { createPostCommentReply } from "@services"
import { RepliesContext } from "../RepliesProviders"
import { CommentItemContext } from "../.."

interface AddReplyProps {
  formik: FormikProps<FormikValues>;
}

interface FormikValues {
  content: string;
}

export const AddReplyContext = createContext<AddReplyProps | null>(null)

const initialValues: FormikValues = {
    content: "",
}

const WrappedAddReplyProviders = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => (
    <AddReplyContext.Provider value={{ formik }}>
        <Form onSubmit={formik?.handleSubmit}>{children}</Form>
    </AddReplyContext.Provider>
)

export const AddReplyProviders = ({ children }: { children: ReactNode }) => {
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
                <WrappedAddReplyProviders formik={formik}>
                    {children}
                </WrappedAddReplyProviders>
            )}
        </Formik>
    )
}
