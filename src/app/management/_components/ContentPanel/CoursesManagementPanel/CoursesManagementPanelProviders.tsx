"use client"
import React, { ReactNode, createContext, useCallback, useMemo } from "react"

import {
    FindManySelfCreatedCoursesMetadataOutput,
    findManySelfCreatedCourses,
    findManySelfCreatedCoursesMetadata,
} from "@services"
import { CourseEntity, ErrorResponse } from "@common"
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
    selfCreatedCoursesSwr: SWRResponse<Array<CourseEntity>, ErrorResponse>;
    selfCreatedCoursesMetadataSwr: SWRResponse<
      FindManySelfCreatedCoursesMetadataOutput,
      ErrorResponse
    >;
  };
}

export const ROWS_PER_PAGE = 5

export const CoursesManagementPanelContext =
  createContext<CoursesManagementPanelContextValue | null>(null)

const WrappedcoursesManagementPanelProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useCoursesManagementPanelReducer()

    const fetchSelfCreatedCourses = useCallback(
        async ([key]: [number, string]) => {
            return await findManySelfCreatedCourses(
                {
                    options: {
                        skip: ROWS_PER_PAGE * (key - 1),
                        take: ROWS_PER_PAGE,
                    },
                },
                {
                    courseId: true,
                    thumbnailId: true,
                    previewVideoId: true,
                    title: true,
                    description: true,
                }
            )
        },
        []
    )

    const [state] = reducer
    const { page } = state

    const selfCreatedCoursesSwr = useSWR(
        [page, "SELF_CREATED_COURSES"],
        fetchSelfCreatedCourses,
        {
            keepPreviousData: true,
        }
    )

    const fetchSelfCreatedCoursesMetadata = useCallback(async () => {
        return await findManySelfCreatedCoursesMetadata({
            numberOfCourses: true,
        })
    }, [])

    const selfCreatedCoursesMetadataSwr = useSWR(
        ["SELF_CREATED_COURSES_METADATA"],
        fetchSelfCreatedCoursesMetadata
    )

    const manageCoursesPanelContextValue: CoursesManagementPanelContextValue =
    useMemo(
        () => ({
            reducer,
            swrs: {
                selfCreatedCoursesSwr,
                selfCreatedCoursesMetadataSwr,
            },
        }),
        [reducer, selfCreatedCoursesSwr]
    )

    return (
        <CoursesManagementPanelContext.Provider
            value={manageCoursesPanelContextValue}
        >
            {children}
        </CoursesManagementPanelContext.Provider>
    )
}

export const CoursesManagementPanelProviders = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedcoursesManagementPanelProviders>
            {children}
        </WrappedcoursesManagementPanelProviders>
    </SWRConfig>
)
