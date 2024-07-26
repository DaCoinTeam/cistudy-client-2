"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useEffect, useMemo } from "react"
import * as Yup from "yup"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { ManagementContext } from "../../../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../../../_hooks"
import { UpdateQuizQuestionAnswerOutput, updateQuizQuestionAnswer, UpdateQuizQuestionAnswerInput } from "@services"
import { ToastType } from "../../../../../../../../../../../../../../_components"
import { ErrorResponse } from "@common"
import { AnswerMoreButtonContext } from ".."

interface EditQuizQuestionAnswerContextValue {
    formik: FormikProps<FormikValues>
    swrs: {
        updateQuizQuestionAnswerSwrMutation: SWRMutationResponse<UpdateQuizQuestionAnswerOutput, ErrorResponse, "UPDATE_QUIZ_QUESTION_ANWSER", UpdateQuizQuestionAnswerInput>
    },
}


export const EditQuizQuestionAnswerContext = createContext<EditQuizQuestionAnswerContextValue | null>(
    null
)

interface FormikValues {
    content: string,
    isCorrect: boolean
}

const initialValues: FormikValues = {
    content: "",
    isCorrect: false
}

const WrappedFormikProvider = ({ formik, children, swrs }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
    swrs: {
        updateQuizQuestionAnswerSwrMutation: SWRMutationResponse<UpdateQuizQuestionAnswerOutput, ErrorResponse, "UPDATE_QUIZ_QUESTION_ANWSER", UpdateQuizQuestionAnswerInput>
    }
}) => {

    const editQuizQuestionAnswerContextValue: EditQuizQuestionAnswerContextValue = useMemo(
        () => ({
            formik,
            swrs,     
        }),
        [formik, swrs]
    )
    
    const { props } = useContext(AnswerMoreButtonContext)!
    const { answer } = props
    const { isCorrect, content } = answer

    useEffect(() => {
        if (!content) return
        formik.setFieldValue("content", content)
    }, [
        content
    ])

    useEffect(() => {
        if (!isCorrect) return
        formik.setFieldValue("isCorrect", isCorrect)
    }, [
        isCorrect
    ])

    return (
        <EditQuizQuestionAnswerContext.Provider value={editQuizQuestionAnswerContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </EditQuizQuestionAnswerContext.Provider>
    )
}

export const EditQuizQuestionAnswerProvider = ({ children }: { children: ReactNode }) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const { notify } = useContext(RootContext)!

    const updateQuizQuestionAnswerSwrMutation = useSWRMutation(
        "UPDATE_QUIZ_QUESTION_ANWSER",
        async (_: string, { arg } : { arg : UpdateQuizQuestionAnswerInput }) => {
            return await updateQuizQuestionAnswer(arg)
        }
    )

    const { props } = useContext(AnswerMoreButtonContext)!
    const { answer } = props
    const { quizQuestionAnswerId } = answer

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({})
        }
        onSubmit={async ({ content, isCorrect }) => {
            const { message } = await updateQuizQuestionAnswerSwrMutation.trigger(
                {
                    data: {
                        quizQuestionAnswerId,
                        content,
                        isCorrect
                    }
                }
            )
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
                <WrappedFormikProvider formik={formik} swrs={{updateQuizQuestionAnswerSwrMutation}}>
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}