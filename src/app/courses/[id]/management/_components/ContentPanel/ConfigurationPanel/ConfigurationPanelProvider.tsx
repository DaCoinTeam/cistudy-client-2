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
import { createCourseConfiguration, findLatestConfiguration } from "@services"
import { RootContext } from "../../../../../../_hooks"
import { ToastType } from "../../../../../../_components"
import { ManagementContext } from "../../../_hooks"

interface ConfigurationPanelContextValue {
  formik: FormikProps<FormikValues>;
  swrs: {
    configurationSwr: SWRResponse<ConfigurationEntity, ErrorResponse>;
  };
}

export const ConfigurationPanelContext =
  createContext<ConfigurationPanelContextValue | null>(null)

interface FormikValues {
  earn: number;
  completed: number;
  instructor: number;
  foundation: number;
}

const initialValues: FormikValues = {
    earn: 30,
    completed: 10,
    instructor: 50,
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
    const {
        swrs: {
            courseManagementSwr: { data },
        },
    } = useContext(ManagementContext)!
    const { courseConfiguration } = { ...data }

    useEffect(() => {
        if (!configurationSwr.data?.foundation) return
        formik.setFieldValue("foundation", configurationSwr.data?.foundation)
    }, [configurationSwr.data?.foundation])

    useEffect(() => {
        if (!courseConfiguration?.completed) return
        formik.setFieldValue("completed", courseConfiguration?.completed)
    }, [courseConfiguration?.completed])

    useEffect(() => {
        if (!courseConfiguration?.earn) return
        formik.setFieldValue("earn", courseConfiguration?.earn)
    }, [courseConfiguration?.earn])

    useEffect(() => {
        formik.setFieldValue(
            "instructor",
            100 -
        formik.values.completed -
        formik.values.earn -
        (configurationSwr.data?.foundation ?? 10)
        )
    }, [
        formik.values.completed,
        formik.values.earn,
        configurationSwr.data?.foundation,
    ])

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
    const {
        swrs: {
            courseManagementSwr: { data },
        },
    } = useContext(ManagementContext)!
    const { courseId } = { ...data }

    const configurationSwr = useSWR("CONFIGURATION", async () => {
        return await findLatestConfiguration({
            configurationId: true,
            updatedAt: true,
            createdAt: true,
            foundation: true,
        })
    })

    const { notify } = useContext(RootContext)!
    const {
        swrs: {
            courseManagementSwr: { mutate },
        },
    } = useContext(ManagementContext)!

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
                if (!courseId) return
                const { message } = await createCourseConfiguration({
                    data: {
                        ...data,
                        courseId,
                    },
                })
                await mutate()

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
