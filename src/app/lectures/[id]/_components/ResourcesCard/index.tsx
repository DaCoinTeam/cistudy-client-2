"use client"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import React, { useContext } from "react"
import { LectureDetailsContext } from "../../_hooks"
import { ResourceItem } from "./ResourceItem"

interface ResourcesCardProps {
    className?: string
}

export const ResourcesCard = (props: ResourcesCardProps) => {
    const { className } = props

    const { swrs } = useContext(LectureDetailsContext)!
    const { lecturesSwr } = swrs
    const { data: lecture } = lecturesSwr
    const { resources } = { ...lecture }

    return (
        <Card shadow="none" className={`${className} bg-transparent border border-divider`}>
            <CardHeader className="p-4 pb-2 text-xl font-bold leading-none"> Resources </CardHeader>
            <CardBody className="p-4 gap-4">
                {
                    resources?.map(resource => 
                        <ResourceItem key={resource.lectureId} resource={resource} />
                    )
                }
            </CardBody>
        </Card>
    )
}