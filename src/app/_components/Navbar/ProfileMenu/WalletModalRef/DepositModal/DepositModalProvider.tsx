"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import * as Yup from "yup"
import { useDisclosure } from "@nextui-org/react"
import { ChainId, ERC20Contract, chainInfos } from "@blockchain"
import { useSDK } from "@metamask/sdk-react"
import { RootContext } from "../../../../../_hooks"
import { Disclosure, computeRaw } from "@common"

interface DepositContextValue {
  discloresures: {
    baseDiscloresure: Disclosure;
  };
  formik: FormikProps<FormikValues>;
}

export const DepositModalContext = createContext<DepositContextValue | null>(
    null
)

interface FormikValues {
  depositAmount: number;
}

const initialValues: FormikValues = {
    depositAmount: 0,
}

const WrappedFormikProvider = ({
    formik,
    baseDiscloresure,
    children,
}: {
  formik: FormikProps<FormikValues>;
  baseDiscloresure: Disclosure;
  children: ReactNode;
}) => (
    <DepositModalContext.Provider
        value={{ formik, discloresures: { baseDiscloresure } }}
    >
        <Form onSubmit={formik.handleSubmit}>{children}</Form>
    </DepositModalContext.Provider>
)

export const DepositModalProvider = ({ children }: { children: ReactNode }) => {
    const baseDisclosure = useDisclosure()

    const { provider } = useSDK()

    const { reducer } = useContext(RootContext)!
    const [state] = reducer
    const { wallets } = state
    const { metamask } = wallets
    const { address } = metamask

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                depositAmount: Yup.number()
                    .min(0)
                    .required("Deposit amount is required"),
            })}
            onSubmit={async ({ depositAmount }) => {
                const erc20Contract = new ERC20Contract(
                    ChainId.KalytnTestnet,
                    chainInfos[ChainId.KalytnTestnet].tokenAddress,
                    provider,
                    address
                )

                const transaction = await erc20Contract
                    .transfer()
                    .send(
                        chainInfos[ChainId.KalytnTestnet].serverAddress,
                        computeRaw(depositAmount)
                    )
                console.log(transaction)
            }}
        >
            {(formik) => (
                <WrappedFormikProvider
                    formik={formik}
                    baseDiscloresure={baseDisclosure}
                >
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}
