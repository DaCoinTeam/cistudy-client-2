"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, } from "react"
import { signIn } from "@services"
import * as Yup from "yup"
import { RootContext } from "../../../../_hooks"
import { NavbarContext } from "../../NavbarProviders"

interface SignInTabContextValue {
    formik: FormikProps<FormikValues>
}

export const SignInTabContext = createContext<SignInTabContextValue | null>(
    null
)

interface FormikValues {
    email: string,
    password: string
}

const initialValues: FormikValues = {
    email: "",
    password: ""
}

const WrappedFormikProviders = ({ formik, children }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
}) => (
    <SignInTabContext.Provider value={{formik}}>
        <Form onSubmit={formik.handleSubmit}>{children}</Form>
    </SignInTabContext.Provider>
)

export const SignInTabProviders = ({ children }: { children: ReactNode }) => {
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { mutate } = profileSwr

    const { dispatch } = useContext(NavbarContext)!

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().required("Password is required"),
            })
        }
        onSubmit={async ({ email, password }) => {
            const response = await signIn({
                params: {
                    email,
                    password
                }

            }, {
                avatarId: true,
                coverPhotoId: true,
                email: true,
                userId: true,
                birthdate: true
            })
            await mutate(response)
            dispatch({
                type: "SET_IS_AUTH_MODAL_OPEN",
                payload: false
            })
        }}
        >
            {(formik) => (
                <WrappedFormikProviders formik={formik}> {children}</WrappedFormikProviders>
            )}
        </Formik>
    )
}