"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, } from "react"
import { PostContentEntity } from "@common"
import * as Yup from "yup"

export const FormikContext = createContext<FormikProps<FormikValues> | null>(
    null
)

interface FormikValues {
    contents: Array<Partial<PostContentEntity>>,
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
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().required("Password is required"),
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