"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext } from "react"
import * as Yup from "yup"
import { useDisclosure } from "@nextui-org/react"
import { Disclosure } from "@common"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { CreateOrderInput, CreateOrderOutput, createOrder } from "@services"

interface BuyContextValue {
  discloresures: {
    baseDiscloresure: Disclosure;
  };
  formik: FormikProps<FormikValues>;
  swrs: {
    createOrderMutation: SWRMutationResponse<CreateOrderOutput, unknown, "CREATE_ORDER", CreateOrderInput>
  }
}

export const BuyModalContext = createContext<BuyContextValue | null>(null)

interface FormikValues {
    buyAmount: number;
}

const initialValues: FormikValues = {
    buyAmount: 0,
}

const WrappedFormikProvider = ({
    formik,
    baseDiscloresure,
    children,
    createOrderMutation
}: {
  formik: FormikProps<FormikValues>;
  baseDiscloresure: Disclosure;
  children: ReactNode;
  createOrderMutation: SWRMutationResponse<CreateOrderOutput, unknown, "CREATE_ORDER", CreateOrderInput>
}) => (
    <BuyModalContext.Provider
        value={{ formik, discloresures: { baseDiscloresure }, swrs: { createOrderMutation } }}
    >
        <Form className="w-full" onSubmit={formik.handleSubmit}>
            {children}
        </Form>
    </BuyModalContext.Provider>
)

export const BuyModalProvider = ({ children }: { children: ReactNode }) => {
    const baseDisclosure = useDisclosure()

    const createOrderMutation = useSWRMutation(
        "CREATE_ORDER",
        (
            _,
            {
                arg,
            }: {
        arg: CreateOrderInput;
      }
        ) => createOrder(arg)
    )

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                buyAmount: Yup.number().min(0).required("Buy amount is required"),
            })}
            onSubmit={() => {}}
        >
            {(formik) => (
                <WrappedFormikProvider
                    createOrderMutation={createOrderMutation}
                    formik={formik}
                    baseDiscloresure={baseDisclosure}
                >
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}
