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
import { updateLecture } from "@services"
import { LectureItemContext } from "../.."
import { SectionItemContext } from "../../.."

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

const WrappedEditModalRefProviders = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { title } = lecture

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

    const discardChanges = () =>
    {
        formik.setFieldValue("title", formik?.values.titlePrevious)
    }

    const EditModalRefContextValue: EditModalRefContextValue = useMemo(
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
        <EditModalRefContext.Provider value={EditModalRefContextValue}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </EditModalRefContext.Provider>
    )
}

export const EditModalRefProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { props } = useContext(LectureItemContext)!
    const { lecture } = props
    const { lectureId } = lecture

    const { swrs } = useContext(SectionItemContext)!
    const { lecturesSwr } = swrs
    const { mutate } = lecturesSwr

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ title }, { setFieldValue }) => {
                await updateLecture({
                    data: {
                        lectureId,
                        title
                    },
                })
                setFieldValue("titlePrevious", title)
                await mutate()
            }}
        >
            {(formik) => (
                <WrappedEditModalRefProviders formik={formik}>
                    {children}
                </WrappedEditModalRefProviders>
            )}
        </Formik>
    )
}
