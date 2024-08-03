"use client"
import { Form, Formik, FormikProps } from "formik"
import React from "react"
import { createContext, ReactNode, useContext } from "react"
import * as Yup from "yup"
import { CommentItemContext } from "../.."
import { RootContext } from "../../../../../../../_hooks"
import { createPostCommentReport } from "@services"
import { ToastType } from "../../../../../../../_components"

interface FormikValues {
  title: string;
  description: string;
}

interface ReportPostCommentModalContextValue {
  formik: FormikProps<FormikValues>;
}

export const ReportPostCommentModalContext =
  createContext<ReportPostCommentModalContextValue | null>(null)

const initialValues: FormikValues = {
    title: "",
    description: "",
}

const WrappedReportPostCommentModalProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    return (
        <ReportPostCommentModalContext.Provider value={{ formik }}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </ReportPostCommentModalContext.Provider>
    )
}

export const ReportPostCommentModalProvider = ({
    children,
    onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
    const {notify} = useContext(RootContext)!
    const { props } = useContext(CommentItemContext)!
    const { postComment } = props
    const { postCommentId } = postComment

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                title: Yup.string().min(10, "Title is at least 10 characters").required("Title is required"),
                description : Yup.string().min(20, "Description is at least 20 characters").required("Description is required"),
            })}
            onSubmit={async (
                { title, description },
                helpers
            ) => {
                await createPostCommentReport({
                    data: {
                        postCommentId,
                        title,
                        description,
                    },
                })
                    .then((res) => {
                        if (res.others) {
                          notify!({
                              type: ToastType.Success,
                              data: {
                                  message: "A report to this comment has been summited",
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
                <WrappedReportPostCommentModalProvider formik={formik}>
                    {children}
                </WrappedReportPostCommentModalProvider>
            )}
        </Formik>
    )
}
