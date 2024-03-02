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

    const { state } = useContext(TargetsCardContext)!
    const { courseTargets } = state

    const renderTargetCards = () => {
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
        <Card shadow="none" className={`${className}`}>
            <CardHeader className="p-4 pb-2"> 
                <div className="text-xl font-semibold leading-none">Targets</div>
            </CardHeader>
            <CardBody className="p-4 gap-4">
                {renderTargetCards()}
                <AddTargetItem key="addTarget"/>
            </CardBody>
        </Card>
    )
}

interface TargetsCardProps {
    className?: string
}

export const TargetsCard = (props: TargetsCardProps) => (
    <TargetsCardProviders>
        <WrappedTargetsCard {...props} />
    </TargetsCardProviders>
)