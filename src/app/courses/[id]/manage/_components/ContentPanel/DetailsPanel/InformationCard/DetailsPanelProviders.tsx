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
import { ManageContext } from "../../../../_hooks"

interface DetailsPanelContextValue {
  formik: FormikProps<FormikValues>;
  functions: {
    hasChanged: () => boolean;
    discardChanges: () => void;
  };
}

export const DetailsPanelContext =
  createContext<DetailsPanelContextValue | null>(null)

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

const WrappedDetailsPanelProviders = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const { state } = useContext(ManageContext)!
    const { courseManaged } = state

    const titlePreviousRef = useRef(false)

    useEffect(() => {
        if (courseManaged === null) return
        const { title } = courseManaged

        if (!titlePreviousRef.current) {
            titlePreviousRef.current = true
            formik?.setFieldValue("titlePrevious", title)
        }
        formik?.setFieldValue("title", title)
    }, [courseManaged?.title])

    const descriptionPreviousRef = useRef(false)

    useEffect(() => {
        if (courseManaged === null) return
        const { description } = courseManaged

        if (!descriptionPreviousRef.current) {
            descriptionPreviousRef.current = true
            formik?.setFieldValue("descriptionPrevious", description)
        }
        formik?.setFieldValue("description", courseManaged.description)
    }, [courseManaged?.description])

    const hasChanged = () =>
        formik?.values.title !== formik?.values.titlePrevious ||
    formik?.values.description !== formik?.values.descriptionPrevious

    const discardChanges = () =>
    {
        formik.setFieldValue("title", formik?.values.titlePrevious)
        formik.setFieldValue("description", formik?.values.descriptionPrevious)
    }

    const detailsPanelContextValue: DetailsPanelContextValue = useMemo(
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
        <DetailsPanelContext.Provider value={detailsPanelContextValue}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </DetailsPanelContext.Provider>
    )
}

export const DetailsPanelProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { state, functions } = useContext(ManageContext)!
    const { courseManaged } = state
    const { fetchAndSetCourseManaged } = functions

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ title, description }, { setFieldValue }) => {
                if (courseManaged === null) return
                const { courseId } = courseManaged
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
                    await fetchAndSetCourseManaged()
                } else {
                    console.log(response)
                }
            }}
        >
            {(formik) => (
                <WrappedDetailsPanelProviders formik={formik}>
                    {children}
                </WrappedDetailsPanelProviders>
            )}
        </Formik>
    )
}
