"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext } from "react"
import * as Yup from "yup"
import { useDisclosure } from "@nextui-org/react"
import { ChainId, ERC20Contract, chainInfos } from "@blockchain"
import { useSDK } from "@metamask/sdk-react"
import { RootContext } from "../../../../../_hooks"
import { Disclosure, computeRaw } from "@common"
import { deposit } from "@services"
import { ToastType } from "../../../../ToastRef"
import { WalletModalRefContext } from "../WalletModalRefProvider"

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
    depositAmount: 1
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
        <Form className="w-full" onSubmit={formik.handleSubmit}>
            {children}
        </Form>
    </DepositModalContext.Provider>
)

export const DepositModalProvider = ({ children }: { children: ReactNode }) => {
    const baseDisclosure = useDisclosure()
    const {onClose} = baseDisclosure
    const { provider } = useSDK()

    const { reducer } = useContext(RootContext)!
    const [state] = reducer
    const { wallets } = state
    const { metamask } = wallets
    const { address } = metamask

    const { notify } = useContext(RootContext)!

    const { reducer : walletReducer } = useContext(WalletModalRefContext)!
    const [ , dispatch ] = walletReducer


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                depositAmount: Yup.number()
                    .min(1, "The deposit amount must be at least 1")
                    .required("Deposit amount is required"),
            })}
            onSubmit={async ({ depositAmount }, {
                setFieldValue
            }) => {
                setFieldValue("isSubmitting", true)
                const erc20Contract = new ERC20Contract(
                    ChainId.KalytnTestnet,
                    chainInfos[ChainId.KalytnTestnet].tokenAddress,
                    provider,
                    address
                )

                const { transactionHash } = await erc20Contract
                    .transfer()
                    .send(
                        chainInfos[ChainId.KalytnTestnet].serverAddress,
                        computeRaw(depositAmount)
                    )
                const { message } = await deposit({
                    data: {
                        transactionHash,
                        maxQueries: 10,
                    },
                })

                dispatch({
                    type: "TRIGGER_REFRESH_TRANSACTIONS_KEY"
                })
                dispatch({
                    type: "TRIGGER_REFRESH_BALANCE_KEY"
                })
                onClose()
                notify!({
                    data: {
                        message
                    },
                    type: ToastType.Success
                })
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
