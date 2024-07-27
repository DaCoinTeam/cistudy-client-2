"use client"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import { Form, Formik, FormikProps } from "formik"
import * as Yup from "yup"
import useSWRMutation from "swr/mutation"
import { verifyCourse, VerifyCourseInput } from "@services"
import { useParams } from "next/navigation"
import { RootContext } from "../../../../../_hooks"
import { ErrorResponse, VerifyStatus } from "@common"
import { ToastType } from "../../../../../_components"
import { ManagementContext } from "../../_hooks"

interface CourseApproveModalContextValue {
    formik: FormikProps<FormikValues>
}

export const CourseApproveModalContext = createContext<CourseApproveModalContextValue | null>(
    null
)

interface FormikValues {
    note: string
    verifyStatus: VerifyStatus
}

const initialValues: FormikValues = {
    note: "",
    verifyStatus: VerifyStatus.Rejected
}

const WrappedCourseApproveModalProvider = ({ formik, children }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
}) => {

    const courseApproveModalContextValue: CourseApproveModalContextValue = useMemo(
        () => ({
            formik,
        }),
        [formik]
    )

    return (
        <CourseApproveModalContext.Provider value={courseApproveModalContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </CourseApproveModalContext.Provider>
    )
}

export const CourseApproveModalProvider = ({ children }: { children: ReactNode }) => {
    const params = useParams()
    const courseId = params.id as string
    const {notify} = useContext(RootContext)!
    const {swrs} = useContext(ManagementContext)!
    const {courseManagementSwr} = swrs

    const fetchVerifyCourseSwrMutation = useSWRMutation(
        "VERIFY_COURSE",
        async(_: string, {arg} : {arg : VerifyCourseInput}) => {
            return await verifyCourse(arg)
        }
    )

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({
                note: Yup.string().required("Feedback is required"),
            })
        }
        onSubmit={async ({ note, verifyStatus }) => {
            try {
                const {message} = await fetchVerifyCourseSwrMutation.trigger({
                    data: {
                        courseId,
                        note,
                        verifyStatus
                    }
                })
                notify!({
                    data: {
                        message
                    },
                    type: ToastType.Success
                })
                courseManagementSwr.mutate()
            } catch (ex) {
                const {message} = ex as ErrorResponse
                notify!({
                    data: {
                        error: message as string
                    },
                    type: ToastType.Error
                })
            }
        }}
        >
            {(formik) => (
                <WrappedCourseApproveModalProvider formik={formik}>
                    {children}
                </WrappedCourseApproveModalProvider>
            )}
        </Formik>
    )
}