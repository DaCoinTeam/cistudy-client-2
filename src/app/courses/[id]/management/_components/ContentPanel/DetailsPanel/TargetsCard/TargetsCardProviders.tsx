"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import { findManyCourseTargets } from "@services"
import { ManagementContext } from "../../../../_hooks"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import { CourseTargetEntity, ErrorResponse } from "@common"

export interface TargetsCardContextValue {
  swrs: {
    courseTargetsSwr: SWRResponse<
      Array<CourseTargetEntity> | undefined,
      ErrorResponse
    >;
  };
}

export const TargetsCardContext = createContext<TargetsCardContextValue | null>(
    null
)

const WrappedTargetsCardProviders = ({ children }: { children: ReactNode }) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement } = courseManagementSwr

    const fetchCourseTargets = useCallback(async () => {
        if (!courseManagement) return
        const { courseId } = courseManagement

        return await findManyCourseTargets(
            {
                courseId,
            },
            {
                courseTargetId: true,
                content: true,
            }
        )
    }, [courseManagement?.courseId])

    const courseTargetsSwr = useSWR(["COURSE_TARGETS"], fetchCourseTargets)

    const targetsCardContextValue: TargetsCardContextValue = useMemo(
        () => ({
            swrs: {
                courseTargetsSwr,
            },
        }),
        [courseTargetsSwr]
    )

    return (
        <TargetsCardContext.Provider value={targetsCardContextValue}>
            {children}
        </TargetsCardContext.Provider>
    )
}

export const TargetsCardProviders = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedTargetsCardProviders>{children}</WrappedTargetsCardProviders>
    </SWRConfig>
)
