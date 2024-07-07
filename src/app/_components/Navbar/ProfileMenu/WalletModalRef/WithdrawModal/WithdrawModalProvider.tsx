"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext } from "react"
import * as Yup from "yup"
import { useDisclosure } from "@nextui-org/react"
import { Disclosure } from "@common"

import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { WithdrawInput, withdraw } from "@services"

interface WithdrawContextValue {
  discloresures: {
    baseDiscloresure: Disclosure;
  };
  formik: FormikProps<FormikValues>;
  swrs: {
    withdrawSwrMutation: SWRMutationResponse<
      string,
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
    string,
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
        <Form onSubmit={formik.handleSubmit}>{children}</Form>
    </WithdrawModalContext.Provider>
)

export const WithdrawModalProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const baseDisclosure = useDisclosure()

    const withdrawSwrMutation = useSWRMutation(
        "WITHDRAW",
        (
            _,
            {
                arg,
            }: {
        arg: WithdrawInput;
      }
        ) => withdraw(arg)
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
                await withdrawSwrMutation.trigger({
                    data: {
                        withdrawAmount,
                    },
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
