import React, { useContext } from "react"
import { TargetCard } from "./TargetCard"
import { AddTargetCard } from "./AddTargetCard"
import { Spacer } from "@nextui-org/react"
import { CourseDetailsContext } from "../../../../_hooks"
import { DeepPartial } from "@apollo/client/utilities"
import { CourseTargetEntity } from "@common"

export const Targets = () => {
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state

    const renderTargets = () => {
        if (!course) return null
        const { courseTargets } = course
        if (!courseTargets) return null
        return (
            <>
                {courseTargets
                    .map((courseTarget) => (
                        <TargetCard
                            key={courseTarget?.courseTargetId}
                            courseTarget={courseTarget as DeepPartial<CourseTargetEntity>}
                        />
                    ))}
            </>
        )
    }

    return (
        <div>
            <div className="font-semibold px-3"> Targets </div>
            <Spacer y={4} />
            <div className="gap-2.5 flex flex-col">
                {renderTargets()}
                <AddTargetCard />
            </div>
        </div>
    )
}

// export const Targets = () => (
//     <TargetsProviders>
//         <WrappedTargets/>
//     </TargetsProviders>
// )
