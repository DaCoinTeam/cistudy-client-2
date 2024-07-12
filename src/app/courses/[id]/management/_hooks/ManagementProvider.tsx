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

const WrappedManagementProvider = ({ children }: { children: ReactNode }) => {
    const reducer = useManagementReducer()

    const { swrs } = useContext(CourseDetailsContext)!
    const { courseSwr } = swrs
    const { data: course } = courseSwr
    const { courseId } = { ...course }

    const fetchCourseManagement = useCallback(async () => {
        if (!courseId) return

        return await findOneCourse(
            {
                params: {
                    courseId
                },
            },
            {
                courseId: true,
                description: true,
                title: true,
                previewVideoId: true,
                thumbnailId: true,
                price: true,
                discountPrice: true,
                enableDiscount: true,
                receivedWalletAddress: true,
                sections: {
                    sectionId: true,
                    title: true,
                    lessons: {
                        lessonId: true,
                        thumbnailId: true,
                        lessonVideoId: true,
                        title: true,
                        resources: {
                            resourceId: true,
                            name: true,
                            fileId: true,
                        },
                    },
                },
                courseCategories:{
                    category: {
                        categoryId: true,
                        name: true,
                        level: true,
                    }
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
                numberOfEnrollments: true,
            }
        )
    }, [courseId])

    const courseManagementSwr = useSWR(
        courseId ? ["COURSE_MANAGEMENT"] : null,
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

export const ManagementProvider = ({ children }: { children: ReactNode }) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedManagementProvider>{children}</WrappedManagementProvider>
    </SWRConfig>
)
