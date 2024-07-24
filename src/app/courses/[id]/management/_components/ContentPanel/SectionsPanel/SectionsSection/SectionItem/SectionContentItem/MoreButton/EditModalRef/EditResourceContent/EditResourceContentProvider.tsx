"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import * as Yup from "yup"
import useSWRMutation, { SWRMutationResponse } from "swr/mutation"
import { ErrorResponse, ResourceAttachmentEntity } from "@common"
import { ManagementContext } from "../../../../../../../../../_hooks"
import { RootContext } from "../../../../../../../../../../../../_hooks"
import { DeepPartial } from "@apollo/client/utilities"

interface EditResourceContentContextValue {
    formik: FormikProps<FormikValues>
    swrs: {
        updateResourceSwrMutation: SWRMutationResponse<void, ErrorResponse, "UPDATE_RESOURCE", unknown>
    }
}

export const EditResourceContentContext = createContext<EditResourceContentContextValue | null>(
    null
)

interface FormikValues {
    attachments: Array<DeepPartial<ResourceAttachmentEntity>>
}

const initialValues: FormikValues = {
    attachments: []
}

const WrappedFormikProvider = ({ formik, children, swrs }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
    swrs: {
        updateResourceSwrMutation: SWRMutationResponse<void, ErrorResponse, "UPDATE_RESOURCE", unknown>
    }
}) => {
    const editResourceContentContextValue: EditResourceContentContextValue = useMemo(
        () => ({
            formik,
            swrs
        }),
        [formik, swrs]
    )
    
    return (
        <EditResourceContentContext.Provider value={editResourceContentContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </EditResourceContentContext.Provider>
    )
}

export const EditQuizContentProvider = ({ children }: { children: ReactNode }) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    const { notify } = useContext(RootContext)!

    const updateResourceSwrMutation = useSWRMutation(
        "UPDATE_RESOURCE",
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
                <WrappedFormikProvider formik={formik} swrs={{updateResourceSwrMutation}}>
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}