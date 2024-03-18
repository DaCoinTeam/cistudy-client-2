import React, { useContext } from "react"
import { TargetItem } from "./TargetItem"
import { AddTargetItem } from "./AddTargetItem"
import { Divider, Spacer } from "@nextui-org/react"
import { TargetsSectionContext, TargetsSectionProvider } from "./TargetsSectionProvider"

interface TargetsSectionProps {
    className?: string
}

export const WrappedTargetsSection = (props: TargetsSectionProps) => {
    const { className } = props

    const { swrs } = useContext(TargetsSectionContext)!
    const { courseTargetsSwr } = swrs
    const { data : targetsCard } = courseTargetsSwr

    const renderTargetCards = () => {
        return (
            <>
                {targetsCard?.map((courseTarget) => (
                    <>
                        <TargetItem
                            key={courseTarget.courseTargetId}
                            courseTarget={courseTarget}
                        />
                        <Divider />
                    </>
                ))}
            </>
        )
    }

    return (
        <div className={`${className}`}>
            <div className="text-2xl"> Targets </div>
            <Spacer y={4}/>
            <div className="border border-divider rounded-medium">
                {renderTargetCards()}
                <AddTargetItem key="addTarget"/>
            </div>
        </div>
    )
}

export const TargetsSection = (props: TargetsSectionProps) => (
    <TargetsSectionProvider>
        <WrappedTargetsSection {...props} />
    </TargetsSectionProvider>
)