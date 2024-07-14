"use client"
import { Form, Formik, FormikProps } from "formik"
import React, {
    ReactNode,
    createContext,
    useCallback,
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

    const getCategories = useCallback(() => {
        if (!courseCategories) return {}
        const categoryLevel0: Array<CategoryEntity> = []
        const categoryLevel1: Array<CategoryEntity> = []
        const categoryLevel2: Array<CategoryEntity> = []
        courseCategories.forEach((element) => {
            if (!element) return
            const { category } = element
            if (category.level == 0) categoryLevel0.push(category)
            else if (category.level == 1) categoryLevel1.push(category)
            else if (category.level == 2) categoryLevel2.push(category)
        })
        return { categoryLevel0, categoryLevel1, categoryLevel2 }
    }, [courseCategories])

    const {categoryLevel0, categoryLevel1, categoryLevel2} = useMemo(getCategories, [courseCategories])

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
        if (!categoryLevel0?.length) return
        if (!categoryPreviousRef.current) {
            categoryPreviousRef.current = true
            formik?.setFieldValue("categoryIdPrevious", categoryLevel0[0].categoryId)
        }
        formik?.setFieldValue("categoryId", categoryLevel0[0].categoryId)
    }, [categoryLevel0])

    const courseSubcategoriesPreviousRef = useRef(false)
    useEffect(() => {
        if (!categoryLevel1?.length) return

        const subcategories = categoryLevel1
            .map((category) => category)
            .sort((prev, next) => prev.name.localeCompare(next.name))

        if (!courseSubcategoriesPreviousRef.current) {
            courseSubcategoriesPreviousRef.current = true
            formik.setFieldValue("subcategoriesPrevious", subcategories)
        }
        formik.setFieldValue("subcategories", subcategories)
    }, [categoryLevel1])

    const courseTopicsPreviousRef = useRef(false)
    useEffect(() => {
        if (!categoryLevel2?.length) return

        const topics = categoryLevel2
            .map((category) => category)
            .sort((prev, next) => prev.name.localeCompare(next.name))

        if (!courseTopicsPreviousRef.current) {
            courseTopicsPreviousRef.current = true
            formik.setFieldValue("topicsPrevious", topics)
        }
        formik.setFieldValue("topics", topics)
    }, [categoryLevel2])

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
                if (!courseManagement) return
                const { courseId } = courseManagement
                let categoryIds: string[] = []
                if(categoryId ) {
                    const categoriesLevel1 = subcategories.map(({ categoryId }) => categoryId)
                    const categoriesLevel2 = topics.map(({ categoryId }) => categoryId)
                    categoryIds = [categoryId, ...categoriesLevel1, ...categoriesLevel2] 
                }
                
                await updateCourse({
                    data: {
                        courseId,
                        title,
                        description,
                        categoryIds: categoryIds
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
