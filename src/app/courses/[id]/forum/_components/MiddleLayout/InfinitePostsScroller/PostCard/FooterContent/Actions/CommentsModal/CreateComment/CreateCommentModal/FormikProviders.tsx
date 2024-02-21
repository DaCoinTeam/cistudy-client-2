"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext } from "react"
import { ContentType } from "@common"
import * as Yup from "yup"

export const FormikContext = createContext<FormikProps<FormikValues> | null>(
    null
)

export interface PostContent {
  index: number;
  value: string | Array<File>;
  contentType: ContentType;
}

interface FormikValues {
  title: string;
  contents: Array<PostContent>;
}

const initialValues: FormikValues = {
    title: "",
    contents: [],
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
    // const { state } = useContext(CourseDetailsContext)!
    // const { course } = state

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                title: Yup.string().required("Title is required"),
            })}
            onSubmit={async ({ title, contents }) => {
            //     if (course === null) return
            //     const { courseId } = course

            //     let countIndex = 0
            //     const files: Array<File> = []
                
            //     const postContents = contents.map((content) => {
            //         const { contentType, value } = content
            //         if (
            //             contentType === ContentType.Text ||
            // contentType === ContentType.Code ||
            // contentType === ContentType.Link
            //         ) {
            //             return {
            //                 text: value as string,
            //                 contentType: content.contentType,
            //             }
            //         } else {
            //             const mediaFiles = value as Array<File>
            //             return {
            //                 contentType: content.contentType,
            //                 postContentMedias: mediaFiles.map((mediaFile) => {
            //                     const media = {
            //                         mediaIndex: countIndex,
            //                     }
            //                     files.push(mediaFile)
            //                     countIndex++
            //                     return media
            //                 }),
            //             }
            //         }
            //     })

            //     const response = await createPost({
            //         data: {
            //             title,
            //             courseId,
            //             postContents,
            //         },
            //         files,
            //     })

            //     if (!isErrorResponse(response)) {
            //         // do later
            //     } else {
            //         console.log(response)
            //     }
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
