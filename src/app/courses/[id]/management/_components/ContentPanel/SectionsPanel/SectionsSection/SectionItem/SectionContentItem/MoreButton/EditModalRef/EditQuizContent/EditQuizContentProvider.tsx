"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import * as Yup from "yup"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { ErrorResponse, QuizQuestionEntity } from "@common"
import { ManagementContext } from "../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../_hooks"
import { v4 as uuidv4 } from "uuid"

interface EditQuizContentContextValue {
    formik: FormikProps<FormikValues>
    swrs: {
        updateQuizSwrMutation: SWRMutationResponse<void, ErrorResponse, "UPDATE_QUIZ", unknown>
    },
    functions: {
        addQuestion: () => void
    }
}

export const EditQuizContentContext = createContext<EditQuizContentContextValue | null>(
    null
)

interface FormikValues {
    questions: Array<Partial<QuizQuestionEntity>>
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
    const addQuestion = () => {
        const questions = formik.values.questions

        const maxPosition = questions.reduce((max, question) => {
            return (question?.position ?? 0 > max) ? question?.position ?? 0 : max
        }, 0)
        
        const question : Partial<QuizQuestionEntity> = {
            quizId: uuidv4(),
            position: maxPosition + 1,
            question: "Untitled"
        }

        formik.setFieldValue("questions", [ ...questions, question ])
    }      

    const editQuizContentContextValue: EditQuizContentContextValue = useMemo(
        () => ({
            formik,
            swrs,
            functions: {
                addQuestion
            }
            
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