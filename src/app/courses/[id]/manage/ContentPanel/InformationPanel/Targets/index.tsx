import React, { useContext } from "react"
import { TargetItem } from "./TargetItem"
import { AddTargetItem } from "./AddTargetItem"
import { Spacer } from "@nextui-org/react"
import { CourseDetailsContext } from "../../../../_hooks"
import { CourseTargetEntity } from "@common"

export const Targets = () => {
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state

    const renderTargetCards = () => {
        if (!course) return null
        const { courseTargets } = course
        const _courseTargets = courseTargets as Array<CourseTargetEntity>
        return (
            <>
                {_courseTargets.map((courseTarget) => (
                    <TargetItem
                        key={courseTarget?.courseTargetId}
                        courseTarget={courseTarget as CourseTargetEntity}
                    />
                ))}
            </>
        )
    }

    return (
        <div>
            <div className="font-semibold px-3"> Targets </div>
            <Spacer y={3} />
            <div className="gap-3 flex flex-col">
                {renderTargetCards()}
                <AddTargetItem />
            </div>
        </div>
    )
}

// export const Targets = () => (
//     <TargetsProviders>
//         <WrappedTargets/>
//     </TargetsProviders>
// )
