import React, { useContext } from "react"
import { TargetItem } from "./TargetItem"
import { AddTargetItem } from "./AddTargetItem"
import { Divider, Spacer } from "@nextui-org/react"
import {
    TargetsSectionContext,
    TargetsSectionProvider,
} from "./TargetsSectionProvider"
import { sortByPosition } from "../../../../../../../../common/utils"

interface TargetsSectionProps {
  className?: string;
}

export const WrappedTargetsSection = (props: TargetsSectionProps) => {
    const { className } = props

    const { swrs } = useContext(TargetsSectionContext)!
    const { courseTargetsSwr } = swrs
    const { data: targetsCard } = courseTargetsSwr

    const renderTargetCards = () => {
        return (
            <>
                {sortByPosition(targetsCard ?? [])?.map((courseTarget) => (
                    <div key={courseTarget.courseTargetId}>
                        <TargetItem courseTarget={courseTarget} />
                        <Divider />
                    </div>
                ))}
            </>
        )
    }

    return (
        <div className={`${className}`}>
            <div className='text-4xl font-bold'> Targets </div>
            <Spacer y={6} />
            <div className='border border-divider rounded-medium'>
                {renderTargetCards()}
                <AddTargetItem key='addTarget' />
            </div>
        </div>
    )
}

export const TargetsSection = (props: TargetsSectionProps) => (
    <TargetsSectionProvider>
        <WrappedTargetsSection {...props} />
    </TargetsSectionProvider>
)
