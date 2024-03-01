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
    TargetsCardAction,
    TargetsCardState,
    useTargetsCardReducer,
} from "./useTargetsCardReducer"
import { findManyCourseTargets } from "@services"
import { isErrorResponse } from "@common"
import { ManageContext } from "../../../../_hooks"

export interface TargetsCardContextValue {
  state: TargetsCardState;
  dispatch: React.Dispatch<TargetsCardAction>;
  functions: {
    fetchAndSetCourseTargets: () => Promise<void>;
  };
}

export const TargetsCardContext =
  createContext<TargetsCardContextValue | null>(null)

export const TargetsCardProviders = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useTargetsCardReducer()

    const { state: manageState } = useContext(ManageContext)!
    const { courseManaged } = manageState

    const fetchAndSetCourseTargets = useCallback(async () => {
        if (courseManaged === null) return
        const { courseId } = courseManaged

        const response = await findManyCourseTargets(
            {
                courseId,
            },
            {
                courseTargetId: true,
                content: true,
            }
        )
        if (!isErrorResponse(response)) {
            dispatch({
                type: "SET_COURSE_TARGETS",
                payload: response,
            })
        } else {
            console.log(response)
        }
    }, [courseManaged])

    useEffect(() => {
        const handleEffect = async () => {
            await fetchAndSetCourseTargets()
        }
        handleEffect()
    }, [courseManaged])

    const targetsCardContextValue: TargetsCardContextValue = useMemo(
        () => ({
            state,
            dispatch,
            functions: {
                fetchAndSetCourseTargets,
            },
        }),
        [state, dispatch]
    )

    return (
        <TargetsCardContext.Provider value={targetsCardContextValue}>
            {children}
        </TargetsCardContext.Provider>
    )
}
