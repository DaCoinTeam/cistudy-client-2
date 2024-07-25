"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useCallback, useContext, useMemo } from "react"
import * as Yup from "yup"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { ErrorResponse, QuizQuestionEntity } from "@common"
import { ManagementContext } from "../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../_hooks"
import { DeepPartial } from "@apollo/client/utilities"

interface EditQuizContentContextValue {
    formik: FormikProps<FormikValues>
    swrs: {
        updateQuizSwrMutation: SWRMutationResponse<void, ErrorResponse, "UPDATE_QUIZ", unknown>
    },
}

export const EditQuizContentContext = createContext<EditQuizContentContextValue | null>(
    null
)

interface FormikValues {
    questions: Array<DeepPartial<QuizQuestionEntity>>
}

const initialValues: FormikValues = {
    questions: []
}

const WrappedFormikProvider = ({ formik, children, swrs }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
    swrs: {
        updateQuizSwrMutation: SWRMutationResponse<void, ErrorResponse, "UPDATE_QUIZ", unknown>
    }
}) => {

    // const getAnswerById = (quizQuestionAnswerId : string) => {

    // }

    const editQuizContentContextValue: EditQuizContentContextValue = useMemo(
        () => ({
            formik,
            swrs,        
        }),
        [formik, swrs]
    )

    return (
        <EditQuizContentContext.Provider value={editQuizContentContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </EditQuizContentContext.Provider>
    )
}

export const EditQuizContentProvider = ({ children }: { children: ReactNode }) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const { notify } = useContext(RootContext)!

    const fetchOneContent = useCallback(
        async() => {

        },
        []
    )

    const updateQuizSwrMutation = useSWRMutation(
        "UPDATE_QUIZ",
        async (_: string, { arg } : {arg : unknown }) => {
            //return await updateQiz(arg)
        }
    )

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({})
        }
        onSubmit={async ({ questions }) => {
            //try {
            //     await trigger({
            //         email,
            //         password
            //     })
            //     notify!({
            //         data: {
            //             message: "Signed in successfully!"
            //         },
            //         type: ToastType.Success
            //     })
            //     await mutate()
            //     onClose()
            // } catch (ex) {
            //     const { message } = ex as ErrorResponse
            //     notify!({
            //         data: {
            //             error: message as string
            //         },
            //         type: ToastType.Error
            //     })
            //}
            await mutate()
        }}
        >
            {(formik) => (
                <WrappedFormikProvider formik={formik} swrs={{updateQuizSwrMutation}}>
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}