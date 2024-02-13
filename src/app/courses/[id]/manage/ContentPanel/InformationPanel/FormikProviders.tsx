"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useEffect, } from "react"

import * as Yup from "yup"
import { CourseDetailsContext } from "../../../_hooks"
export const FormikContext = createContext<FormikProps<IFormikValues> | null>(
    null
)

interface IFormikValues {
    title: string,
}

const initialValues: IFormikValues = {
    title: "",
}

const WrappedFormikProviders = ({ formik, children }: {
    formik: FormikProps<IFormikValues> | null;
    children: ReactNode;
}) => {
    const { state } = useContext(CourseDetailsContext)!
    useEffect(() => {
        if (!state.finishFetch) return 
        if (formik === null) return 
        const { course } = state
        const { title } = course!
        formik.setFieldValue("title", title)
    }, [state.finishFetch])
    return (
        <FormikContext.Provider value={formik}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </FormikContext.Provider>
    )
}

export const FormikProviders = ({ children }: { children: ReactNode }) => {
    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({
                title: Yup.string().required("Title is required"),
            })
        }
        onSubmit={async () => {
            // do nothing
        }}
        >
            {(formik) => (
                <WrappedFormikProviders formik={formik}> {children}</WrappedFormikProviders>
            )}
        </Formik>
    )
}