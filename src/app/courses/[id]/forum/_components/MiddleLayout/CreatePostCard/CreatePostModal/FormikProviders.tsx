"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, } from "react"
import { ContentType } from "@common"
import * as Yup from "yup"

export const FormikContext = createContext<FormikProps<FormikValues> | null>(
    null
)

export interface PostContent {
    index: number,
    value: string | Array<File>,
    contentType: ContentType
}

interface FormikValues {
    contents: Array<PostContent>,
}

const initialValues: FormikValues = {
    contents: [],
}

const WrappedFormikProviders = ({ formik, children }: {
    formik: FormikProps<FormikValues> | null;
    children: ReactNode;
}) => (
    <FormikContext.Provider value={formik}>
        <Form onSubmit={formik?.handleSubmit}>{children}</Form>
    </FormikContext.Provider>
)

export const FormikProviders = ({ children }: { children: ReactNode }) => {
    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({
            })
        }
        onSubmit={async ({ contents }) => {
            // const response = await signIn({
            //     email,
            //     password
            // })
            // if (!isErrorResponse(response)) {
            //     dispatch(setProfile(response))
            // } else {
            //     console.log(response)
            // }
        }}
        >
            {(formik) => (
                <WrappedFormikProviders formik={formik}> {children}</WrappedFormikProviders>
            )}
        </Formik>
    )
}