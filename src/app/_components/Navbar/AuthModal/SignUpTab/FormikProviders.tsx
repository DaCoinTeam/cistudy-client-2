"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, } from "react"
import { signUp } from "@services"
import { isErrorResponse, parseISODateString } from "@common"

import * as Yup from "yup"
export const FormikContext = createContext<FormikProps<FormikValues> | null>(
    null
)

interface FormikValues {
    email: string,
    password: string
    confirm: string
    firstName: string
    lastName: string
    birthdate: string
}

const initialValues: FormikValues = {
    email: "",
    password: "",
    confirm: "",
    firstName: "",
    lastName: "",
    birthdate: parseISODateString()
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
                confirm: Yup.string().oneOf([Yup.ref("password")], "Confirm must match password"),
                firstName: Yup.string().required("First name is required"),
                lastName: Yup.string().required("Last name is required"),
                birthdate: Yup.date().max(new Date(), "Birthdate must be in the past")
            })
        }
        onSubmit={async ({ email, password, firstName, lastName, birthdate }) => {
            const response = await signUp({
                email,
                password,
                firstName,
                lastName,
                birthdate
            })
            if (!isErrorResponse(response)) {
                console.log(response)
                // thông báo thành công
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