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
  foundation: number;
}

const initialValues: FormikValues = {
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
        if (!configurationSwr.data?.foundation) return
        formik.setFieldValue(
            "foundation",
            configurationSwr.data?.foundation
        )
    }, [configurationSwr.data?.foundation])

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
            configurationId: true,
            updatedAt: true,
            createdAt: true,
            foundation: true,
        })
    })

    const { notify } = useContext(RootContext)!

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                instructor: Yup.number(),
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
