"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import { signUp } from "@services"
import { parseISODateString } from "@common"

import * as Yup from "yup"
import { NavbarContext } from "../../NavbarProvider"

export interface SignUpTabContextValue {
  formik: FormikProps<FormikValues>;
}

export const SignUpTabContext = createContext<SignUpTabContextValue | null>(
    null
)

interface FormikValues {
  email: string;
  password: string;
  confirm: string;
  firstName: string;
  lastName: string;
  birthdate: string;
}

const initialValues: FormikValues = {
    email: "",
    password: "",
    confirm: "",
    firstName: "",
    lastName: "",
    birthdate: parseISODateString(),
}

const WrappedSignUpTabProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => (
    <SignUpTabContext.Provider value={{ formik }}>
        <Form onSubmit={formik?.handleSubmit}>{children}</Form>
    </SignUpTabContext.Provider>
)

export const SignUpTabProvider = ({ children }: { children: ReactNode }) => {
    
    const { disclosures } = useContext(NavbarContext)!
    const { authModalDisclosure } = disclosures
    const { onClose } = authModalDisclosure

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email("Invalid email")
                    .required("Email is required"),
                password: Yup.string().required("Password is required"),
                confirm: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Confirm must match password"
                ),
                firstName: Yup.string().required("First name is required"),
                lastName: Yup.string().required("Last name is required"),
                birthdate: Yup.date().max(new Date(), "Birthdate must be in the past"),
            })}
            onSubmit={async ({ email, password, firstName, lastName, birthdate }) => {
                await signUp({
                    email,
                    password,
                    firstName,
                    lastName,
                    birthdate,
                })
                onClose()
            }}
        >
            {(formik) => (
                <WrappedSignUpTabProvider formik={formik}>
                    {children}
                </WrappedSignUpTabProvider>
            )}
        </Formik>
    )
}