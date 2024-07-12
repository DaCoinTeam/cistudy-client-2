"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    findManyCourseReports,
    FindManyCourseReportsOutputData
} from "@services"

import { ErrorResponse } from "@common"
import { CourseReportManagementPanelAction, CourseReportManagementPanelState, useCourseReportManagementPanelReducer } from "./useCourseReportItemReducer"
import useSWR, { SWRResponse } from "swr"

export interface CourseReportItemContextValue {
    reducer: [CourseReportManagementPanelState, React.Dispatch<CourseReportManagementPanelAction>],
    swrs: {
        courseReportsSwr: SWRResponse<FindManyCourseReportsOutputData | undefined, ErrorResponse>
    },
}

export const ROWS_PER_PAGE = 5

export const CourseReportItemContext = createContext<CourseReportItemContextValue | null>(null)

const WrappedCourseReportItem = ({ children }: { children: ReactNode }) => {
    const reducer = useCourseReportManagementPanelReducer()

    const fetchCourseReports = useCallback(
        async ([key]: [number, string]) => {
            return await findManyCourseReports(
                {
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    results: {
                        reportCourseId: true,
                        reportedCourseId: true,
                        reporterAccountId: true,
                        description: true,
                        processNote: true,
                        processStatus: true,
                        reportedCourse: {
                            courseId: true,
                            title: true,
                        },
                        reporterAccount: {
                            accountId: true,
                            username: true,
                            email: true,
                        },
                        createdAt: true,
                        updatedAt: true,
                    },
                    metadata: {
                        count: true,
                    },
                }
            )
        },
        []
    )

    const [state] = reducer
    const { page } = state

    const courseReportsSwr = useSWR<FindManyCourseReportsOutputData | undefined, ErrorResponse>(
        [page, "COURSE_REPORTS"],
        fetchCourseReports,
        {
            keepPreviousData: true
        }
    )

    const courseReportItemValue: CourseReportItemContextValue = useMemo(() => ({
        reducer,
        swrs: {
            courseReportsSwr
        }
    }), [reducer, courseReportsSwr])

    return (
        <CourseReportItemContext.Provider value={courseReportItemValue}>
            {children}
        </CourseReportItemContext.Provider>
    )
}

export const CourseReportItemProvider = ({ children }: { children: ReactNode }) => {
    return (
        <WrappedCourseReportItem>
            {children}
        </WrappedCourseReportItem>
    )
}