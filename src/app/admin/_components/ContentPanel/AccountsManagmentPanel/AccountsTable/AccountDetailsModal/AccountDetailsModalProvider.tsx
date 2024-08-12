"use client"
import { Form, Formik, FormikProps } from "formik"
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
} from "react"
import { findOneAdminAccount, updateAccount } from "@services"
import { AccountEntity, ErrorResponse, SystemRoles, parseISODateString } from "@common"
import { AccountDetailsModalPropsContext } from "./index"
import useSWR, { SWRResponse } from "swr"
import { RootContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../_components"
import { AccountsManagementPanelContext } from "../../AccountsManagementPanelProvider"

interface AccountDetailsModalContextValue {
  formik: FormikProps<FormikValues>;
  swrs: {
    accountSwr: SWRResponse<AccountEntity, ErrorResponse>
  }
}

export const AccountDetailsModalContext =
  createContext<AccountDetailsModalContextValue | null>(null)

interface FormikValues {
  username: string;
  birthdate: string;
  roles: Array<SystemRoles>;
  isDisabled: boolean;
  firstName: string;
  lastName: string;
}

const initialValues: FormikValues = {
    username: "",
    birthdate: parseISODateString(),
    roles: [],
    isDisabled: false,
    firstName: "",
    lastName: "",
}

const WrappedAccountDetailsModalProvider = ({
    formik,
    children,
    accountSwr
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
  accountSwr: SWRResponse<AccountEntity, ErrorResponse>
}) => {
    const { username,
        birthdate,
        roles,
        isDisabled,
        firstName,
        lastName
    } = { ...accountSwr.data }
    
    useEffect(() => {
        if (!username) return
        formik?.setFieldValue("username", username)
    }, [username])

    useEffect(() => {
        if (!birthdate) return
        formik?.setFieldValue("birthdate", birthdate)
    }, [birthdate])

    useEffect(() => {
        if (!roles) return
        formik?.setFieldValue("roles", roles.map((role) => role.name))
    }, [roles])

    useEffect(() => {
        if (!isDisabled) return
        formik?.setFieldValue("isDisabled", isDisabled)
    }, [isDisabled])

    useEffect(() => {
        if (!firstName) return
        formik?.setFieldValue("firstName", firstName)
    }, [firstName])

    useEffect(() => {
        if (!lastName) return
        formik?.setFieldValue("lastName", lastName)
    }, [lastName])

    useEffect(() => {
        if (!birthdate) return
        formik?.setFieldValue("birthdate", birthdate)
    }, [birthdate])

    const accountDetailsModalContextValue: AccountDetailsModalContextValue =
    useMemo(
        () => ({
            formik,
            swrs: {
                accountSwr
            }
        }),
        [formik, accountSwr]
    )

    return (
        <AccountDetailsModalContext.Provider
            value={accountDetailsModalContextValue}
        >
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </AccountDetailsModalContext.Provider>
    )
}

export const AccountDetailsModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { props } = useContext(AccountDetailsModalPropsContext)!
    const { account } = props
    const { accountId } = account

    const { swrs: { accountsSwr: { mutate }}} = useContext(AccountsManagementPanelContext)!

    const accountSwr = useSWR(["ADMIN_ACCOUNT", accountId], async () => {
        const res =  await findOneAdminAccount({
            params: {
                accountId
            }
        },
        {
            email: true,
            accountId: true,
            firstName: true,
            lastName: true,
            username: true,
            birthdate: true,
            roles: {
                roleId: true,
                name: true
            },
            isDisabled: true
        }
        )
        await mutate()
        return res
    })

    const { notify } = useContext(RootContext)!

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (data) => {
                const { message } = await updateAccount({
                    data: {
                        accountId,
                        ...data,
                    },
                })
                await accountSwr.mutate()
        notify!({
            data: {
                message,
            },
            type: ToastType.Success,
        })
            }}
        >
            {(formik) => (
                <WrappedAccountDetailsModalProvider formik={formik} accountSwr={accountSwr}>
                    {children}
                </WrappedAccountDetailsModalProvider>
            )}
        </Formik>
    )
}
