"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useEffect, useMemo } from "react"
import * as Yup from "yup"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { ErrorResponse } from "@common"
import { ManagementContext } from "../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../_hooks"
import { UpdateQuizInput, UpdateQuizOutput, updateQuiz } from "@services"
import { ToastType } from "../../../../../../../../../../../../_components"
import { SectionContentItemContext } from "../../.."

interface EditQuizContentContextValue {
    formik: FormikProps<FormikValues>
    swrs: {
        updateQuizSwrMutation: SWRMutationResponse<UpdateQuizOutput, ErrorResponse, "UPDATE_QUIZ", UpdateQuizInput>
    },
}

export const EditQuizContentContext = createContext<EditQuizContentContextValue | null>(
    null
)

interface FormikValues {
    title: string,
    passingScore: number
    timeLimit: number
    description: string
}

const initialValues: FormikValues = {
    title: "",
    description: "",
    passingScore: 8,
    timeLimit: 60 * 15
}

const WrappedFormikProvider = ({ formik, children, swrs }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
    swrs: {
        updateQuizSwrMutation: SWRMutationResponse<UpdateQuizOutput, ErrorResponse, "UPDATE_QUIZ", UpdateQuizInput>
    }
}) => {

    const editQuizContentContextValue: EditQuizContentContextValue = useMemo(
        () => ({
            formik,
            swrs,        
        }),
        [formik, swrs]
    )
    
    const { props } = useContext(SectionContentItemContext)!
    const { sectionContent } = props
    const { quiz, title } = sectionContent
    const { passingScore, timeLimit, description } = quiz

    useEffect(() => {
        if (!title) return
        formik.setFieldValue("title", title)
    }, [
        title
    ])

    useEffect(() => {
        if (!description) return
        formik.setFieldValue("description", description)
    }, [
        description
    ])

    useEffect(() => {
        if (!passingScore) return
        formik.setFieldValue("passingScore", passingScore)
    }, [
        passingScore
    ])

    useEffect(() => {
        if (!timeLimit) return
        formik.setFieldValue("timeLimit", timeLimit)
    }, [
        timeLimit
    ])

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
        async (_: string, { arg } : { arg : UpdateQuizInput }) => {
            return await updateQuiz(arg)
        }
    )

    const { props } = useContext(SectionContentItemContext)!
    const { sectionContent } = props
    const { sectionContentId } = sectionContent



    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({})
        }
        onSubmit={async ({ title, timeLimit, passingScore, description }) => {
            const { message } = await updateQuizSwrMutation.trigger(
                {
                    data: {
                        title,
                        passingScore: Number(passingScore),
                        timeLimit: Number(timeLimit),
                        quizId: sectionContentId,
                        description
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
                <WrappedFormikProvider formik={formik} swrs={{updateQuizSwrMutation}}>
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}