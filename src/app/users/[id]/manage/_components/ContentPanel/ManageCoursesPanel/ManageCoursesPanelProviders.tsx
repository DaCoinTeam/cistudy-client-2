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
import { CourseEntity, ErrorResponse } from "@common"
import { UserDetailsContext } from "../../../../_hooks"
import useSWR from "swr"

export interface ManageCoursesPanelContextValue {
  state: ManageCoursesPanelState;
  dispatch: React.Dispatch<ManageCoursesPanelAction>;
  swr: {
    data: Array<CourseEntity> | ErrorResponse | undefined,
    isLoading: boolean
  },
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
            }
        )
    }, [user, page])

    const { data, isLoading } = useSWR<
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
                data,
                isLoading
            },
        }),
        [state, dispatch, data, isLoading]
    )

    return (
        <ManageCoursesPanelContext.Provider value={manageCoursesPanelContextValue}>
            {children}
        </ManageCoursesPanelContext.Provider>
    )
}
