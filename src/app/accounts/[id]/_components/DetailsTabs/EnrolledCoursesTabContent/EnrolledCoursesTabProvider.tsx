"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    FindManyEnrolledCoursesOutputData,
    findManyEnrolledCourses,
} from "@services"
import { ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import {
    EnrolledCoursesTabContentAction,
    EnrolledCoursesTabContentState,
    useEnrolledCoursesTabContentReducer,
} from "./useEnrolledCoursesTabContentReducer"

export interface EnrolledCoursesTabContentContextValue {
  reducer: [
    EnrolledCoursesTabContentState,
    React.Dispatch<EnrolledCoursesTabContentAction>
  ];
  swrs: {
    enrolledCoursesSwr: SWRResponse<
      FindManyEnrolledCoursesOutputData,
      ErrorResponse
    >;
  };
}

export const ROWS_PER_PAGE = 5

export const EnrolledCoursesTabContentContext =
  createContext<EnrolledCoursesTabContentContextValue | null>(null)

const WrappedEnrolledCoursesTabContentProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useEnrolledCoursesTabContentReducer()

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
                        creator: {
                            username: true,
                            avatarId: true
                        }
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

    const enrolledCoursesTabContentContextValue: EnrolledCoursesTabContentContextValue =
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
        <EnrolledCoursesTabContentContext.Provider
            value={enrolledCoursesTabContentContextValue}
        >
            {children}
        </EnrolledCoursesTabContentContext.Provider>
    )
}

export const EnrolledCoursesTabContentProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedEnrolledCoursesTabContentProvider>
            {children}
        </WrappedEnrolledCoursesTabContentProvider>
    </SWRConfig>
)
