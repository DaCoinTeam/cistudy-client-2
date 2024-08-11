"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    FindManyCoursesOutputData,
    findManyCourses,
} from "@services"
import { ErrorResponse } from "@common"
import useSWR, { SWRConfig, SWRResponse } from "swr"
import {
    CoursesManagementPanelAction,
    CoursesManagementPanelState,
    useCoursesManagementPanelReducer,
} from "./useCoursesManagementPanelReducer"

export interface CoursesManagementPanelContextValue {
  reducer: [
    CoursesManagementPanelState,
    React.Dispatch<CoursesManagementPanelAction>
  ];
  swrs: {
    coursesSwr: SWRResponse<FindManyCoursesOutputData, ErrorResponse>;
  };
}

export const ROWS_PER_PAGE = 5

export const CoursesManagementPanelContext =
  createContext<CoursesManagementPanelContextValue | null>(null)

const WrappedCoursesManagementPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useCoursesManagementPanelReducer()

    const fetchCourses = useCallback(
        async ([key]: [number, string]) => {
            return await findManyCourses(
                {
                    params: {
                    },
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
                        verifyStatus: true,
                        enableDiscount: true,
                        price: true,
                        discountPrice: true,
                        numberOfEnrollments: true
                    },
                    metadata: {
                        count: true
                    }   
                }
            )
        },
        []
    )

    const [state] = reducer
    const { page } = state

    const coursesSwr = useSWR(
        [page, "COURSES"],
        fetchCourses,
        {
            keepPreviousData: true,
        }
    )

    const manageCoursesPanelContextValue: CoursesManagementPanelContextValue =
    useMemo(
        () => ({
            reducer,
            swrs: {
                coursesSwr,
            },
        }),
        [reducer, coursesSwr]
    )

    return (
        <CoursesManagementPanelContext.Provider
            value={manageCoursesPanelContextValue}
        >
            {children}
        </CoursesManagementPanelContext.Provider>
    )
}

export const CoursesManagementPanelProvider = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedCoursesManagementPanelProvider>
            {children}
        </WrappedCoursesManagementPanelProvider>
    </SWRConfig>
)
