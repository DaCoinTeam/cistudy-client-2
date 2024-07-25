"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useEffect, useMemo } from "react"
import * as Yup from "yup"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { ManagementContext } from "../../../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../../../_hooks"
import { UpdateQuizQuestionOutput, UpdateQuizQuestionInput, updateQuizQuestion } from "@services"
import { ToastType } from "../../../../../../../../../../../../../../_components"
import { ErrorResponse } from "@common"
import { QuestionMoreButtonContext } from ".."

interface EditQuizQuestionContextValue {
    formik: FormikProps<FormikValues>
    swrs: {
        updateQuizQuestionSwrMutation: SWRMutationResponse<UpdateQuizQuestionOutput, ErrorResponse, "UPDATE_QUIZ_QUESTION", UpdateQuizQuestionInput>
    },
}


export const EditQuizQuestionContext = createContext<EditQuizQuestionContextValue | null>(
    null
)

interface FormikValues {
    question: string
}

const initialValues: FormikValues = {
    question: ""
}

const WrappedFormikProvider = ({ formik, children, swrs }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
    swrs: {
        updateQuizQuestionSwrMutation: SWRMutationResponse<UpdateQuizQuestionOutput, ErrorResponse, "UPDATE_QUIZ_QUESTION", UpdateQuizQuestionInput>
    }
}) => {

    const EditQuizQuestionContextValue: EditQuizQuestionContextValue = useMemo(
        () => ({
            formik,
            swrs,     
        }),
        [formik, swrs]
    )
    
    const { props } = useContext(QuestionMoreButtonContext)!
    const { question: _question } = props
    const { question } = _question

    useEffect(() => {
        if (!question) return
        formik.setFieldValue("question", question)
    }, [
        question
    ])

    return (
        <EditQuizQuestionContext.Provider value={EditQuizQuestionContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </EditQuizQuestionContext.Provider>
    )
}

export const EditQuizQuestionProvider = ({ children }: { children: ReactNode }) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const { notify } = useContext(RootContext)!

    const updateQuizQuestionSwrMutation = useSWRMutation(
        "UPDATE_QUIZ_QUESTION",
        async (_: string, { arg } : { arg : UpdateQuizQuestionInput }) => {
            return await updateQuizQuestion(arg)
        }
    )

    const { props } = useContext(QuestionMoreButtonContext)!
    const { question: _question } = props
    const { quizQuestionId } = _question
    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({})
        }
        onSubmit={async ({ question }) => {
            const { message } = await updateQuizQuestionSwrMutation.trigger(
                {
                    data: {
                        quizQuestionId,
                        question,  
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
                <WrappedFormikProvider formik={formik} swrs={{updateQuizQuestionSwrMutation}}>
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}