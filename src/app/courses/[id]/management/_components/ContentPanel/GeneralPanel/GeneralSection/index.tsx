import { CategoryEntity, Key } from "@common"
import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Chip,
    Input,
    Select,
    Selection,
    SelectItem,
    Spacer,
    Textarea
} from "@nextui-org/react"
import { findManyCategories } from "@services"
import { useCallback, useContext, useEffect, useState } from "react"
import useSWR from "swr"
import {
    GeneralSectionContext,
    GeneralSectionProvider,
} from "./GeneralSectionProvider"
import { GeneralSectionSekeleton } from "./GeneralSectionSkeleton"

interface GeneralSectionProps {
  className?: string;
}

export const WrappedGeneralSection = (props: GeneralSectionProps) => {
    const { className } = props

    const { formik, functions } = useContext(GeneralSectionContext)!

    const { hasChanged, discardChanges, addTopic, deleteTopic } = functions

    const onCancelPress = () => discardChanges()
    const [topics, setTopics] = useState<Array<CategoryEntity>>([])
    const [topicFocus, setTopicFocus] = useState(false)
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

    const { data: categories, isLoading } = useSWR("FETCH_CATEGORIES", fetchCategories)
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

    const onTopicChange = (key: Key | null) => {
        const topic = topics.find((category) => category?.categoryId === key)
        if (!topic) return
        addTopic(topic)
        formik.setFieldValue("topicInputValue", "")
    }

    return (
        <div className={`${className}`}>
            {!formik|| isLoading  ? <GeneralSectionSekeleton /> : (
                <div>
                    <div className="text-2xl font-semibold"> General </div>
                    <Spacer y={6} />
                    <Input
                        classNames={{
                            inputWrapper: "input-input-wrapper",
                        }}
                        aria-label='Title'
                        label='Title'
                        id='title'
                        labelPlacement='outside'
                        value={formik.values.title}
                        placeholder="Input title here"
                        onChange={formik.handleChange}
                        isInvalid={!!(formik.touched.title && formik.errors.title)}
                        errorMessage={formik.touched.title && formik.errors.title}
                    />
                    <Spacer y={4} />
                    <Textarea
                        classNames={{
                            inputWrapper: "input-input-wrapper",
                        }}
                        aria-label='Description'
                        label='Description'
                        id='description'
                        value={formik.values.description}
                        labelPlacement="outside"
                        placeholder="Input description here"
                        onChange={formik.handleChange}
                        isInvalid={!!(formik.touched.description && formik.errors.description)}
                        errorMessage={
                            !!(formik.touched.description && formik.errors.description)
                        }
                    />

                    <Spacer y={4} />
                    <Select
                        aria-label='Category'
                        label='Category'
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
                    >
                        {({ categoryId, name }) => (
                            <SelectItem key={categoryId}>{name}</SelectItem>
                        )}
                    </Select>
                    <Spacer y={4} />
                    <Select
                        aria-label='Subcategories'
                        label='Subcategories'
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
                            <Autocomplete
                                aria-label='Topics'
                                className='w-full'
                                labelPlacement='outside'
                                placeholder='Find a topic'
                                items={topics}
                                menuTrigger='focus'
                                classNames={{
                                    popoverContent: "rounded-medium",
                                }}
                                inputProps={{
                                    classNames: {
                                        inputWrapper: "px-4 !bg-transparent shadow-none",
                                    },
                                }}
                                onFocus={() => {
                                    setTopicFocus(true)
                                }}
                                onBlur={() => {
                                    setTopicFocus(false)
                                }}
                                onSelectionChange={onTopicChange}
                            >
                                {({ categoryId, name }) => (
                                    <AutocompleteItem
                                        aria-label={name}
                                        key={categoryId}
                                    >
                                        {name}
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>

                            {formik.values.topics.length ? (
                                <>
                                    <div className="flex gap-4 p-4">
                                        {formik.values.topics.map(({ categoryId, name }) => (
                                            <Chip
                                                key={categoryId}
                                                aria-label={name}
                                                radius='md'
                                                color="default"
                                                variant="flat"
                                                onClose={() => deleteTopic(categoryId)}
                                            >
                                                {name}
                                            </Chip>
                                        ))}
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                    <Spacer y={6} />
                    <div className="flex gap-2">
                        <Button
                            isDisabled={!hasChanged()}
                            type="submit"
                            color="primary"
                            onPress={() => formik.handleSubmit()}
                            isLoading={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? "Saving" : "Save"}
                        </Button>
                        <Button
                            variant="bordered"
                            color="primary"
                            isDisabled={!hasChanged()}
                            onPress={onCancelPress}
                        >
          Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export const GeneralSection = (props: GeneralSectionProps) => (
    <GeneralSectionProvider>
        <WrappedGeneralSection {...props} />
    </GeneralSectionProvider>
)
