"use client"
import { createAccountReport } from "@services"
import { Form, Formik, FormikProps } from "formik"
import { ReactNode, createContext, useContext } from "react"

import * as Yup from "yup"
import { RootContext } from "../../../../../../../_hooks"
import { AccountDetailsContext } from "../../../../../_hooks"
import { ToastType } from "../../../../../../../_components"

interface FormikValues {
  title: string;
  description: string;
}

interface ReportAccountModalContextValue {
  formik: FormikProps<FormikValues>;
}

export const ReportAccountModalContext =
  createContext<ReportAccountModalContextValue | null>(null)

const initialValues: FormikValues = {
    title: "",
    description: "",
}

const WrappedReportAccountModalProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    return (
        <ReportAccountModalContext.Provider value={{ formik }}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </ReportAccountModalContext.Provider>
    )
}

export const ReportAccountModalProvider = ({
    children,
    onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
    const {notify} = useContext(RootContext)!
    const { swrs } = useContext(AccountDetailsContext)!
    const { accountSwr } = swrs
    const { data } = accountSwr
    const {accountId} = {...data}

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                title: Yup.string()    
                    .min(10, "Title is at least 10 characters").required("Title is required"),
                description : Yup.string().min(20, "Description is at least 20 characters").required("Description is required"),
            })}
            onSubmit={async (
                { title, description },
                helpers
            ) => {

                await createAccountReport({
                    data: {
                        reportedId: accountId as string,
                        title,
                        description,
                    },
                })
                    .then((res) => {
                        if (res.others) {
                          notify!({
                              type: ToastType.Success,
                              data: {
                                  message: res.message,
                              },
                          })
                          
                        } else {
                          notify!({
                              type: ToastType.Error,
                              data: {
                                  error: res.message,
                              },
                          })
                        }
                        onClose()
                        helpers.resetForm()
                    })
                    .catch((error) => {
                      notify!({
                          type: ToastType.Error,
                          data: {
                              error: error.message,
                          },
                      })
                    })
            }}
        >
            {(formik) => (
                <WrappedReportAccountModalProvider formik={formik}>
                    {children}
                </WrappedReportAccountModalProvider>
            )}
        </Formik>
    )
}
