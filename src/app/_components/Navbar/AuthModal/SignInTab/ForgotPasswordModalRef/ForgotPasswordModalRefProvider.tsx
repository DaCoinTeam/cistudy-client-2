"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import * as Yup from "yup"
import { RootContext } from "../../../../../_hooks" 
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { forgotPassword, ForgotPasswordInput, ForgotPasswordOutput } from "@services"
import { ToastType } from "../../../../ToastRef"
import { ErrorResponse } from "@common"

interface ForgotPasswordModalRefValue {
    formik: FormikProps<FormikValues>
    swrs: {
        forgotPasswordSwrMutation: SWRMutationResponse<ForgotPasswordOutput, ErrorResponse, "FORGOT_PASSWORD", ForgotPasswordInput>
    }
}

export const ForgotPasswordModalRefContext = createContext<ForgotPasswordModalRefValue | null>(
    null
)

interface FormikValues {
    email: string,
}

const initialValues: FormikValues = {
    email: "",
}

const WrappedFormikProvider = ({ formik, children, swrs }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
    swrs: {
        forgotPasswordSwrMutation: SWRMutationResponse<ForgotPasswordOutput, ErrorResponse, "FORGOT_PASSWORD", ForgotPasswordInput>
    }
}) => {
    const forgotPasswordModalRefValue: ForgotPasswordModalRefValue = useMemo(
        () => ({
            formik,
            swrs
        }),
        [formik, swrs]
    )
    
    return (
        <ForgotPasswordModalRefContext.Provider value={forgotPasswordModalRefValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </ForgotPasswordModalRefContext.Provider>
    )
}

export const ForgotPasswordModalRefProvider = ({ children }: { children: ReactNode }) => {
    const { notify } = useContext(RootContext)!

    const forgotPasswordSwrMutation = useSWRMutation(
        "FORGOT_PASSWORD",
        async(_: string, {arg} : {arg: ForgotPasswordInput}) => {
            return await forgotPassword(arg)
        }
    )

    const {trigger} = forgotPasswordSwrMutation

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({
                email: Yup.string().email("Invalid email").required("Email is required"),
            })
        }
        onSubmit={async ({ email }) => {
            try {
                await trigger({email})
                notify!({
                    data: {
                        message: "Forgot password mail sent"
                    },
                    type: ToastType.Success
                })
            } catch (ex) {
                const {message} = ex as ErrorResponse
                notify!({
                    data: {
                        error: message as string
                    },
                    type: ToastType.Error
                })
            }
        }}
        >
            {(formik) => (
                <WrappedFormikProvider formik={formik} swrs={{forgotPasswordSwrMutation}}>
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}