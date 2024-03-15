"use client"
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    Divider,
    Image,
} from "@nextui-org/react"
import React, { useContext } from "react"
import { RootContext } from "../../../_hooks"
import { getTopicSVGUrl } from "@common"

interface CourseFiltersProps {
  className?: string;
}

export const CourseFilters = (props: CourseFiltersProps) => {
    const { className } = props

    const { swrs } = useContext(RootContext)!
    const { coursesSwr } = swrs
    const { data } = coursesSwr

    const getMetadata = () => {
        if (!data) return
        const last = data.at(-1)
        if (!last) return
        return last.metadata
    }

    return (
        <Card
            shadow="none"
            className={`${className} border border-divider rounded-medium h-fit`}
        >
            <CardHeader className="p-4 text-xl font-semibold"> Filters </CardHeader>
            <Divider />
            <CardBody className="p-0">
                <Accordion
                    selectionMode="multiple"
                    className="!px-0"
                    itemClasses={{
                        base: "!shadow-none gap-4 px-4",
                        title: "!text-base",
                    }}
                >
                    <AccordionItem
                        key="categories"
                        aria-label="Categories"
                        title={
                            <div className="flex gap-3 items-center">
                                <div>Categories</div>
                                <div className="text-foreground-500">
                                    {getMetadata()?.categories.length}
                                </div>
                            </div>
                        }
                    >
                        {getMetadata()?.categories.map(({ categoryId, name }) => (
                            <div key={categoryId}>
                                <div className="text-sm">{name}</div>
                            </div>
                        ))}
                    </AccordionItem>
                    <AccordionItem
                        key="subcategories"
                        aria-label="Subcategories"
                        title={
                            <div className="flex gap-3 items-center">
                                <div>Subcategories</div>
                                <div className="text-foreground-500">
                                    {getMetadata()?.subcategories.length}
                                </div>
                            </div>
                        }
                    >
                        {getMetadata()?.subcategories.map(({ subcategoryId, name }) => (
                            <div key={subcategoryId}>
                                <div className="text-sm">{name}</div>
                            </div>
                        ))}
                    </AccordionItem>
                    <AccordionItem
                        key="topics"
                        aria-label="Topics"
                        title={
                            <div className="flex gap-3 items-center">
                                <div>Topics</div>
                                <div className="text-foreground-500">
                                    {getMetadata()?.topics.length}
                                </div>
                            </div>
                        }
                    >
                        {getMetadata()?.topics.map(({ topicId, name }) => (
                            <div key={topicId}>
                                <Checkbox size="sm">
                                    <div className="flex items-center gap-2">
                                        <Image src={getTopicSVGUrl(name)} alt="topic" height={14} width={14}/>
                                        <div className="text-sm">{name}</div>
                                    </div>
                                </Checkbox>               
                            </div>
                        ))}
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>
    )
}
