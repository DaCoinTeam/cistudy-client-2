"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import {
    ManagementAction,
    ManagementState,
    useManagementReducer,
} from "./useManagementReducer"
import { CourseDetailsContext } from "../../_hooks"
import { findOneCourse } from "@services"
import { CourseEntity, ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"

export interface ManagementContextValue {
  reducer: [ManagementState, React.Dispatch<ManagementAction>];
  swrs: {
    courseManagementSwr: SWRResponse<CourseEntity | undefined, ErrorResponse>;
  };
}

export const ManagementContext = createContext<ManagementContextValue | null>(
    null
)

const WrappedManagementProviders = ({ children }: { children: ReactNode }) => {
    const reducer = useManagementReducer()

    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr

    const fetchCourseManagement = useCallback(async () => {
        if (!course) return
        const { courseId } = course

        return await findOneCourse(
            {
                courseId,
            },
            {
                courseId: true,
                description: true,
                title: true,
                previewVideoId: true,
                thumbnailId: true,
                sections: {
                    sectionId: true,
                    title: true,
                    lectures: {
                        lectureId: true,
                        thumbnailId: true,
                        lectureVideoId: true,
                        title: true,
                        resources: {
                            resourceId: true,
                            name: true,
                            fileId: true,
                        },
                    },
                },
                courseTargets: {
                    courseTargetId: true,
                    content: true,
                },
                creator: {
                    avatarId: true,
                    numberOfFollowers: true,
                    username: true
                },
                numberOfEnrollments: true
            }
        )
    }, [course?.courseId])

    const courseManagementSwr = useSWR(
        course?.courseId ? ["COURSE_MANAGEMENT"] : null,
        fetchCourseManagement
    )

    const manageContextValue: ManagementContextValue = useMemo(
        () => ({
            reducer,
            swrs: {
                courseManagementSwr,
            },
        }),
        [reducer, courseManagementSwr]
    )

    return (
        <ManagementContext.Provider value={manageContextValue}>
            {children}
        </ManagementContext.Provider>
    )
}

export const ManagementProviders = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedManagementProviders>{children}</WrappedManagementProviders>
    </SWRConfig>
)
