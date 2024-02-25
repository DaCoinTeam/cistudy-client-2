"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import * as Yup from "yup"
import { CourseDetailsContext } from "../../../../../_hooks"
import { AppendKey, Media, isErrorResponse } from "@common"
import { createPost } from "@services"

export const FormikContext = createContext<FormikProps<FormikValues> | null>(
    null
)

interface FormikValues {
  title: string;
  html: string,
  postMedias: Array<AppendKey<Media>>
}

const initialValues: FormikValues = {
    title: "",
    html: "",
    postMedias: []
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
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                title: Yup.string().required("Title is required"),
            })}
            onSubmit={async ({title, html, postMedias : postMediasRaw}, helpers) => {
                if (course === null) return 
                const { courseId } = course

                let countIndex = 0
                const files: Array<File> = []

                const postMedias = postMediasRaw.map(({mediaType, file}) => {
                    const result = {
                        mediaIndex: countIndex,
                        mediaType
                    }

                    countIndex ++
                    files.push(file)

                    return result
                }
                )
                const response = await createPost({
                    data: {
                        courseId,
                        title,
                        html,
                        postMedias
                    },
                    files,
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
