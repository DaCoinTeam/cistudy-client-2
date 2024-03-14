"use client"
import { Accordion, AccordionItem, Card, CardBody, CardHeader, Divider } from "@nextui-org/react"
import React from "react"

interface CourseFiltersProps {
    className?: string
}

export const CourseFilters = (props: CourseFiltersProps) => {
    const { className } = props
    const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

    return (
        <Card shadow="none" className={`${className} border border-divider rounded-medium h-fit`}>
            <CardHeader className="p-4 text-xl font-semibold"> Filters </CardHeader>
            <Divider/>
            <CardBody className="p-0">
                <Accordion>
                    <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                        {defaultContent}
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                        {defaultContent}
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>
    )
}
