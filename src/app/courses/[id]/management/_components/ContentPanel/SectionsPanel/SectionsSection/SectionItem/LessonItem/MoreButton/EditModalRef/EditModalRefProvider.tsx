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
import { updateLesson } from "@services"
import { LessonItemContext } from "../.."
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
  description: string;
  descriptionPrevious: string;
}

const initialValues: FormikValues = {
    title: "",
    titlePrevious: "",
    description: "",
    descriptionPrevious: ""
}

const WrappedEditModalRefProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const { props } = useContext(LessonItemContext)!
    const { lesson } = props
    const { title, description } = lesson

    const titlePreviousRef = useRef(false)
    useEffect(() => {
        if (!titlePreviousRef.current) {
            titlePreviousRef.current = true
            formik?.setFieldValue("titlePrevious", title)
        }
        formik?.setFieldValue("title", title)
    }, [title])

    const descriptionPreviousRef = useRef(false)
    useEffect(() => {
        if (!descriptionPreviousRef.current) {
            descriptionPreviousRef.current = true
            formik?.setFieldValue("descriptionPrevious", description)
        }
        formik?.setFieldValue("description", description)
    }, [description])

    const hasChanged = () =>
        formik?.values.title !== formik?.values.titlePrevious
        || formik?.values.description !== formik?.values.descriptionPrevious

    const discardChanges = () =>
    {
        formik.setFieldValue("title", formik?.values.titlePrevious)
        formik.setFieldValue("description", formik?.values.descriptionPrevious)
    }

    const editModalRefContextValue: EditModalRefContextValue = useMemo(
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
        <EditModalRefContext.Provider value={editModalRefContextValue}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </EditModalRefContext.Provider>
    )
}

export const EditModalRefProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const { props } = useContext(LessonItemContext)!
    const { lesson } = props
    const { lessonId } = lesson

    const { swrs } = useContext(SectionItemContext)!
    const { lessonsSwr } = swrs
    const { mutate } = lessonsSwr

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async ({ title, description }, { setFieldValue }) => {
                await updateLesson({
                    data: {
                        lessonId,
                        description,
                        title
                    },
                })
                setFieldValue("titlePrevious", title)
                setFieldValue("descriptionPrevious", description)
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
