"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import { createAccount } from "@services"
import { SystemRoles, parseISODateString } from "@common"
import { RootContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../_components"
import { AccountsManagementPanelContext } from "../../AccountsManagementPanelProvider"

interface CreateAccountModalContextValue {
  formik: FormikProps<FormikValues>;
}

export const CreateAccountModalContext =
  createContext<CreateAccountModalContextValue | null>(null)

interface FormikValues {
  email: string;
  username: string;
  birthdate: string;
  roles: Array<SystemRoles>;
  firstName: string;
  lastName: string;
}

const initialValues: FormikValues = {
    email: "example@gmail.com",
    username: "example",
    birthdate: parseISODateString(),
    roles: [SystemRoles.User],
    firstName: "Tammy",
    lastName: "Pham",
}

const WrappedCreateAccountModalProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const createAccountModalContextValue: CreateAccountModalContextValue =
    useMemo(
        () => ({
            formik,
        }),
        [formik]
    )

    return (
        <CreateAccountModalContext.Provider value={createAccountModalContextValue}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </CreateAccountModalContext.Provider>
    )
}

export const CreateAccountModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { notify } = useContext(RootContext)!
    const {
        swrs: {
            accountsSwr: { mutate },
        },
    } = useContext(AccountsManagementPanelContext)!
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (data) => {
                const { message } = await createAccount({
                    data: {
                        ...data,
                    },
                })
                await mutate()
        notify!({
            data: {
                message,
            },
            type: ToastType.Success,
        })
            }}
        >
            {(formik) => (
                <WrappedCreateAccountModalProvider
                    formik={formik}
                >
                    {children}
                </WrappedCreateAccountModalProvider>
            )}
        </Formik>
    )
}
