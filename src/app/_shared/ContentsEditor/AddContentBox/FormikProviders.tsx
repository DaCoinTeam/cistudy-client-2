"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { ContentType } from "@common"
import { PostContent } from "../useContentsEditorReducer"
import { ContentsEditorContext } from "../ContentsEditorProviders"

export const FormikContext = createContext<FormikProps<FormikValues> | null>(
    null
)

interface FormikValues {
  contentSelected: ContentType;
  text: string;
  code: string;
  link: string;
  images: Array<File>;
  videos: Array<File>;
}

const initialValues: FormikValues = {
    contentSelected: ContentType.Text,
    text: "",
    code: "",
    link: "",
    images: [],
    videos: [],
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
    const { dispatch: contentsEditorDispatch } = useContext(
        ContentsEditorContext
    )!

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({
                contentSelected,
                text,
                code,
                link,
                images,
                videos,
            }) => {
                const contentSelectedToPostContent: Record<
          ContentType,
          Pick<PostContent, "contentType" | "text" | "postContentMedias">
        > = {
            [ContentType.Text]: {
                text,
                contentType: ContentType.Text,
            },
            [ContentType.Code]: {
                text: code,
                contentType: ContentType.Code,
            },
            [ContentType.Link]: {
                text: link,
                contentType: ContentType.Link,
            },
            [ContentType.Images]: {
                postContentMedias: images,
                contentType: ContentType.Images,
            },
            [ContentType.Videos]: {
                postContentMedias: videos,
                contentType: ContentType.Videos,
            },
        }
                const postContent = contentSelectedToPostContent[contentSelected]
                contentsEditorDispatch({
                    type: "APPEND_POST_CONTENT",
                    payload: postContent,
                })
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
