"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { AppendKey, Media } from "@common"
import { createPost } from "@services"
import { ForumLayoutContext } from "../../ForumLayoutProvider"
import { HomeContext } from "../../../../../_hooks"
import { RootContext } from "../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../_components"

interface CreatePostModalProps {
  formik: FormikProps<FormikValues>;
}

interface FormikValues {
  title: string;
  html: string;
  postMedias: Array<AppendKey<Media>>;
}

export const CreatePostModalContext =
  createContext<CreatePostModalProps | null>(null)

const initialValues: FormikValues = {
    title: "",
    html: "",
    postMedias: [],
}

const WrappedCreatePostModalProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => (
    <CreatePostModalContext.Provider value={{ formik }}>
        <Form onSubmit={formik?.handleSubmit}>{children}</Form>
    </CreatePostModalContext.Provider>
)

export const CreatePostModalProvider = ({
    children,
    onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
    const { swrs } = useContext(HomeContext)!
    const { courseHomeSwr } = swrs
    const { data: courseHome } = courseHomeSwr

    const { swrs: middleLayoutSwrs } = useContext(ForumLayoutContext)!
    const { postsSwr } = middleLayoutSwrs
    const { mutate } = postsSwr
    const { notify } = useContext(RootContext)!

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ title, html, postMedias: postMediasRaw }, {resetForm}) => {
                if (!courseHome) return
                const { courseId } = courseHome

                let countIndex = 0
                const files: Array<File> = []

                const postMedias = postMediasRaw.map(({ mediaType, file }) => {
                    const result = {
                        mediaIndex: countIndex,
                        mediaType,
                    }

                    countIndex++
                    files.push(file)

                    return result
                })
                const {others} = await createPost({
                    data: {
                        courseId,
                        title,
                        html,
                        postMedias,
                    },
                    files,
                })
                if(others.earnAmount){
                   
                notify!({
                    type: ToastType.Earn,
                    data: {
                        earnAmount: others.earnAmount
                    }
                })
                }
                await mutate()
                resetForm()
                onClose()
            }}
        >
            {(formik) => (
                <WrappedCreatePostModalProvider formik={formik}>
                    {children}
                </WrappedCreatePostModalProvider>
            )}
        </Formik>
    )
}
