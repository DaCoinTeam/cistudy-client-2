"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import * as Yup from "yup"
import { useDisclosure } from "@nextui-org/react"
import { Disclosure } from "@common"

import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { WithdrawInput, WithdrawOutput, withdraw } from "@services"
import { RootContext } from "../../../../../_hooks"
import { ToastType } from "../../../../ToastRef"
import { WalletModalRefContext } from "../WalletModalRefProvider"

interface WithdrawContextValue {
  discloresures: {
    baseDiscloresure: Disclosure;
  };
  formik: FormikProps<FormikValues>;
  swrs: {
    withdrawSwrMutation: SWRMutationResponse<
      WithdrawOutput,
      unknown,
      "WITHDRAW",
      WithdrawInput
    >;
  };
}

export const WithdrawModalContext = createContext<WithdrawContextValue | null>(
    null
)

interface FormikValues {
  withdrawAmount: number;
}

const initialValues: FormikValues = {
    withdrawAmount: 0,
}

const WrappedFormikProvider = ({
    formik,
    baseDiscloresure,
    children,
    withdrawSwrMutation,
}: {
  formik: FormikProps<FormikValues>;
  baseDiscloresure: Disclosure;
  withdrawSwrMutation: SWRMutationResponse<
    WithdrawOutput,
    unknown,
    "WITHDRAW",
    WithdrawInput
  >;
  children: ReactNode;
}) => (
    <WithdrawModalContext.Provider
        value={{
            formik,
            discloresures: { baseDiscloresure },
            swrs: { withdrawSwrMutation },
        }}
    >
        <Form className="w-full" onSubmit={formik.handleSubmit}>{children}</Form>
    </WithdrawModalContext.Provider>
)

export const WithdrawModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const baseDisclosure = useDisclosure()
    const { notify } = useContext(RootContext)!
    
    const { reducer : walletReducer } = useContext(WalletModalRefContext)!
    const [ , dispatch ] = walletReducer
    

    const withdrawSwrMutation = useSWRMutation(
        "WITHDRAW",
        async (
            _,
            {
                arg,
            }: {
        arg: WithdrawInput;
      }
        ) => await withdraw(arg)
    )

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                withdrawAmount: Yup.number()
                    .min(0)
                    .required("Withdraw amount is required"),
            })}
            onSubmit={async ({ withdrawAmount }) => {
                const { message } = await withdrawSwrMutation.trigger({
                    data: {
                        withdrawAmount,
                    },
                })
                notify!({
                    data: {
                        message
                    },
                    type: ToastType.Success
                })
                dispatch({
                    type: "TRIGGER_REFRESH_TRANSACTIONS_KEY"
                })
            }}
        >
            {(formik) => (
                <WrappedFormikProvider
                    formik={formik}
                    baseDiscloresure={baseDisclosure}
                    withdrawSwrMutation={withdrawSwrMutation}
                >
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}
