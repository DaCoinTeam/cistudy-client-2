"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { AppendKey, Media } from "@common"
import { updatePost } from "@services"
import { PostCardContext } from "../.."
import { MiddleLayoutContext } from "../../../../MiddleLayoutProviders"

interface FormikValues {
  title: string;
  html: string;
  postMedias: Array<AppendKey<Media>>;
}

interface EditPostModalContextValue {
  formik: FormikProps<FormikValues>;
}

export const EditPostModalContext =
  createContext<EditPostModalContextValue | null>(null)

const initialValues: FormikValues = {
    title: "",
    html: "",
    postMedias: [],
}

const WrappedEditPostModalProviders = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    return (
        <EditPostModalContext.Provider value={{ formik }}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </EditPostModalContext.Provider>
    )
}

export const EditPostModalProviders = ({
    children,
    onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
    const { props } = useContext(PostCardContext)!
    const { post } = props
    const { postId } = post

    const { swrs } = useContext(MiddleLayoutContext)!
    const { postsSwr } = swrs
    const { mutate } = postsSwr

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (
                { html, postMedias: postMediasRaw, title },
                helpers
            ) => {
                let countIndex = 0
                const files: Array<File> = []

                const postMedias = postMediasRaw.map(
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

                await updatePost({
                    data: {
                        postId,
                        title,
                        html,
                        postMedias,
                    },
                    files,
                })

                await mutate()
                helpers.resetForm()
                onClose()
            }}
        >
            {(formik) => (
                <WrappedEditPostModalProviders formik={formik}>
                    {children}
                </WrappedEditPostModalProviders>
            )}
        </Formik>
    )
}
