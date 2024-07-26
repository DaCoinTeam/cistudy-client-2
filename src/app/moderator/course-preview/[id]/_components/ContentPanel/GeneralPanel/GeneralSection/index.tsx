import { CategoryEntity } from "@common"
import {
    Chip,
    Input,
    Select,
    Selection,
    SelectItem,
    Spacer,
    Textarea,
} from "@nextui-org/react"
import { findManyCategories } from "@services"
import { useCallback, useContext, useEffect, useState } from "react"
import useSWR from "swr"
import {
    GeneralSectionContext,
    GeneralSectionProvider,
} from "./GeneralSectionProvider"

interface GeneralSectionProps {
  className?: string;
}

export const WrappedGeneralSection = (props: GeneralSectionProps) => {
    const { className } = props

    const { formik, functions } = useContext(GeneralSectionContext)!

    const { deleteTopic } = functions

    const [, setTopics] = useState<Array<CategoryEntity>>([])
    const [topicFocus] = useState(false)
    const fetchCategories = useCallback(() => {
        return findManyCategories({
            categoryId: true,
            name: true,
            level: true,
            categoryParentRelations: {
                category: {
                    name: true,
                    categoryId: true,
                    level: true,
                    categoryParentRelations: {
                        category: {
                            name: true,
                            categoryId: true,
                            level: true,
                            imageId: true,
                        },
                    },
                },
            },
        })
    }, [])

    const { data: categories } = useSWR("FETCH_CATEGORIES", fetchCategories)
    const onCategoryChange = (selection: Selection) =>
        formik.setFieldValue("categoryId", Array.from(selection).at(0))

    const subcategories =
    categories
        ?.find(({ categoryId }) => categoryId === formik.values.categoryId)
        ?.categoryParentRelations.map((subCategory) => subCategory.category) ??
    []
    const onSubcategoryChange = (selection: Selection) => {
        const newSubCategories = Array.from(selection).map((catgoryId) =>
            subcategories.find((subcategory) => catgoryId === subcategory.categoryId)
        )
        formik.setFieldValue("subcategories", newSubCategories)
        const categoriesTopics: Array<CategoryEntity> = []
        const matchingCategories = subcategories.filter((subcategory) =>
            newSubCategories
                .map((category) => category?.categoryId)
                .includes(subcategory.categoryId)
        )
        matchingCategories?.map((subcategory) => {
            subcategory?.categoryParentRelations?.map((topic) =>
                categoriesTopics.push(topic.category)
            )
        })
        const updateTopics = formik.values.topics.filter((topic) =>
            categoriesTopics.some((t) => t.categoryId === topic.categoryId)
        )
        formik.setFieldValue("topics", updateTopics)
    }

    const getTopics = useCallback(() => {
        if (!formik.values.subcategories.length) return []
        let topics: Array<CategoryEntity> = []
        const matchingCategories = subcategories.filter((subcategory) =>
            formik.values.subcategories
                .map((category) => category?.categoryId)
                .includes(subcategory.categoryId)
        )
        matchingCategories.map(({ categoryParentRelations }) =>
            categoryParentRelations.map(({ category }) => topics.push(category))
        )
        topics = topics.filter(
            (topic) =>
                !formik.values.topics.some((t) => t.categoryId === topic.categoryId)
        )
        setTopics(topics)
    }, [categories, topicFocus])

    useEffect(() => {
        getTopics()
    }, [categories, topicFocus])

    return (
        <div className={`${className}`}>
            <div className="text-4xl font-bold"> General </div>
            <Spacer y={4} />
            <Input
                classNames={{
                    inputWrapper: "input-input-wrapper",
                }}
                aria-label='Title'
                id='title'
                labelPlacement='outside'
                value={formik.values.title}
                placeholder="Input title here"
                onChange={formik.handleChange}
                isInvalid={!!(formik.touched.title && formik.errors.title)}
                errorMessage={formik.touched.title && formik.errors.title}
                isReadOnly
            />
            <Spacer y={4} />
            <Textarea
                classNames={{
                    inputWrapper: "input-input-wrapper",
                }}
                aria-label='Description'
                id='description'
                value={formik.values.description}
                labelPlacement="outside"
                placeholder="Input description here"
                onChange={formik.handleChange}
                isInvalid={!!(formik.touched.description && formik.errors.description)}
                errorMessage={
                    !!(formik.touched.description && formik.errors.description)
                }
                isReadOnly
            />

            <Spacer y={4} />
            <Select
                aria-label='Category'
                variant='bordered'
                placeholder='Select category'
                labelPlacement='outside'
                value={formik.values.categoryId}
                classNames={{
                    trigger: "px-4 !border !border-divider bg-transparent shadow-none",
                    popoverContent: "shadow-none border border-divider rounded-medium",
                }}
                items={categories ?? []}
                selectionMode="single"
                selectedKeys={
                    formik.values.categoryId ? [formik.values.categoryId] : []
                }
                onSelectionChange={onCategoryChange}
                isDisabled={true}
            >
                {({ categoryId, name }) => (
                    <SelectItem key={categoryId}>{name}</SelectItem>
                )}
            </Select>
            <Spacer y={4} />
            <Select
                aria-label='Subcategories'
                variant='bordered'
                classNames={{
                    trigger: "px-4 !border !border-divider bg-transparent shadow-none",
                    popoverContent: "shadow-none border border-divider rounded-medium",
                }}
                selectionMode="multiple"
                placeholder="Select subcategory"
                labelPlacement="outside"
                items={subcategories ?? []}
                selectedKeys={formik.values.subcategories?.map(
                    (category) => category?.categoryId
                )}
                onSelectionChange={onSubcategoryChange}
                isDisabled={true}
            >
                {({ categoryId, name }) => (
                    <SelectItem key={categoryId}>{name}</SelectItem>
                )}
            </Select>
            <Spacer y={4} />
            <div>
                <div className="text-sm"> Topics </div>
                <Spacer y={2} />
                <div className="!border !border-divider rounded-medium">
                    {formik.values.topics.length ? (
                        <>
                            <div className="flex gap-4 p-4">
                                {formik.values.topics.map(({ categoryId, name }) => (
                                    <Chip
                                        key={categoryId}
                                        aria-label={name}
                                        radius='md'
                                        color="primary"
                                        variant="flat"
                                        onClose={() => deleteTopic(categoryId)}
                                        isDisabled={true}
                                    >
                                        {name}
                                    </Chip>
                                ))}
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export const GeneralSection = (props: GeneralSectionProps) => (
    <GeneralSectionProvider>
        <WrappedGeneralSection {...props} />
    </GeneralSectionProvider>
)
