import {
    Autocomplete,
    AutocompleteItem,
    Button,
    Chip,
    Input,
    Select,
    SelectItem,
    Spacer,
    Textarea,
    Selection,
    Image,
} from "@nextui-org/react"
import React, { useCallback, useContext } from "react"
import {
    GeneralSectionProviders,
    GeneralSectionContext,
} from "./GeneralSectionProviders"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { getTopicSVGUrl, Key, TopicEntity } from "@common"
import useSWR from "swr"
import { findManyCategories } from "@services"

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
            subcategories: {
                subcategoryId: true,
                name: true,
                subcategoryTopics: {
                    topic: {
                        topicId: true,
                        name: true,
                    },
                },
            },
        })
    }, [])

    const { data: categories } = useSWR("FETCH_CATEGORIES", fetchCategories)

    const onCategoryChange = (selection: Selection) =>
        formik.setFieldValue("categoryId", Array.from(selection).at(0))

    const subcategories =
    categories?.find(
        ({ categoryId }) => categoryId === formik.values.categoryId
    )?.subcategories ?? []

    const onSubcategoryChange = (selection: Selection) =>
        formik.setFieldValue(
            "subcategories",
            Array.from(selection).map((subcategoryId) =>
                subcategories.find(
                    (subcategory) => subcategoryId === subcategory.subcategoryId
                )
            )
        )

    const getTopics = () => {
        if (!formik.values.subcategories.length) return []
        const topics = formik.values.subcategories.flatMap((subcategory) =>
            subcategory.subcategoryTopics.flatMap(({ topic }) => topic)
        )
        return topics.reduce((prevs: Array<TopicEntity>, next) => {
            if (!prevs.some(({ topicId }) => topicId === next.topicId)) {
                prevs.push(next)
            }
            return prevs
        }, [])
    }

    const onTopicChange = (key: Key) => {
        const topic = getTopics().find(({ topicId }) => topicId === key)
        if (!topic) return
        addTopic(topic)
        formik.setFieldValue("topicInputValue", "")
    }

    return (
        <div className={`${className}`}>
            <div className="text-2xl"> General </div>
            <Spacer y={4} />
            <Input
                label="Title"
                id="title"
                labelPlacement="outside"
                value={formik.values.title}
                classNames={{
                    inputWrapper: "shadow-none !border !border-divider",
                }}
                variant="bordered"
                placeholder="Input title here"
                onChange={formik.handleChange}
                isInvalid={!!(formik.touched.title && formik.errors.title)}
                errorMessage={formik.touched.title && formik.errors.title}
            />
            <Spacer y={4} />
            <Textarea
                label="Description"
                id="description"
                value={formik.values.description}
                labelPlacement="outside"
                placeholder="Input description here"
                classNames={{
                    inputWrapper: "shadow-none !border !border-divider",
                }}
                variant="bordered"
                onChange={formik.handleChange}
                isInvalid={!!(formik.touched.description && formik.errors.description)}
                errorMessage={
                    !!(formik.touched.description && formik.errors.description)
                }
            />

            <Spacer y={4} />
            <Select
                label="Category"
                variant="bordered"
                placeholder="Select category"
                labelPlacement="outside"
                classNames={{
                    trigger: "shadow-none !border !border-divider",
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
                label="Subcategories"
                variant="bordered"
                classNames={{
                    trigger: "shadow-none !border !border-divider",
                    popoverContent: "shadow-none border border-divider rounded-medium",
                }}
                selectionMode="multiple"
                placeholder="Select subcategory"
                labelPlacement="outside"
                items={subcategories}
                selectedKeys={formik.values.subcategories.map(
                    ({ subcategoryId }) => subcategoryId
                )}
                onSelectionChange={onSubcategoryChange}
            >
                {({ subcategoryId, name }) => (
                    <SelectItem key={subcategoryId}>{name}</SelectItem>
                )}
            </Select>
            <Spacer y={4} />
            <div>
                <div className="text-sm"> Topics </div>
                <Spacer y={2}/>
                <div className="border border-divider rounded-medium">
                    <Autocomplete
                        variant="bordered"
                        className="w-full"
                        labelPlacement="outside"
                        placeholder="Select an topic"
                        defaultItems={getTopics()}
                        classNames={{
                            popoverContent: "shadow-none border border-divider rounded-medium",
                        }}
                        inputProps={{
                            classNames: {
                                inputWrapper: "!border-0 shadow-none",
                            },
                        }}
                        onSelectionChange={onTopicChange}
                    >
                        {({ topicId, name }) => (
                            <AutocompleteItem
                                startContent={
                                    <Image
                                        alt="topic"
                                        height={20}
                                        width={20}
                                        src={getTopicSVGUrl(name)}
                                    />
                                }
                                key={topicId}
                            >
                                {name}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>

                    {formik.values.topics.length ? (
                        <>
                            <div className="flex gap-2 p-3">
                                {formik.values.topics.map(({ topicId, name }) => (
                                    <Chip
                                        key={topicId}
                                        radius="md"
                                        variant="light"
                                        classNames={{
                                            base: "px-0"
                                        }}
                                        onClose={() => deleteTopic(topicId)}
                                        startContent={
                                            <Image
                                                alt="topic"
                                                height={20}
                                                width={20}
                                                src={getTopicSVGUrl(name)}
                                            />
                                        }
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
                    onPress={onCancelPress}
                    startContent={<XMarkIcon height={20} width={20} />}
                >
          Cancel
                </Button>
                <Button
                    className="text-secondary-foreground"
                    isDisabled={!hasChanged()}
                    type="submit"
                    color="primary"
                    startContent={<CheckIcon height={20} width={20} />}
                >
          Save
                </Button>
            </div>
        </div>
    )
}

export const GeneralSection = (props: GeneralSectionProps) => (
    <GeneralSectionProviders>
        <WrappedGeneralSection {...props} />
    </GeneralSectionProviders>
)
