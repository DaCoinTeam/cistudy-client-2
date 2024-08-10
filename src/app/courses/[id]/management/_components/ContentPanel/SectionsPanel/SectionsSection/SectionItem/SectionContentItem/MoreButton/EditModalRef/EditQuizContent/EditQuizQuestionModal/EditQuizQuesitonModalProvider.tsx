"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useEffect, useMemo } from "react"
import * as Yup from "yup"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { ManagementContext } from "../../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../../_hooks"
import { UpdateQuizQuestionOutput, UpdateQuizQuestionInput, updateQuizQuestion } from "@services"
import { ToastType } from "../../../../../../../../../../../../../_components"
import { ErrorResponse, MediaType, isFileImage } from "@common"
import { EditQuizQuestionModalContext } from "./index"

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
    question: string,
    swapPosition: number,
    mediaFile?: File,
    deleteMedia?: boolean,
    point: number
}

const initialValues: FormikValues = {
    question: "",
    swapPosition: 0,
    point: 0,
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
    
    const { props } = useContext(EditQuizQuestionModalContext)!
    const { question: _question } = props
    const { question, position, point } = _question

    useEffect(() => {
        if (question === undefined) return
        formik.setFieldValue("question", question)
    }, [
        question
    ])

    useEffect(() => {
        if (question === undefined) return
        formik.setFieldValue("question", question)
    }, [
        question
    ])

    useEffect(() => {
        if (position === undefined) return
        formik.setFieldValue("swapPosition", position)
    }, [
        question
    ])

    useEffect(() => {
        if (point === undefined) return
        formik.setFieldValue("point", point)
    }, [
        point
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

    const { props } = useContext(EditQuizQuestionModalContext)!
    const { question: _question } = props
    const { quizQuestionId } = _question

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({})
        }
        onSubmit={async ({ question, swapPosition , mediaFile, deleteMedia, point }) => {
            try {
                const { message } = await updateQuizQuestionSwrMutation.trigger(
                    {
                        data: {
                            quizQuestionId,
                            question,  
                            swapPosition,
                            questionMedia: mediaFile ? {
                                mediaIndex: 0,
                                mediaType: isFileImage(mediaFile) ? MediaType.Image : MediaType.Video
                            } : undefined,
                            deleteMedia,
                            point
                        },
                        files: mediaFile ? [ mediaFile ] : undefined
                    }
                )
                
                await mutate()
            notify!({
                data: {
                    message
                },
                type: ToastType.Success
            })
            } catch (ex: unknown) {
                const { message } = ex as { message: string }
                notify!({
                    data: {
                        error: message
                    },
                    type: ToastType.Error
                })
            }
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