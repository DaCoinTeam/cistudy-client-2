"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    FindManyPendingCoursesOutputData,
    findManyPendingCourses,
} from "@services"

import { ErrorResponse } from "@common"
import { CourseApprovalItemAction, CourseApprovalItemState, useCourseApprovalItemReducer } from "./useCourseApprovalItemReducer"
import useSWR, { SWRResponse } from "swr"

export interface CourseApprovalItemContextValue {
    reducer: [CourseApprovalItemState, React.Dispatch<CourseApprovalItemAction>],
    swrs: {
        pendingCoursesSwr: SWRResponse<FindManyPendingCoursesOutputData | undefined, ErrorResponse>
    },
}

export const ROWS_PER_PAGE = 5

export const CourseApprovalItemContext = createContext<CourseApprovalItemContextValue | null>(null)

const WrappedCourseApprovalItem = ({ children }: {
    children: ReactNode
}) => {
    const reducer = useCourseApprovalItemReducer()

    const fetchPendingCourses = useCallback(
        async ([key]: [number, string]) => {
            return await findManyPendingCourses(
                {
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    results: {
                        courseId: true,
                        title: true,
                        description: true,
                        creator: {
                            accountId: true,
                            email: true,
                            username: true,
                        },
                        createdAt: true,
                        verifyStatus: true,
                    },
                    metadata: {
                        count: true,
                    },
                }
            )
        }, [])

    const [state] = reducer
    const { page } = state

    const pendingCoursesSwr = useSWR<FindManyPendingCoursesOutputData | undefined, ErrorResponse>(
        [page, "PENDiNG_COURSES"],
        fetchPendingCourses,
        {
            revalidateOnFocus: true,
        }
    )

    const courseApprovalItemContextValue: CourseApprovalItemContextValue = useMemo(
        () => ({
            reducer,
            swrs: {
                pendingCoursesSwr,
            },
        }),
        [reducer, pendingCoursesSwr]
    )

    return (
        <CourseApprovalItemContext.Provider value={courseApprovalItemContextValue}>
            {children}
        </CourseApprovalItemContext.Provider>
    )
}

export const CourseApprovalItemProvider = ({ children }: { children: ReactNode }) => {
    return (
        <WrappedCourseApprovalItem>
            {children}
        </WrappedCourseApprovalItem>
    )
}