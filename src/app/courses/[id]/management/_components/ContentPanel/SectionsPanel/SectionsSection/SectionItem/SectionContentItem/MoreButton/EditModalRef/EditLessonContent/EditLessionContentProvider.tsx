"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useEffect, useMemo } from "react"
import * as Yup from "yup"
import { ManagementContext } from "../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../_hooks"
import { updateLesson } from "@services"
import { SectionContentItemContext } from "../../.."
import { ToastType } from "../../../../../../../../../../../../_components"

interface EditLessonContentContextValue {
    formik: FormikProps<FormikValues>
}

export const EditLessonContentContext = createContext<EditLessonContentContextValue | null>(
    null
)

interface FormikValues {
    title: string,
    description: string,
    lessonVideo?: File,
    isTrial: boolean,
}

const initialValues: FormikValues = {
    title: "",
    description: "",
    isTrial: false,
}

const WrappedFormikProvider = ({ formik, children }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
}) => {

    
    const { props } = useContext(SectionContentItemContext)!
    const { sectionContent } = props
    const { lesson, title } = sectionContent
    const { description, isTrial } = lesson

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
        if (!isTrial) return
        formik.setFieldValue("isTrial", isTrial)
    }, [
        isTrial
    ])


    const editLessonContentContextValue: EditLessonContentContextValue = useMemo(
        () => ({
            formik
        }),
        [formik]
    )
    
    return (
        <EditLessonContentContext.Provider value={editLessonContentContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </EditLessonContentContext.Provider>
    )
}

export const EditLessonContentProvider = ({ children }: { children: ReactNode }) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const { notify } = useContext(RootContext)!

    const { props } = useContext(SectionContentItemContext)!
    const { sectionContent } = props
    const { sectionContentId } = sectionContent

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({})
        }
        onSubmit={async ({ title, description, lessonVideo, isTrial }) => {
            const files: Array<File> = []
            let lessonVideoIndex: number | undefined

            if (lessonVideo) {
                lessonVideoIndex = 0
                files.push(lessonVideo)
            }

            const { message } = await updateLesson({
                data: {
                    lessonId: sectionContentId,
                    title,
                    lessonVideoIndex,
                    description,
                    isTrial
                },
                files
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
                <WrappedFormikProvider formik={formik}>
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}