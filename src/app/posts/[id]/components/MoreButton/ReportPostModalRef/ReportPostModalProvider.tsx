"use client"
import { createPostReport } from "@services"
import { Form, Formik, FormikProps } from "formik"
import { ReactNode, createContext, useContext } from "react"
import * as Yup from "yup"
import { RootContext } from "../../../../../_hooks"
import { ToastType } from "../../../../../_components"
import { PostDetailContext } from "../../../hooks"

interface FormikValues {
  title: string;
  description: string;
}

interface ReportPostModalContextValue {
  formik: FormikProps<FormikValues>;
}

export const ReportPostModalContext =
  createContext<ReportPostModalContextValue | null>(null)

const initialValues: FormikValues = {
    title: "",
    description: "",
}

const WrappedReportPostModalProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    return (
        <ReportPostModalContext.Provider value={{ formik }}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </ReportPostModalContext.Provider>
    )
}

export const ReportPostModalProvider = ({
    children,
    onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
    const {notify} = useContext(RootContext)!
    const { swrs } = useContext(PostDetailContext)!
    const { postSwr } = swrs
    const { data } = postSwr

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

                await createPostReport({
                    data: {
                        postId: data?.postId?? "",
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
                          onClose()
                          helpers.resetForm()
                        } else {
                          notify!({
                              type: ToastType.Error,
                              data: {
                                  error: res.message,
                              },
                          })
                        }
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
                <WrappedReportPostModalProvider formik={formik}>
                    {children}
                </WrappedReportPostModalProvider>
            )}
        </Formik>
    )
}
