"use client"
import { Form, Formik, FormikProps } from "formik"
import { ReactNode, createContext, useContext } from "react"

import * as Yup from "yup"
import { RootContext } from "../../../../../../_hooks"
import { CourseDetailsContext } from "../../../../_hooks"
import { createCourseReport } from "@services"
import { ToastType } from "../../../../../../_components"

interface FormikValues {
  title: string;
  description: string;
}

interface ReportCourseModalContextValue {
  formik: FormikProps<FormikValues>;
}

export const ReportCourseModalContext =
  createContext<ReportCourseModalContextValue | null>(null)

const initialValues: FormikValues = {
    title: "",
    description: "",
}

const WrappedReportCourseModalProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    return (
        <ReportCourseModalContext.Provider value={{ formik }}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </ReportCourseModalContext.Provider>
    )
}

export const ReportCourseModalProvider = ({
    children,
    onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
    const {notify} = useContext(RootContext)!
    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data } = courseSwr
    const {courseId} = {...data}

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

                await createCourseReport({
                    data: {
                        courseId: courseId || "",
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
                <WrappedReportCourseModalProvider formik={formik}>
                    {children}
                </WrappedReportCourseModalProvider>
            )}
        </Formik>
    )
}
