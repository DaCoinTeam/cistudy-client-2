"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, } from "react"
import { signIn } from "@services"
import { isErrorResponse } from "@common"
import { AppDispatch, setProfile } from "@redux"
import { useDispatch } from "react-redux"
import * as Yup from "yup"

export const FormikContext = createContext<FormikProps<IFormikValues> | null>(
    null
)

interface IFormikValues {
    email: string,
    password: string
}

const initialValues: IFormikValues = {
    email: "",
    password: ""
}

const WrappedFormikProviders = ({ formik, children }: {
    formik: FormikProps<IFormikValues> | null;
    children: ReactNode;
}) => (
    <FormikContext.Provider value={formik}>
        <Form onSubmit={formik?.handleSubmit}>{children}</Form>
    </FormikContext.Provider>
)

export const FormikProviders = ({ children }: { children: ReactNode }) => {
    const dispatch: AppDispatch = useDispatch()
    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().required("Password is required"),
            })
        }
        onSubmit={async ({ email, password }) => {
            const response = await signIn({
                email,
                password
            })
            if (!isErrorResponse(response)) {
                dispatch(setProfile(response))
            } else {
                console.log(response)
            }
        }}
        >
            {(formik) => (
                <WrappedFormikProviders formik={formik}> {children}</WrappedFormikProviders>
            )}
        </Formik>
    )
}