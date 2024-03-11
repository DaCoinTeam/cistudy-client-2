"use client"
import { Form, Formik, FormikProps } from "formik"
import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
} from "react"
import { updateCourse } from "@services"
import { isErrorResponse } from "@common"
import { ManagementContext } from "../../../../_hooks"

interface GeneralSectionContextValue {
  formik: FormikProps<FormikValues>;
  functions: {
    hasChanged: () => boolean;
    discardChanges: () => void;
  };
}

export const GeneralSectionContext =
  createContext<GeneralSectionContextValue | null>(null)

interface FormikValues {
  title: string;
  description: string;
  titlePrevious: string;
  descriptionPrevious: string;
}

const initialValues: FormikValues = {
    title: "",
    description: "",
    titlePrevious: "",
    descriptionPrevious: "",
}

const WrappedGeneralSectionProviders = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data : courseManagement } = courseManagementSwr

    const titlePreviousRef = useRef(false)

    useEffect(() => {
        if (!courseManagement) return
        const { title } = courseManagement

        if (!titlePreviousRef.current) {
            titlePreviousRef.current = true
            formik?.setFieldValue("titlePrevious", title)
        }
        formik?.setFieldValue("title", title)
    }, [courseManagement?.title])

    const descriptionPreviousRef = useRef(false)

    useEffect(() => {
        if (!courseManagement) return
        const { description } = courseManagement

        if (!descriptionPreviousRef.current) {
            descriptionPreviousRef.current = true
            formik?.setFieldValue("descriptionPrevious", description)
        }
        formik?.setFieldValue("description", courseManagement.description)
    }, [courseManagement?.description])

    const hasChanged = () =>
        formik?.values.title !== formik?.values.titlePrevious ||
    formik?.values.description !== formik?.values.descriptionPrevious

    const discardChanges = () =>
    {
        formik.setFieldValue("title", formik?.values.titlePrevious)
        formik.setFieldValue("description", formik?.values.descriptionPrevious)
    }

    const detailsPanelContextValue: GeneralSectionContextValue = useMemo(
        () => ({
            formik,
            functions: {
                hasChanged,
                discardChanges
            },
        }),
        [formik]
    )

    return (
        <GeneralSectionContext.Provider value={detailsPanelContextValue}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </GeneralSectionContext.Provider>
    )
}

export const GeneralSectionProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement, mutate } = courseManagementSwr

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ title, description }, { setFieldValue }) => {
                if (!courseManagement) return
                const { courseId } = courseManagement
                const response = await updateCourse({
                    data: {
                        courseId,
                        title,
                        description,
                    },
                })
                if (!isErrorResponse(response)) {
                    setFieldValue("titlePrevious", title)
                    setFieldValue("descriptionPrevious", description)
                    await mutate()
                } else {
                    console.log(response)
                }
            }}
        >
            {(formik) => (
                <WrappedGeneralSectionProviders formik={formik}>
                    {children}
                </WrappedGeneralSectionProviders>
            )}
        </Formik>
    )
}
