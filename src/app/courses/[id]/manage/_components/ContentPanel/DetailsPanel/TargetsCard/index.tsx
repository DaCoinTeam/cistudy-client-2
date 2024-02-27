import React, { useContext } from "react"
import { TargetItem } from "./TargetItem"
import { AddTargetItem } from "./AddTargetItem"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { CourseDetailsContext } from "../../../../../_hooks"

interface TargetsCardProps {
    className?: string
}

export const TargetsCard = (props: TargetsCardProps) => {
    const { className } = props

    const { state } = useContext(CourseDetailsContext)!
    const { course } = state

    const renderTargetCards = () => {
        if (!course) return null
        const { courseTargets } = course
        return (
            <>
                {courseTargets.map((courseTarget) => (
                    <TargetItem
                        key={courseTarget.courseTargetId}
                        courseTarget={courseTarget}
                    />
                ))}
            </>
        )
    }

    return (
        <Card shadow="none" className={`${className} border border-divider`}>
            <CardHeader className="p-4 pb-0 text-xl font-semibold"> Targets </CardHeader>
            <CardBody className="p-4 gap-4">
                {renderTargetCards()}
                <AddTargetItem key="addTarget"/>
            </CardBody>
        </Card>
    )
}