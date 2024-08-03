"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { AppendKey, Media } from "@common"
import { updatePost } from "@services"
import { PostDetailContext } from "../../../hooks"

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

const WrappedEditPostModalProvider = ({
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

export const EditPostModalProvider = ({
    children,
    onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
    const { swrs } = useContext(PostDetailContext)!
    const { postSwr } = swrs
    const { mutate, data } = postSwr
    const {postId} = {...data}

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
                        postId: postId?? "",
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
                <WrappedEditPostModalProvider formik={formik}>
                    {children}
                </WrappedEditPostModalProvider>
            )}
        </Formik>
    )
}
