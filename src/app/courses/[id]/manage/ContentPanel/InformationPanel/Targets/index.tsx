import React, { useContext } from "react"
import { TargetCard } from "./TargetCard"
import { AddTargetCard } from "./AddTargetCard"
import { Spacer } from "@nextui-org/react"
import { CourseDetailsContext } from "../../../../_hooks"
import { TargetsContext, TargetsProviders } from "./TargetsProviders"

const WrappedTargets = () => {
    const { state } = useContext(CourseDetailsContext)!
    const { course } = state

    const { state: targetsState } = useContext(TargetsContext)!
    const { keyTargets } = targetsState

    const renderTargets = () => {
        if (!course) return null
        const { targets } = course
        if (!targets) return null
        return (
            <>
                {keyTargets.map((keyTarget) => (
                    <TargetCard key={keyTarget.key} keyTarget={keyTarget} />
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

export const Targets = () => (
    <TargetsProviders>
        <WrappedTargets/>
    </TargetsProviders>
)