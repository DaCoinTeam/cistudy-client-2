"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, } from "react"
import { signIn } from "@services"
import * as Yup from "yup"
import { RootContext } from "../../../../_hooks"
import { NavbarContext } from "../../NavbarProvider"

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

const WrappedFormikProvider = ({ formik, children }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
}) => (
    <SignInTabContext.Provider value={{formik}}>
        <Form onSubmit={formik.handleSubmit}>{children}</Form>
    </SignInTabContext.Provider>
)

export const SignInTabProvider = ({ children }: { children: ReactNode }) => {
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { mutate } = profileSwr

    const { disclosures } = useContext(NavbarContext)!
    const { authModalDisclosure } = disclosures
    const { onClose } = authModalDisclosure

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
                accountId: true,
                birthdate: true
            })
            await mutate(response)
            onClose()
        }}
        >
            {(formik) => (
                <WrappedFormikProvider formik={formik}> {children}</WrappedFormikProvider>
            )}
        </Formik>
    )
}