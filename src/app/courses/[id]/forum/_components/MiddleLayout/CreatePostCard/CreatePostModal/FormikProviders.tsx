"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext } from "react"
import * as Yup from "yup"

export const FormikContext = createContext<FormikProps<FormikValues> | null>(
    null
)

interface FormikValues {
  title: string;
}

const initialValues: FormikValues = {
    title: "",
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
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                title: Yup.string().required("Title is required"),
            })}
            onSubmit={() => {}}
        >
            {(formik) => (
                <WrappedFormikProviders formik={formik}>
                    {children}
                </WrappedFormikProviders>
            )}
        </Formik>
    )
}
