"use client"
import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react"

import {
    ManageCoursesPanelAction,
    ManageCoursesPanelState,
    useManageCoursesPanelReducer,
} from "./useManageCoursesPanelReducer"
import { findManyCreatedCourses } from "@services"
import { CourseEntity, ErrorResponse, } from "@common"
import { UserDetailsContext } from "../../../../_hooks"
import useSWR, { SWRResponse } from "swr"

export interface ManageCoursesPanelContextValue {
  state: ManageCoursesPanelState;
  dispatch: React.Dispatch<ManageCoursesPanelAction>;
  swr: {
    courses: SWRResponse<Array<CourseEntity> | ErrorResponse | undefined>;
  };
}

export const ROWS_PER_PAGE = 5

export const ManageCoursesPanelContext =
  createContext<ManageCoursesPanelContextValue | null>(null)

export const ManageCoursesPanelProviders = ({
    children,
}: {
  children: ReactNode;
}) => {
    const [state, dispatch] = useManageCoursesPanelReducer()
    const { page } = state

    const { state: userDetailsState } = useContext(UserDetailsContext)!
    const { user } = userDetailsState

    const fetchAndSetCreatedCourses = useCallback(async () => {
        if (user === null) return
        const { userId } = user

        return await findManyCreatedCourses(
            {
                userId,
                options: {
                    skip: ROWS_PER_PAGE * (page - 1),
                    take: ROWS_PER_PAGE,
                },
            },
            {
                courseId: true,
                thumbnailId: true,
                previewVideoId: true,
                title: true,
                description: true
            }
        )
    }, [user, page])

    const coursesSwr = useSWR<
    Array<CourseEntity> | ErrorResponse | undefined
  >([page, user], fetchAndSetCreatedCourses, {
      keepPreviousData: true,
  })

    const manageCoursesPanelContextValue: ManageCoursesPanelContextValue =
    useMemo(
        () => ({
            state,
            dispatch,
            swr: {
                courses: coursesSwr
            },
        }),
        [state, dispatch, coursesSwr]
    )

    return (
        <ManageCoursesPanelContext.Provider value={manageCoursesPanelContextValue}>
            {children}
        </ManageCoursesPanelContext.Provider>
    )
}
