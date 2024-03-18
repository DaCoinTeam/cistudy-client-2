"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    FindManyEnrolledCoursesOutputData,
    findManyEnrolledCourses,
} from "@services"
import { ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import {
    useEnrolledCoursesSectionReducer,
    EnrolledCoursesSectionAction,
    EnrolledCoursesSectionState,
} from "./useEnrolledCoursesSectionReducer"

export interface EnrolledCoursesSectionContextValue {
  reducer: [
    EnrolledCoursesSectionState,
    React.Dispatch<EnrolledCoursesSectionAction>
  ];
  swrs: {
    enrolledCoursesSwr: SWRResponse<
      FindManyEnrolledCoursesOutputData,
      ErrorResponse
    >;
  };
}

export const ROWS_PER_PAGE = 5

export const EnrolledCoursesSectionContext =
  createContext<EnrolledCoursesSectionContextValue | null>(null)

const WrappedEnrolledCoursesSectionProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useEnrolledCoursesSectionReducer()

    const fetchEnrolledCourses = useCallback(
        async ([key]: [number, string]) => {
            return await findManyEnrolledCourses(
                {
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    results: {
                        courseId: true,
                        thumbnailId: true,
                        previewVideoId: true,
                        title: true,
                        description: true,
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

    const enrolledCoursesSwr = useSWR(
        [page, "ENROLLED_COURSES"],
        fetchEnrolledCourses,
        {
            keepPreviousData: true,
        }
    )

    const manageCoursesPanelContextValue: EnrolledCoursesSectionContextValue =
    useMemo(
        () => ({
            reducer,
            swrs: {
                enrolledCoursesSwr,
            },
        }),
        [reducer, enrolledCoursesSwr]
    )

    return (
        <EnrolledCoursesSectionContext.Provider
            value={manageCoursesPanelContextValue}
        >
            {children}
        </EnrolledCoursesSectionContext.Provider>
    )
}

export const EnrolledCoursesSectionProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedEnrolledCoursesSectionProvider>
            {children}
        </WrappedEnrolledCoursesSectionProvider>
    </SWRConfig>
)
