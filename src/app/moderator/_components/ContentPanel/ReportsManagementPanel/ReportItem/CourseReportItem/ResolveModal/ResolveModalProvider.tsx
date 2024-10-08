"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import * as Yup from "yup"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { ErrorResponse } from "@common"
import { RootContext } from "../../../../../../../_hooks"
import { ToastType } from "../../../../../../../_components"
import { ResolveModalAction, ResolveModalState, useResolveModalReducer } from "./useResolveModalReducer"
import { CourseReportItemContext } from "../CourseReportItemProvider"
import { resolveCourseReport, ResolveCourseReportInput, ResolveCourseReportOutput } from "@services"

interface ResolveModalContextValue {
    formik: FormikProps<FormikValues>
    reducer: [ResolveModalState, React.Dispatch<ResolveModalAction>]
    swrs: {
        resolveModalSwrMutation: SWRMutationResponse<ResolveCourseReportOutput, ErrorResponse, "RESOLVE_COURSE_REPORT", ResolveCourseReportInput>
    }
}

export const ResolveModalContext = createContext<ResolveModalContextValue | null>(
    null
)

interface FormikValues {
    note: string
}

const initialValues: FormikValues = {
    note: ""
}

const WrappedFormikProvider = ({ formik, reducer, children, swrs }: {
    formik: FormikProps<FormikValues>;
    reducer: [ResolveModalState, React.Dispatch<ResolveModalAction>];
    children: ReactNode;
    swrs: {
        resolveModalSwrMutation: SWRMutationResponse<ResolveCourseReportOutput, ErrorResponse, "RESOLVE_COURSE_REPORT", ResolveCourseReportInput>
    }
}) => {

    const resolveModalContextValue: ResolveModalContextValue = useMemo(
        () => ({
            formik,
            reducer,
            swrs
        }),
        [formik, reducer, swrs]
    )
    
    return (
        <ResolveModalContext.Provider value={resolveModalContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </ResolveModalContext.Provider>
    )
}

export const ResolveModalProvider = ({ children }: { children: ReactNode }) => {
    const { notify } = useContext(RootContext)!
    const reducer = useResolveModalReducer()
    const [state] = reducer

    const { swrs } = useContext(CourseReportItemContext)!
    const { courseReportsSwr } = swrs
    const { mutate } = courseReportsSwr

    const resolveModalSwrMutation = useSWRMutation(
        "RESOLVE_COURSE_REPORT",
        async (_, { arg }: { arg: ResolveCourseReportInput }) => {
            return await resolveCourseReport(arg)
        }
    )

    const {trigger} = resolveModalSwrMutation

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({
                note: Yup.string().required("Note is required").min(20, "Note must be at least 20 characters")
            })
        }
        onSubmit={async ({ note }) => {
            const {message} = await trigger({
                data: {
                    reportCourseId: state.reportCourseId,
                    processNote: note,
                    processStatus: state.verifyStatus
                }
            })
            await mutate()
            notify!({
                data: {
                    message
                },
                type: ToastType.Success
            })
        }}
        >
            {(formik) => (
                <WrappedFormikProvider formik={formik} reducer={reducer} swrs={{resolveModalSwrMutation}}>
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}