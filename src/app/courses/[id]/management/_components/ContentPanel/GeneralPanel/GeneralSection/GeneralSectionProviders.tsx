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
import { SubcategoryEntity, TopicEntity } from "@common"

interface GeneralSectionContextValue {
  formik: FormikProps<FormikValues>;
  functions: {
    hasChanged: () => boolean;
    discardChanges: () => void;
    addTopic: (topic: TopicEntity) => void;
    deleteTopic: (topicId: string) => void;
  };
}

export const GeneralSectionContext =
  createContext<GeneralSectionContextValue | null>(null)

interface FormikValues {
  title: string;
  description: string;
  categoryId?: string;
  subcategories: Array<SubcategoryEntity>;
  topics: Array<TopicEntity>;
  titlePrevious: string;
  descriptionPrevious: string;
  categoryIdPrevious?: string;
  subcategoriesPrevious: Array<SubcategoryEntity>;
  topicsPrevious: Array<TopicEntity>;
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

const WrappedGeneralSectionProviders = ({
    formik,
    children,
}: {
  formik: FormikProps<FormikValues>;
  children: ReactNode;
}) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement } = courseManagementSwr
    const { title, description, categoryId, courseSubcategories, courseTopics } =
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
    useEffect(() => {
        if (!categoryId) return
        if (!categoryPreviousRef.current) {
            categoryPreviousRef.current = true
            formik?.setFieldValue("categoryIdPrevious", categoryId)
        }
        formik?.setFieldValue("categoryId", categoryId)
    }, [categoryId])

    const courseSubcategoriesPreviousRef = useRef(false)
    useEffect(() => {
        if (!courseSubcategories?.length) return

        const subcategories = courseSubcategories
            .map(({ subcategory }) => subcategory)
            .sort((prev, next) => prev.name.localeCompare(next.name))

        if (!courseSubcategoriesPreviousRef.current) {
            courseSubcategoriesPreviousRef.current = true
            formik.setFieldValue("subcategoriesPrevious", subcategories)
        }
        formik.setFieldValue("subcategories", subcategories)
    }, [courseSubcategories])

    const courseTopicsPreviousRef = useRef(false)
    useEffect(() => {
        if (!courseTopics?.length) return

        const topics = courseTopics
            .map(({ topic }) => topic)
            .sort((prev, next) => prev.name.localeCompare(next.name))

        if (!courseTopicsPreviousRef.current) {
            courseTopicsPreviousRef.current = true
            formik.setFieldValue("topicsPrevious", topics)
        }
        formik.setFieldValue("topics", topics)
    }, [courseTopics])

    const hasChanged = () =>
        formik.values.title !== formik.values.titlePrevious ||
    formik.values.description !== formik.values.descriptionPrevious ||
    formik.values.categoryId !== formik.values.categoryIdPrevious ||
    JSON.stringify(formik.values.topics.map(({ topicId }) => topicId)) !==
      JSON.stringify(
          formik.values.topicsPrevious.map(({ topicId }) => topicId)
      ) ||
    JSON.stringify(
        formik.values.subcategories.map(({ subcategoryId }) => subcategoryId)
    ) !==
      JSON.stringify(
          formik.values.subcategoriesPrevious.map(
              ({ subcategoryId }) => subcategoryId
          )
      )

    const discardChanges = () => {
        formik.setFieldValue("title", formik.values.titlePrevious)
        formik.setFieldValue("description", formik.values.descriptionPrevious)
        formik.setFieldValue("categoryId", formik.values.categoryIdPrevious)
        formik.setFieldValue("subcategories", formik.values.subcategoriesPrevious)
        formik.setFieldValue("topics", formik.values.topicsPrevious)
    }

    const addTopic = (topic: TopicEntity) => {
        if (formik.values.topics.some(({ topicId }) => topicId === topic.topicId))
            return
        formik.setFieldValue("topics", [...formik.values.topics, topic])
    }

    const deleteTopic = (topicId: string) => {
        const deleted = formik.values.topics.filter(
            (topic) => topicId !== topic.topicId
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
            onSubmit={async (
                { title, description, categoryId, topics, subcategories },
                { setFieldValue }
            ) => {
                if (!courseManagement) return
                const { courseId } = courseManagement
                await updateCourse({
                    data: {
                        courseId,
                        title,
                        description,
                        categoryId,
                        subcategoryIds: subcategories.length
                            ? subcategories.map(({ subcategoryId }) => subcategoryId)
                            : undefined,
                        topicIds: topics.length
                            ? topics.map(({ topicId }) => topicId)
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
                <WrappedGeneralSectionProviders formik={formik}>
                    {children}
                </WrappedGeneralSectionProviders>
            )}
        </Formik>
    )
}
