"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { ContentType, WithKey } from "@common"
import { ContentData } from "../useContentsEditorReducer"
import { ContentsEditorContext } from "../ContentsEditorProviders"
import { AddContentBoxContext } from "./AddContentBoxProviders"

export const FormikContext = createContext<FormikProps<FormikValues> | null>(
    null
)

interface FormikValues {
  text: string;
  code: string;
  link: string;
  images: Array<WithKey<File>>;
  videos: Array<WithKey<File>>;
}

const initialValues: FormikValues = {
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
    const { dispatch } = useContext(
        ContentsEditorContext
    )!
    const { state: addContentBoxState } = useContext(
        AddContentBoxContext
    )!
    const { contentSelected } = addContentBoxState

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({
                text,
                code,
                link,
                images,
                videos,
            }, helpers) => {
                const contentSelectedToPostContentData: Record<
          ContentType,
          ContentData
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
                contentMedias: images,
                contentType: ContentType.Images,
            },
            [ContentType.Videos]: {
                contentMedias: videos,
                contentType: ContentType.Videos,
            },
        }
                const postContentData = contentSelectedToPostContentData[contentSelected]
                dispatch({
                    type: "APPEND_CONTENT",
                    payload: postContentData,
                })
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
