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
    ManageCoursesPanelAction,
    ManageCoursesPanelState,
    useManageCoursesPanelReducer,
} from "./useManageCoursesPanelReducer"

export interface ManageCoursesPanelContextValue {
  reducer: [ManageCoursesPanelState, React.Dispatch<ManageCoursesPanelAction>];
  swrs: {
    selfCreatedCoursesSwr: SWRResponse<Array<CourseEntity>, ErrorResponse>;
    selfCreatedCoursesMetadataSwr: SWRResponse<
      FindManySelfCreatedCoursesMetadataOutput,
      ErrorResponse
    >;
  };
}

export const ROWS_PER_PAGE = 5

export const ManageCoursesPanelContext =
  createContext<ManageCoursesPanelContextValue | null>(null)

const WrappedManageCoursesPanelProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const reducer = useManageCoursesPanelReducer()

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

    const manageCoursesPanelContextValue: ManageCoursesPanelContextValue =
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
        <ManageCoursesPanelContext.Provider value={manageCoursesPanelContextValue}>
            {children}
        </ManageCoursesPanelContext.Provider>
    )
}

export const ManageCoursesPanelProviders = ({
    children,
}: {
  children: ReactNode;
}) => (
    <SWRConfig value={{ provider: () => new Map() }}>
        <WrappedManageCoursesPanelProviders>
            {children}
        </WrappedManageCoursesPanelProviders>
    </SWRConfig>
)
