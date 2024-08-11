"use client"
import { Form, Formik, FormikProps } from "formik"
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
} from "react"
import * as Yup from "yup"
import { ConfigurationEntity, ErrorResponse } from "@common"
import useSWR, { SWRResponse } from "swr"
import { createConfiguration, findLatestConfiguration } from "@services"
import { RootContext } from "../../../../_hooks"
import { ToastType } from "../../../../_components"

interface ConfigurationPanelContextValue {
  formik: FormikProps<FormikValues>;
  swrs: {
    configurationSwr: SWRResponse<ConfigurationEntity, ErrorResponse>;
  };
}

export const ConfigurationPanelContext =
  createContext<ConfigurationPanelContextValue | null>(null)

interface FormikValues {
  instructor: number;
  earn: number;
  completed: number;
  foundation: number;
}

const initialValues: FormikValues = {
    instructor: 50,
    earn: 30,
    completed: 10,
    foundation: 10,
}

const WrappedFormikProvider = ({
    formik,
    children,
    configurationSwr,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
  configurationSwr: SWRResponse<ConfigurationEntity, ErrorResponse>;
}) => {
    useEffect(() => {
        formik.setFieldValue(
            "instructor",
            100 -
        formik.values.completed -
        formik.values.foundation -
        formik.values.earn
        )
    }, [formik.values])

    const configurationPanelContextValue: ConfigurationPanelContextValue =
    useMemo(
        () => ({
            formik,
            swrs: {
                configurationSwr,
            },
        }),
        [formik, configurationSwr]
    )

    return (
        <ConfigurationPanelContext.Provider value={configurationPanelContextValue}>
            <Form className="col-span-3" onSubmit={formik.handleSubmit}>
                {children}
            </Form>
        </ConfigurationPanelContext.Provider>
    )
}

export const ConfigurationPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const configurationSwr = useSWR("CONFIGURATION", async () => {
        return await findLatestConfiguration({
            appliedAt: true,
            completed: true,
            configurationId: true,
            createdAt: true,
            earn: true,
            instructor: true,
            foundation: true,
        })
    })

    const { notify } = useContext(RootContext)!

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                instructor: Yup.number(),
                earn: Yup.number()
                    .min(24, "Earn percent cannot drop below 24%")
                    .max(36, "Earn percent cannot exceed over 24%"),
                completed: Yup.number()
                    .min(8, "Completed percent cannot drop below 8%")
                    .max(12, "Completed percent cannot exceed over 12%"),
                foundation: Yup.number()
                    .min(8, "Foundation percent cannot drop below 8%")
                    .max(12, "Foundation percent cannot exceed over 12%"),
            })}
            onSubmit={async (data) => {
                const { message } = await createConfiguration({
                    data,
                })
                await configurationSwr.mutate()
        notify!({
            data: {
                message,
            },
            type: ToastType.Success,
        })
            }}
        >
            {(formik) => (
                <WrappedFormikProvider
                    formik={formik}
                    configurationSwr={configurationSwr}
                >
                    {children}
                </WrappedFormikProvider>
            )}
        </Formik>
    )
}
