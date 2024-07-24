"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import * as Yup from "yup"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { ErrorResponse, QuizQuestionEntity } from "@common"
import { ManagementContext } from "../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../_hooks"
import { v4 as uuidv4 } from "uuid"
import { DeepPartial } from "@apollo/client/utilities"

interface EditQuizContentContextValue {
    formik: FormikProps<FormikValues>
    swrs: {
        updateQuizSwrMutation: SWRMutationResponse<void, ErrorResponse, "UPDATE_QUIZ", unknown>
    },
    functions: {
        addQuestion: () => void
        removeQuestion: (quizQuestionId: string) => void
        addAnswer: (quizQuestionId: string) => void
    }
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
    const addQuestion = () => {
        const questions = formik.values.questions
        const maxPosition = questions.reduce((max, question) => {
            return (question?.position ?? 0 > max) ? question?.position ?? 0 : max
        }, 0)
        
        const question : DeepPartial<QuizQuestionEntity> = {
            quizQuestionId: uuidv4(),
            position: maxPosition + 1,
            question: "Untitled"
        }

        formik.setFieldValue("questions", [ ...questions, question ])
    }

    const removeQuestion = (quizQuestionId: string) => {
        const questions = formik.values.questions
        const updatedQuestions = questions.filter((question) => {
            return question.quizQuestionId != quizQuestionId
        })
        formik.setFieldValue("questions", [...questions, updatedQuestions])
    }
    
    const addAnswer = (quizQuestionId: string) => {
        const questions = formik.values.questions
        const questionIndex = questions.findIndex((question) => {
            return question.quizQuestionId = quizQuestionId
        })

        const question = questions[questionIndex]

        if (!question) return 

        const maxPosition = question.answers?.reduce((max, answer) => {
            return (answer?.position ?? 0 > max) ? answer?.position ?? 0 : max
        }, 0) ?? 0

        let anwsers = question.answers
        if (!anwsers) {
            anwsers = []
        }

        anwsers?.push({
            quizQuestionAnswerId: uuidv4(),
            position: maxPosition + 1,
            content: "Untitled"
        })

        question.answers = anwsers
        questions[questionIndex] = question

        formik.setFieldValue("questions", questions)
    }

    const editQuizContentContextValue: EditQuizContentContextValue = useMemo(
        () => ({
            formik,
            swrs,
            functions: {
                addQuestion,
                removeQuestion,
                addAnswer,
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