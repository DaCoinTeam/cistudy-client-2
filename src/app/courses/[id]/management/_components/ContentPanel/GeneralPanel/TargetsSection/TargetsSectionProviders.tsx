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

export interface TargetsSectionContextValue {
  swrs: {
    courseTargetsSwr: SWRResponse<
      Array<CourseTargetEntity> | undefined,
      ErrorResponse
    >;
  };
}

export const TargetsSectionContext = createContext<TargetsSectionContextValue | null>(
    null
)

const WrappedTargetsSectionProviders = ({ children }: { children: ReactNode }) => {
    const { swrs } = useContext(ManagementContext)!
    const { courseManagementSwr } = swrs
    const { data: courseManagement } = courseManagementSwr
    const { courseId } = { ...courseManagement }

    const fetchCourseTargets = useCallback(async () => {
        if (!courseId) return
        return await findManyCourseTargets(
            {
                courseId,
            },
            {
                courseTargetId: true,
                content: true,
            }
        )
    }, [courseId])

    const courseTargetsSwr = useSWR(courseId ? ["COURSE_TARGETS"] : null, fetchCourseTargets)

    const targetsCardContextValue: TargetsSectionContextValue = useMemo(
        () => ({
            swrs: {
                courseTargetsSwr,
            },
        }),
        [courseTargetsSwr]
    )

    return (
        <TargetsSectionContext.Provider value={targetsCardContextValue}>
            {children}
        </TargetsSectionContext.Provider>
    )
}

export const TargetsSectionProviders = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedTargetsSectionProviders>{children}</WrappedTargetsSectionProviders>
    </SWRConfig>
)
