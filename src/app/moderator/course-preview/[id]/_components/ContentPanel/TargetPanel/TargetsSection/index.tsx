import React, { useContext } from "react"
import { TargetItem } from "./TargetItem"
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
                        {
                            courseTarget.position === sortByPosition(targetsCard ?? []).slice(-1)[0].position? "" : <Divider />
                        }
                    </div>
                ))}
            </>
        )
    }

    return (
        <div className={`${className}`}>
            <div className='text-2xl font-semibold'> Targets </div>
            <Spacer y={6} />
            {
                targetsCard && targetsCard.length > 0? (
                    <div className='border border-divider rounded-medium'>
                        {renderTargetCards()}
                    </div>
                ) : (
                    <div className="text-xl">
                        There are no targets yet
                    </div>
                )
            }
        </div>
    )
}

export const TargetsSection = (props: TargetsSectionProps) => (
    <TargetsSectionProvider>
        <WrappedTargetsSection {...props} />
    </TargetsSectionProvider>
)
