"use client"
import { createPostCommentReply } from "@services"
import { Form, Formik, FormikProps } from "formik"
import { ReactNode, createContext, useContext } from "react"
import { CommentItemContext } from "../.."
import { RepliesContext } from "../RepliesProvider"

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

const WrappedCreateReplyProvider = ({
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

export const CreateReplyProvider = ({ children }: { children: ReactNode }) => {
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
                <WrappedCreateReplyProvider formik={formik}>
                    {children}
                </WrappedCreateReplyProvider>
            )}
        </Formik>
    )
}
