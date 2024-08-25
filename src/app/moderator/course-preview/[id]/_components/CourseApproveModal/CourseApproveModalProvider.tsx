"use client"
import { ErrorResponse } from "@common"
import { verifyCourse, VerifyCourseInput } from "@services"
import { Form, Formik, FormikProps } from "formik"
import { useParams, useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useMemo } from "react"
import useSWRMutation from "swr/mutation"
import * as Yup from "yup"
import { ToastType } from "../../../../../_components"
import { RootContext } from "../../../../../_hooks"
import { ManagementContext } from "../../_hooks"

interface CourseApproveModalContextValue {
    formik: FormikProps<FormikValues>
}

export const CourseApproveModalContext = createContext<CourseApproveModalContextValue | null>(
    null
)

interface FormikValues {
    note: string
    verifyStatus: string
}

const initialValues: FormikValues = {
    note: "",
    verifyStatus: ""
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
    const route = useRouter()
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
                route.push("/moderator")
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