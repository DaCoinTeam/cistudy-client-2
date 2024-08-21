"use client"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import * as Yup from "yup"
import { RootContext } from "../../../../../../../../_hooks"
import { AppendKey, ErrorResponse, Media, parseISODateString } from "@common"
import useSWRMutation from "swr/mutation"
import { updateQualification, UpdateQualificationInput } from "@services"
import { ToastType } from "../../../../../../../../_components"
import { AccountDetailsContext } from "../../../../../../_hooks"

interface EditQualificationModalRefContextValue {
    formik: FormikProps<FormikValues>
}

export const EditQualificationModalRefContext = createContext<EditQualificationModalRefContextValue | null>(
    null
)

interface FormikValues {
    accountQualificationId: string
    name: string
    issuedFrom: string
    issuedAt: string
    url: string
    certificationImage: Array<AppendKey<Media>>;
}

const initialValues: FormikValues = {
    accountQualificationId: "",
    name: "",
    issuedFrom: "",
    issuedAt: parseISODateString(),
    url: "",
    certificationImage: []
}

const WrappedFormikProvider = ({ formik, children }: {
    formik: FormikProps<FormikValues>;
    children: ReactNode;
}) => {
    const EditQualificationModalRefContextValue: EditQualificationModalRefContextValue = useMemo(
        () => ({
            formik
        }),
        [formik]
    )
    
    return (
        <EditQualificationModalRefContext.Provider value={EditQualificationModalRefContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </EditQualificationModalRefContext.Provider>
    )
}

export const EditQualificationModalRefProvider = ({ children }: { children: ReactNode }) => {
    const updateQualificationSwrMutation = useSWRMutation(
        "UPDATE_QUALIFICATION",
        async (_: string, { arg }: { arg: UpdateQualificationInput }) => {
            return await updateQualification(arg)
        }
    )

    const {notify} = useContext(RootContext)!
    const {swrs} = useContext(AccountDetailsContext)!
    const {accountSwr} = swrs
    const {mutate} = accountSwr

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({
                name: Yup.string().required("Name is required"),
                issuedFrom: Yup.string().required("Issued From is required"),
                issuedAt: Yup.string().required("Issued At is required"),
                url: Yup.string().url("Invalid URL"),
            })
        }
        onSubmit={async ({accountQualificationId, name, issuedFrom, issuedAt, url, certificationImage}) => {
            try {
                const {message} = await updateQualificationSwrMutation.trigger({
                    data: {
                        accountQualificationId,
                        name,
                        issuedFrom,
                        issuedAt,
                        url,
                        fileIndex: 0
                    },
                    files: [certificationImage.at(0) as unknown as File]
                })
                mutate()
                notify!({
                    data: {
                        message
                    },
                    type: ToastType.Success
                })
            } catch (ex) {
                const {message} = ex as ErrorResponse
                notify!({
                    data: {
                        error: message as string
                    },
                    type: ToastType.Error
                })
            }
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