"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useMemo, useRef, } from "react"
import { signIn, SignInInputData, SignInOutputData } from "@services"
import * as Yup from "yup"
import { RootContext } from "../../../../_hooks"
import { NavbarContext } from "../../NavbarProvider"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { ToastRef, ToastRefSelectors, ToastType } from "../../../ToastRef"
import { ErrorResponse } from "@common"

interface SignInTabContextValue {
    formik: FormikProps<FormikValues>
    swrs: {
        signInTabSwrMutation: SWRMutationResponse<SignInOutputData, ErrorResponse, "SIGN_IN", SignInInputData>
    }
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

const WrappedFormikProvider = ({ formik, children, swrs }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
    swrs: {
        signInTabSwrMutation: SWRMutationResponse<SignInOutputData, ErrorResponse, "SIGN_IN", SignInInputData>
    }
}) => {
    const signInTabContextValue: SignInTabContextValue = useMemo(
        () => ({
            formik,
            swrs
        }),
        [formik, swrs]
    )
    
    return (
        <SignInTabContext.Provider value={signInTabContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </SignInTabContext.Provider>
    )
}

export const SignInTabProvider = ({ children }: { children: ReactNode }) => {
    const toastRef = useRef<ToastRefSelectors>(null)
    const { swrs } = useContext(RootContext)!
    const { profileSwr } = swrs
    const { mutate } = profileSwr

    const { disclosures } = useContext(NavbarContext)!
    const { authModalDisclosure } = disclosures
    const { onClose } = authModalDisclosure

    const fetchSignInTabMutation = async (_: string, { arg } : {arg : SignInInputData}) => {
        return await signIn(arg)
    }

    const signInTabSwrMutation = useSWRMutation(
        "SIGN_IN",
        fetchSignInTabMutation
    )

    const {trigger} = signInTabSwrMutation

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().required("Password is required"),
            })
        }
        onSubmit={async ({ email, password }) => {
            // const response = await signIn({
            //     params: {
            //         email,
            //         password
            //     }
            // })
            const credential = {
                params: {
                    email,
                    password
                }
            }
            trigger(credential).then(async() => {
                toastRef.current?.notify({
                    data: {
                        message: "Sign in successfully" //response.message
                    },
                    type: ToastType.Success
                })
                await mutate()
                onClose()
            }).catch(() => {
                toastRef.current?.notify({
                    data: {
                        error: "Check your email or password" //ex.message
                    },
                    type: ToastType.Error
                })
            })
            // await mutate(response)
            // onClose()
        }}
        >
            {(formik) => (
                <WrappedFormikProvider formik={formik} swrs={{signInTabSwrMutation}}>
                    {children}
                    <ToastRef ref={toastRef} />
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}