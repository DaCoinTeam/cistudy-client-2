"use client"
import {
    Accordion,
    AccordionItem,
    Card,
    CardBody,
    CardHeader,
    Divider,
} from "@nextui-org/react"
import React from "react"

interface CourseFiltersProps {
  className?: string;
}

export const CourseFilters = (props: CourseFiltersProps) => {
    const { className } = props
    const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

    return (
        <Card
            shadow="none"
            className={`${className} border border-divider rounded-medium h-fit`}
        >
            <CardHeader className="p-4 text-xl font-semibold"> Filters </CardHeader>
            <Divider />
            <CardBody className="p-0">
                <Accordion
                    className="!px-0"
                    itemClasses={{
                        base: "!shadow-none gap-4 px-4",
                    }}
                >
                    <AccordionItem key="categories" aria-label="Categories" title="Categories">
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem
                        key="subcategories"
                        aria-label="Subcategories"
                        title="Subcategories"
                    >
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem key="topics" aria-label="Topics" title="Topics">
                        {defaultContent}
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>
    )
}
