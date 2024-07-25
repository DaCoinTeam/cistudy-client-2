import { Key } from "@common"

import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Chip,
    Image,
    Input,
    Select,
    Selection,
    SelectItem,
    Spacer,
    Textarea,
} from "@nextui-org/react"
import { findManyCategories, getAssetUrl } from "@services"
import { useCallback, useContext } from "react"
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

    const { hasChanged, discardChanges, addTopic, deleteTopic } = functions

    const onCancelPress = () => discardChanges()

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
    const onSubcategoryChange = (selection: Selection) =>
        formik.setFieldValue(
            "subcategories",
            Array.from(selection).map((catgoryId) =>
                subcategories.find(
                    (subcategory) => catgoryId === subcategory.categoryId
                )
            )
        )

    const getTopics = () => {
        if (!formik.values.subcategories.length) return []
        const topics = formik.values.subcategories.flatMap((subcategory) =>
            subcategory?.categoryParentRelations?.flatMap(({ category }) => category)
        )
        return topics

    // return topics.reduce((prevs: Array<CategoryEntity>, next) => {
    //     if (!prevs.some(({ categoryId }) => categoryId === next.categoryId)) {
    //         prevs.push(next)
    //     }
    //     console.log("prevs", prevs)
    //     return prevs
    // }, [])
    }

    const onTopicChange = (key: Key | null) => {
        const topic = getTopics().find((category) => category?.categoryId === key)
        if (!topic) return
        addTopic(topic)
        formik.setFieldValue("topicInputValue", "")
    }

    return (
        <div className={`${className}`}>
            <div className="text-4xl font-bold"> General </div>
            <Spacer y={4} />
            <Input
                classNames={{
                    inputWrapper: "input-input-wrapper",
                }}
                label="Title"
                id="title"
                labelPlacement="outside"
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
                label="Description"
                id="description"
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
                variant="bordered"
                label="Category"
                placeholder="Select category"
                labelPlacement="outside"
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
                variant="bordered"
                label="Subcategories"
                classNames={{
                    trigger: "px-4 !border !border-divider bg-transparent shadow-none",
                    popoverContent: "shadow-none border border-divider rounded-medium",
                }}
                selectionMode="multiple"
                placeholder="Select subcategory"
                labelPlacement="outside"
                items={subcategories}
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
                        className="w-full"
                        labelPlacement="outside"
                        placeholder="Find a topic"
                        defaultItems={getTopics()}
                        classNames={{
                            popoverContent: "rounded-medium",
                        }}
                        inputProps={{
                            classNames: {
                                inputWrapper: "px-4 !bg-transparent shadow-none",
                            },
                        }}
                        onSelectionChange={onTopicChange}
                    >
                        {({ categoryId, name, imageId }) => (
                            <AutocompleteItem
                                startContent={
                                    <Image
                                        alt="topic"
                                        classNames={{
                                            wrapper: "w-5 h-5 grid place-items-center",
                                        }}
                                        src={getAssetUrl(imageId)}
                                    />
                                }
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
                                        color="primary"
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
                    variant="bordered"
                    color="primary"
                    isDisabled={!hasChanged()}
                    onPress={onCancelPress}
                >
          Cancel
                </Button>
                <Button
                    isDisabled={!hasChanged()}
                    type="submit"
                    color="primary"
                    onPress={() => formik.handleSubmit()}
                    isLoading={formik.isSubmitting}
                >
                    {formik.isSubmitting ? "Saving" : "Save"}
                </Button>
            </div>
        </div>
    )
}

export const GeneralSection = (props: GeneralSectionProps) => (
    <GeneralSectionProvider>
        <WrappedGeneralSection {...props} />
    </GeneralSectionProvider>
)
