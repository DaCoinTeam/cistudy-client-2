"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useEffect, useMemo } from "react"
import * as Yup from "yup"
import { ResourceAttachmentEntity } from "@common"
import { DeepPartial } from "@apollo/client/utilities"
import { SectionContentItemContext } from "../../.."
import { updateResource } from "@services"
import { RootContext } from "../../../../../../../../../../../../_hooks"
import { ManagementContext } from "../../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../../../../../_components"

interface EditResourceContentContextValue {
    formik: FormikProps<FormikValues>
}

export const EditResourceContentContext = createContext<EditResourceContentContextValue | null>(
    null
)

interface FormikValues {
    title: string,
    description: string,
    attachments: Array<DeepPartial<ResourceAttachmentEntity>>
}

const initialValues: FormikValues = {
    title: "",
    description: "",
    attachments: []
}

const WrappedFormikProvider = ({ formik, children }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
}) => {
    const editResourceContentContextValue: EditResourceContentContextValue = useMemo(
        () => ({
            formik
        }),
        [formik]
    )

    const { props } = useContext(SectionContentItemContext)!
    const { sectionContent } = props
    const { resource, title } = sectionContent
    const { attachments, description } = resource

    useEffect(() => {
        if (!attachments) return
        formik.setFieldValue("attachments", attachments)
    }, [
        attachments
    ])

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

    return (
        <EditResourceContentContext.Provider value={editResourceContentContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </EditResourceContentContext.Provider>
    )
}

export const EditQuizContentProvider = ({ children }: { children: ReactNode }) => {
    const { props } = useContext(SectionContentItemContext)!
    const { sectionContent } = props
    const { resource } = sectionContent
    const { resourceId } = resource
    const { notify } = useContext(RootContext)!

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({})
        }
        onSubmit={async ({ description, title}) => {
            const { message } = await updateResource({
                data: {
                    resourceId,
                    title,
                    description
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
                <WrappedFormikProvider formik={formik}>
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}