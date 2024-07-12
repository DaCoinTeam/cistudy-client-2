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
import { ManagementContext } from "../../../../_hooks"
import { CategoryEntity } from "@common"

interface GeneralSectionContextValue {
  formik: FormikProps<FormikValues>;
  functions: {
    hasChanged: () => boolean;
    discardChanges: () => void;
    addTopic: (topic: CategoryEntity) => void;
    deleteTopic: (categoryId: string) => void;
  };
}

export const GeneralSectionContext =
  createContext<GeneralSectionContextValue | null>(null)

interface FormikValues {
  title: string;
  description: string;
  categoryId?: string;
  subcategories: Array<CategoryEntity>;
  topics: Array<CategoryEntity>;
  titlePrevious: string;
  descriptionPrevious: string;
  categoryIdPrevious?: string;
  subcategoriesPrevious: Array<CategoryEntity>;
  topicsPrevious: Array<CategoryEntity>;
}

const initialValues: FormikValues = {
    title: "",
    description: "",
    subcategories: [],
    topics: [],
    titlePrevious: "",
    descriptionPrevious: "",
    subcategoriesPrevious: [],
    topicsPrevious: [],
}

const WrappedGeneralSectionProvider = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement } = courseManagementSwr
    const { title, description, courseCategories } =
    { ...courseManagement }

    const titlePreviousRef = useRef(false)
    useEffect(() => {
        if (!title) return

        if (!titlePreviousRef.current) {
            titlePreviousRef.current = true
            formik?.setFieldValue("titlePrevious", title)
        }

        formik?.setFieldValue("title", title)
    }, [title])

    const descriptionPreviousRef = useRef(false)
    useEffect(() => {
        if (!description) return

        if (!descriptionPreviousRef.current) {
            descriptionPreviousRef.current = true
            formik?.setFieldValue("descriptionPrevious", description)
        }

        formik?.setFieldValue("description", description)
    }, [description])

    const categoryPreviousRef = useRef(false)
    // useEffect(() => {
    //     if (!courseCategories) return
    //     if (!categoryPreviousRef.current) {
    //         categoryPreviousRef.current = true
    //         formik?.setFieldValue("categoryIdPrevious", courseCategories)
    //     }
    //     formik?.setFieldValue("categoryId", categoryId)
    // }, [categoryId])

    const courseSubcategoriesPreviousRef = useRef(false)
    // useEffect(() => {
    //     if (!courseSubcategories?.length) return

    //     const subcategories = courseSubcategories
    //         .map(({ subcategory } : {subcategory : CategoryEntity}) => subcategory)
    //         .sort((prev, next) => prev.name.localeCompare(next.name))

    //     if (!courseSubcategoriesPreviousRef.current) {
    //         courseSubcategoriesPreviousRef.current = true
    //         formik.setFieldValue("subcategoriesPrevious", subcategories)
    //     }
    //     formik.setFieldValue("subcategories", subcategories)
    // }, [courseSubcategories])

    const courseTopicsPreviousRef = useRef(false)
    // useEffect(() => {
    //     if (!courseTopics?.length) return

    //     const topics = courseTopics
    //         .map(({ topic }) => topic)
    //         .sort((prev, next) => prev.name.localeCompare(next.name))

    //     if (!courseTopicsPreviousRef.current) {
    //         courseTopicsPreviousRef.current = true
    //         formik.setFieldValue("topicsPrevious", topics)
    //     }
    //     formik.setFieldValue("topics", topics)
    // }, [courseTopics])

    const hasChanged = () =>
        formik.values.title !== formik.values.titlePrevious ||
    formik.values.description !== formik.values.descriptionPrevious ||
    formik.values.categoryId !== formik.values.categoryIdPrevious ||
    JSON.stringify(formik.values.topics.map(({ categoryId }) => categoryId)) !==
      JSON.stringify(
          formik.values.topicsPrevious.map(({ categoryId }) => categoryId)
      ) ||
    JSON.stringify(
        formik.values.subcategories.map(({ categoryId }) => categoryId)
    ) !==
      JSON.stringify(
          formik.values.subcategoriesPrevious.map(
              ({ categoryId }) => categoryId
          )
      )

    const discardChanges = () => {
        formik.setFieldValue("title", formik.values.titlePrevious)
        formik.setFieldValue("description", formik.values.descriptionPrevious)
        formik.setFieldValue("categoryId", formik.values.categoryIdPrevious)
        formik.setFieldValue("subcategories", formik.values.subcategoriesPrevious)
        formik.setFieldValue("topics", formik.values.topicsPrevious)
    }

    const addTopic = (topic: CategoryEntity) => {
        if (formik.values.topics.some(({ categoryId }) => categoryId === topic.categoryId))
            return
        formik.setFieldValue("topics", [...formik.values.topics, topic].sort((prev, next) => prev.name.localeCompare(next.name)))
    }

    const deleteTopic = (categoryId: string) => {
        const deleted = formik.values.topics.filter(
            (topic) => categoryId !== topic.categoryId
        )
        formik.setFieldValue("topics", deleted)
    }

    const generalSectionContextValue: GeneralSectionContextValue = useMemo(
        () => ({
            formik,
            functions: {
                hasChanged,
                discardChanges,
                addTopic,
                deleteTopic,
            },
        }),
        [formik]
    )

    return (
        <GeneralSectionContext.Provider value={generalSectionContextValue}>
            <Form onSubmit={formik?.handleSubmit}>{children}</Form>
        </GeneralSectionContext.Provider>
    )
}

export const GeneralSectionProvider = ({
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
            onSubmit={async (
                { title, description, categoryId, topics, subcategories },
                { setFieldValue }
            ) => {
                console.log("submit")
                if (!courseManagement) return
                console.log("submit 2")

                const { courseId } = courseManagement
                console.log("courseId on Submit", courseId)
                console.log("categoryId on Submit", categoryId, subcategories.length, topics.length)
                await updateCourse({
                    data: {
                        courseId,
                        title,
                        description,
                        categoryId,
                        subcategoryIds: subcategories.length
                            ? subcategories.map(({ categoryId }) => categoryId)
                            : undefined,
                        topicIds: topics.length
                            ? topics.map(({ categoryId }) => categoryId)
                            : undefined,
                    },
                })
                setFieldValue("titlePrevious", title)
                setFieldValue("descriptionPrevious", description)
                setFieldValue("titlePrevious", title)
                setFieldValue("categoryIdPrevious", categoryId)
                setFieldValue("subcategoriesPrevious", subcategories)
                setFieldValue("topicsPrevious", topics)
                await mutate()
            }}
        >
            {(formik) => (
                <WrappedGeneralSectionProvider formik={formik}>
                    {children}
                </WrappedGeneralSectionProvider>
            )}
        </Formik>
    )
}
