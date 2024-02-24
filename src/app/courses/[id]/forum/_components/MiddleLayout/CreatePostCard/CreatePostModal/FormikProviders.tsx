"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import * as Yup from "yup"
import { CourseDetailsContext } from "../../../../../_hooks"
import { EditorState } from "draft-js"

export const FormikContext = createContext<FormikProps<FormikValues> | null>(
    null
)

interface FormikValues {
  title: string;
  content: string,
}

const initialValues: FormikValues = {
    title: "",
    content: ""
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
            onSubmit={async ({title, content}, helpers) => {
                if (course === null) return 
                const { courseId } = course

                let countIndex = 0
                const files: Array<File> = []
                // const postContents = contents.map((content) => {
                //     const { contentType, text, contentMedias } = content
                //     if (
                //         contentType === ContentType.Text
                //     ) {
                //         return {
                //             text,
                //             contentType,
                //         }
                //     } else {
                //         return {
                //             contentType: contentType,
                //             postContentMedias: contentMedias?.map((contentMedia) => {
                //                 const media = {
                //                     mediaIndex: countIndex,
                //                 }
                //                 files.push(contentMedia.data)
                //                 countIndex++
                //                 return media
                //             }),
                //         }
                //     }
                // })
                // const response = await createPost({
                //     data: {
                //         courseId,
                //         title,
                //         postContents,
                //     },
                //     files,
                // })

                // if (!isErrorResponse(response)) {
                //     alert("Successfully")
                // } else {
                //     console.log(response)
                // }
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
