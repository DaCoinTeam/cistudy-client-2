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
    GeneralSectionProvider,
    GeneralSectionContext,
} from "./GeneralSectionProvider"
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Key, TopicEntity } from "@common"
import useSWR from "swr"
import { findManyCategories, getAssetUrl } from "@services"

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
                        svgId: true
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

    const onTopicChange = (key: Key | null) => {
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
                classNames={{
                    inputWrapper: "input-input-wrapper"
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
                    inputWrapper: "input-input-wrapper"
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
                <div className="!border !border-divider rounded-medium">
                    <Autocomplete
                        className="w-full"
                        labelPlacement="outside"
                        placeholder="Find a topic"
                        defaultItems={getTopics()}
                        classNames={{
                            popoverContent: "rounded-medium",
                        }}
                        inputProps={
                            {
                                classNames: {
                                    inputWrapper: "px-4 !bg-transparent shadow-none"
                                }
                            }
                        }
                        onSelectionChange={onTopicChange}
                    >
                        {({ topicId, name, svgId }) => (
                            <AutocompleteItem
                                startContent={
                                    <Image
                                        alt="topic"
                                        classNames={{
                                            wrapper: "w-5 h-5 grid place-items-center"
                                        }}
                                        src={getAssetUrl(svgId)}
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
                            <div className="flex gap-4 p-4">
                                {formik.values.topics.map(({ topicId, name, svgId }) => (
                                    <Chip
                                        key={topicId}
                                        radius="md"
                                        variant="light"
                                        className="px-0"
                                        onClose={() => deleteTopic(topicId)}
                                        startContent={
                                            <Image
                                                alt="topic"
                                                classNames={{
                                                    wrapper: "w-5 h-5 grid place-items-center"
                                                }}
                                                src={getAssetUrl(svgId)}
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
                    type="submit"
                    color="primary"
                    startContent={<CheckIcon height={20} width={20} />}
                >
          Save
                </Button>
                <Button
                    variant="light"
                    isDisabled={!hasChanged()}
                    onPress={onCancelPress}
                    startContent={<XMarkIcon height={20} width={20} />}
                >
          Cancel
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
