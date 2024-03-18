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
import { updateSection } from "@services"
import { ManagementContext } from "../../../../../../_hooks"
import { MoreButtonContext } from ".."

interface EditModalRefContextValue {
  formik: FormikProps<FormikValues>;
  functions: {
    hasChanged: () => boolean;
    discardChanges: () => void;
  };
}

export const EditModalRefContext =
  createContext<EditModalRefContextValue | null>(null)

interface FormikValues {
  title: string;
  titlePrevious: string;
}

const initialValues: FormikValues = {
    title: "",
    titlePrevious: "",
}

const WrappedEditModalRefProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const { props } = useContext(MoreButtonContext)!
    const { section } = props
    const { title } = section

    const titlePreviousRef = useRef(false)

    useEffect(() => {
        if (!titlePreviousRef.current) {
            titlePreviousRef.current = true
            formik?.setFieldValue("titlePrevious", title)
        }
        formik?.setFieldValue("title", title)
    }, [title])

    const hasChanged = () =>
        formik?.values.title !== formik?.values.titlePrevious

    const discardChanges = () => {
        formik.setFieldValue("title", formik?.values.titlePrevious)
    }

    const EditModalRefContextValue: EditModalRefContextValue = useMemo(
        () => ({
            formik,
            functions: {
                hasChanged,
                discardChanges,
            },
        }),
        [formik]
    )

    return (
        <EditModalRefContext.Provider value={EditModalRefContextValue}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </EditModalRefContext.Provider>
    )
}

export const EditModalRefProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { props } = useContext(MoreButtonContext)!
    const { section } = props
    const { sectionId } = section

    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { mutate } = courseManagementSwr

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ title }, { setFieldValue }) => {
                await updateSection({
                    data: {
                        sectionId,
                        title,
                    },
                })
                setFieldValue("titlePrevious", title)
                await mutate()
            }}
        >
            {(formik) => (
                <WrappedEditModalRefProvider formik={formik}>
                    {children}
                </WrappedEditModalRefProvider>
            )}
        </Formik>
    )
}
