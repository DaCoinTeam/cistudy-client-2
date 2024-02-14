"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
} from "react"

import {
    TargetsAction,
    TargetsState,
    useTargetsReducer,
} from "./useTargetsReducer"
import { CourseDetailsContext } from "../../../../_hooks"
import { updateCourse } from "@services"
import { isErrorResponse } from "@common"

export interface TargetsContextValue {
  state: TargetsState;
  dispatch: React.Dispatch<TargetsAction>;
  functions: {
    addTarget: (target: string) => void;
  };
}

export const TargetsContext = createContext<TargetsContextValue | null>(null)

export const TargetsProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useTargetsReducer()
    const { state: courseDetailsState, functions } =
    useContext(CourseDetailsContext)!
    const { course } = courseDetailsState
    const { fetchAndSetCourse } = functions

    console.log("Current")
    console.log(state.keyTargets)

    const addTarget = useCallback(async (target: string) => {
        if (course === null) return

        const { courseId } = course
        const targets = state.keyTargets.map((keyTarget) => keyTarget.value)
        console.log(targets)
        targets.push(target)
        console.log(targets)
        const response = await updateCourse({
            data: {
                courseId,
                targets,
            },
        })
        console.log(response)
        if (!isErrorResponse(response)) {
            await fetchAndSetCourse()
        } else {
            console.log(response)
        }
    }, [])

    useEffect(() => {
        const targets = courseDetailsState.course?.targets
        if (!targets) return

        const keyTargets = (
            targets as Array<string>
        ).map((value, key) => ({
            key,
            value,
        }))
        
        dispatch({
            type: "SET_KEY_TARGETS",
            payload: keyTargets,
        })
    }, [courseDetailsState.course?.targets])

    const TargetsContextValue: TargetsContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                addTarget,
            },
        }),
        [state, dispatch]
    )

    return (
        <TargetsContext.Provider value={TargetsContextValue}>
            {children}
        </TargetsContext.Provider>
    )
}
