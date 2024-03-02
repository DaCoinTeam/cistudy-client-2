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
import { isErrorResponse } from "@common"
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

    const { functions } = useContext(SectionItemContext)!
    const { fetchAndSetLectures } = functions

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ title }, { setFieldValue }) => {
                const response = await updateLecture({
                    data: {
                        lectureId,
                        title
                    },
                })
                if (!isErrorResponse(response)) {
                    setFieldValue("titlePrevious", title)
                    await fetchAndSetLectures()
                } else {
                    console.log(response)
                }
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
