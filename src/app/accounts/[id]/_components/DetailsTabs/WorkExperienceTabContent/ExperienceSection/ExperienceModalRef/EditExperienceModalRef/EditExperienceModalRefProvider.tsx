"use client"
import { AppendKey, ErrorResponse, Media, parseISODateString } from "@common"
import { Form, Formik, FormikProps } from "formik"
import React, { ReactNode, createContext, useContext, useMemo } from "react"
import * as Yup from "yup"
import { EditExperienceModalRefAction, EditExperienceModalRefState, useEditExperienceModalRefReducer } from "./useEditExperienceModalRefReducer"
import { RootContext } from "../../../../../../../../_hooks"
import { AccountDetailsContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../../../_components"
import { updateAccountJob } from "@services"

interface EditExperienceModalRefContextValue {
    formik: FormikProps<FormikValues>,
    reducer: [EditExperienceModalRefState, React.Dispatch<EditExperienceModalRefAction>]
}

export const EditExperienceModalRefContext = createContext<EditExperienceModalRefContextValue | null>(
    null
)

interface FormikValues {
    accountJobId: string;
    companyName: string;
    role: string;
    companyImage: Array<AppendKey<Media>>;
    startDate: string;
    endDate: string;
}

const initialValues: FormikValues = {
    accountJobId: "",
    companyName: "",
    role: "",
    companyImage: [],
    startDate: parseISODateString(),
    endDate: parseISODateString(),
}

const WrappedFormikProvider = ({ formik, reducer, children }: {
    formik: FormikProps<FormikValues>;
    reducer: [EditExperienceModalRefState, React.Dispatch<EditExperienceModalRefAction>];
    children: ReactNode;
}) => {
    const editExperienceModalRefContextValue: EditExperienceModalRefContextValue = useMemo(
        () => ({
            formik,
            reducer
        }),
        [formik, reducer]
    )
    
    return (
        <EditExperienceModalRefContext.Provider value={editExperienceModalRefContextValue}>
            <Form onSubmit={formik.handleSubmit}>{children}</Form>
        </EditExperienceModalRefContext.Provider>
    )
}

export const EditExperienceModalRefProvider = ({ children }: { children: ReactNode }) => {
    const reducer = useEditExperienceModalRefReducer()
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
        onSubmit={async ({accountJobId, companyName, role, companyImage, startDate, endDate}) => {
            try {
                const {message} = await updateAccountJob({
                    data: {
                        accountJobId,
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