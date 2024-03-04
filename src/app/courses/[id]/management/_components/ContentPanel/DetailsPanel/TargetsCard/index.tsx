import React, { useContext } from "react"
import { TargetItem } from "./TargetItem"
import { AddTargetItem } from "./AddTargetItem"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { TargetsCardContext, TargetsCardProviders } from "./TargetsCardProviders"

interface TargetsCardProps {
    className?: string
}

export const WrappedTargetsCard = (props: TargetsCardProps) => {
    const { className } = props

    const { swrs } = useContext(TargetsCardContext)!
    const { courseTargetsSwr } = swrs
    const { data : targetsCard } = courseTargetsSwr

    const renderTargetCards = () => {
        return (
            <>
                {targetsCard?.map((courseTarget) => (
                    <TargetItem
                        key={courseTarget.courseTargetId}
                        courseTarget={courseTarget}
                    />
                ))}
            </>
        )
    }

    return (
        <Card shadow="none" className={`${className}`}>
            <CardHeader className="p-4 pb-2"> 
                <div className="text-xl font-bold ">Targets</div>
            </CardHeader>
            <CardBody className="p-4 gap-4">
                {renderTargetCards()}
                <AddTargetItem key="addTarget"/>
            </CardBody>
        </Card>
    )
}

export const TargetsCard = (props: TargetsCardProps) => (
    <TargetsCardProviders>
        <WrappedTargetsCard {...props} />
    </TargetsCardProviders>
)