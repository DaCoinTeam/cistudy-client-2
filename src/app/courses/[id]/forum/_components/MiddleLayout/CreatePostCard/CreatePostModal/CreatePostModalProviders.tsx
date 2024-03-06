"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { CourseDetailsContext } from "../../../../../_hooks"
import { AppendKey, Media } from "@common"
import { createPost } from "@services"
import { MiddleLayoutContext } from "../../MiddleLayoutProviders"

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

const WrappedCreatePostModalProviders = ({
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

export const CreatePostModalProviders = ({
    children,
    onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr

    const { swrs: middleLayoutSwrs } = useContext(MiddleLayoutContext)!
    const { postsSwr } = middleLayoutSwrs
    const { mutate } = postsSwr

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ title, html, postMedias: postMediasRaw }, helpers) => {
                if (!course) return
                const { courseId } = course

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
                await createPost({
                    data: {
                        courseId,
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
                <WrappedCreatePostModalProviders formik={formik}>
                    {children}
                </WrappedCreatePostModalProviders>
            )}
        </Formik>
    )
}
