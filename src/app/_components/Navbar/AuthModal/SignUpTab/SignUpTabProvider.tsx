"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import { signUp, SignUpInput, SignUpOutput } from "@services"
import { ErrorResponse, parseISODateString } from "@common"

import * as Yup from "yup"
import { NavbarContext } from "../../NavbarProvider"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { ToastType } from "../../../ToastRef"
import { RootContext } from "../../../../_hooks"

export interface SignUpTabContextValue {
  formik: FormikProps<FormikValues>;
  swrs: {
    signUpTabSwrMutation: SWRMutationResponse<SignUpOutput, ErrorResponse, "SIGN_UP", SignUpInput>
  }
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
    swrs
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
  swrs: {
    signUpTabSwrMutation: SWRMutationResponse<SignUpOutput, ErrorResponse, "SIGN_UP", SignUpInput>
  }
}) => {

    const signUpTabContextValue: SignUpTabContextValue = useMemo(
        () => ({
            formik,
            swrs
        }),
        [formik, swrs]
    )

    return (
        <SignUpTabContext.Provider value={signUpTabContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </SignUpTabContext.Provider>
    )
}

export const SignUpTabProvider = ({ children }: { children: ReactNode }) => {
    const { disclosures } = useContext(NavbarContext)!
    const { authModalDisclosure } = disclosures
    const { onClose } = authModalDisclosure

    const { notify } = useContext(RootContext)!

    const fetchSignUpTabMutation = async (_: string, { arg } : {arg : SignUpInput}) => {
        return await signUp(arg)
    }

    const signUpTabSwrMutation = useSWRMutation(
        "SIGN_UP",
        fetchSignUpTabMutation
    )

    const {trigger} = signUpTabSwrMutation

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
                const signUpData = {
                    email,
                    password,
                    firstName,
                    lastName,
                    birthdate
                }
                try {
                    const { message } = await trigger(signUpData)
                    console.log(message)
                    notify!({
                        data: {
                            message
                        },
                        type: ToastType.Success
                    })
                    onClose()
                } catch (ex) {
                    const { message } = ex as ErrorResponse
                    notify!({
                        data: {
                            error: message as string
                        },
                        type: ToastType.Error
                    })
                }
                // await signUp({
                //     email,
                //     password,
                //     firstName,
                //     lastName,
                //     birthdate,
                // })
                // onClose()
            }}
        >
            {(formik) => (
                <WrappedSignUpTabProvider formik={formik} swrs={{signUpTabSwrMutation}}>
                    {children}
                </WrappedSignUpTabProvider>
            )}
        </Formik>
    )
}
