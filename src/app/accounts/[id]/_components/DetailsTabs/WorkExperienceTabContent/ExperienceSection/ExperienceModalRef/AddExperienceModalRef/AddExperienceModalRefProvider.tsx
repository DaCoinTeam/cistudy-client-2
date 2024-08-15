"use client"
import { AppendKey, ErrorResponse, Media, parseISODateString } from "@common"
import { addJob } from "@services"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import * as Yup from "yup"
import { RootContext } from "../../../../../../../../_hooks"
import { ToastType } from "../../../../../../../../_components"
import { AccountDetailsContext } from "../../../../../../_hooks"
import { AddExperienceModalRefAction, AddExperienceModalRefState, useAddExperienceModalRefReducer } from "./useAddExperienceModalRefReducer"

interface AddExperienceModalRefContextValue {
    formik: FormikProps<FormikValues>,
    reducer: [AddExperienceModalRefState, React.Dispatch<AddExperienceModalRefAction>]
}

export const AddExperienceModalRefContext = createContext<AddExperienceModalRefContextValue | null>(
    null
)

interface FormikValues {
    companyName: string;
    role: string;
    companyImage: Array<AppendKey<Media>>;
    startDate: string;
    endDate: string;
}

const initialValues: FormikValues = {
    companyName: "",
    role: "",
    companyImage: [],
    startDate: parseISODateString(),
    endDate: parseISODateString(),
}

const WrappedFormikProvider = ({ formik, reducer, children }: {
    formik: FormikProps<FormikValues>;
    reducer: [AddExperienceModalRefState, React.Dispatch<AddExperienceModalRefAction>];
    children: ReactNode;
}) => {

    const addExperienceModalRefContextValue: AddExperienceModalRefContextValue = useMemo(
        () => ({
            formik,
            reducer
        }),
        [formik, reducer]
    )
    
    return (
        <AddExperienceModalRefContext.Provider value={addExperienceModalRefContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </AddExperienceModalRefContext.Provider>
    )
}

export const AddExperienceModalRefProvider = ({ children }: { children: ReactNode }) => {
    const reducer = useAddExperienceModalRefReducer()
    const {notify} = useContext(RootContext)!
    const {swrs} = useContext(AccountDetailsContext)!
    const {accountSwr} = swrs
    const {mutate} = accountSwr

    const [state] = reducer

    return (
        <Formik initialValues={initialValues} validationSchema={
            Yup.object({
                companyName: Yup.string().required("Company name is required"),
                role: Yup.string().required("Role is required"),
                startDate: Yup.string().required("Start date is required"),
            })
        }
        onSubmit={async ({companyName, role, companyImage, startDate, endDate}) => {
            try {
                const {message} = await addJob({
                    data: {
                        companyName,
                        companyThumbnailIndex: 0,
                        role,
                        startDate,
                        endDate: state.isCurrentWorking ? "" : endDate,
                    },
                    files: [companyImage.at(0) as unknown as File]
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
                <WrappedFormikProvider formik={formik} reducer={reducer}>
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}